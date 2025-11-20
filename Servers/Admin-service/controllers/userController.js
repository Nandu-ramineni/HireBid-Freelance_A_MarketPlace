import axios from "axios";
import { createCache, getCache } from "../utils/cache.js";

export const getUsers = async (req, res) => {
    try {
        // Check cache first
        const cachedUsers = await getCache("users");
        if (cachedUsers) {
            return res.status(200).json(cachedUsers); 
        }
        // Fetch users
        const usersRes = await axios.get("http://localhost:5000/api/auth/users");
        const users = usersRes.data;

        // Fetch jobs and bids
        const [jobsRes, bidsRes] = await Promise.all([
            axios.get("http://localhost:7000/api/jobs/jobs"),
            axios.get("http://localhost:7000/api/jobs/getBids"),
        ]);
        const jobs = Array.isArray(jobsRes.data) ? jobsRes.data : jobsRes.data.data || [];
        const bids = Array.isArray(bidsRes.data?.bids) ? bidsRes.data.bids : [];

        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setDate(now.getDate() - 30);

        let totalRevenue = 0;
        let totalActiveProjects = 0;
        let totalGrowth = 0;

        const usersData = users.map((user) => {
            let projects = 0;
            let userRevenue = 0;
            let activeProjects = 0;
            let growth = 0;
            let averageRating = 0;
            if (user.role === "client") {
                const clientJobs = jobs.filter((job) => job.clientId === user._id);
                averageRating = users?.clientProfile?.avgRating || 0;
                projects = clientJobs.length;

                userRevenue = clientJobs.reduce((sum, job) => {
                    return (
                        sum +
                        (job.milestones?.reduce(
                            (mSum, m) => mSum + (m.isPaid ? m.amount : 0),
                            0
                        ) || 0)
                    );
                }, 0);

                activeProjects = clientJobs.filter((j) =>
                    ["open", "in-progress"].includes(j.status)
                ).length;

                growth = clientJobs.filter(
                    (j) => new Date(j.createdAt) >= lastMonth
                ).length;
            }

            if (user.role === "freelancer") {
                const acceptedBids = bids.filter(
                    (bid) =>
                        Array.isArray(bid.freelancerId) &&
                        bid.freelancerId.includes(user._id) &&
                        bid.status === "accepted"
                );
                averageRating = user.freelancerProfile?.avgRating || 0;
                projects = acceptedBids.length;
                userRevenue = acceptedBids.reduce(
                    (sum, bid) => sum + (bid.amount || 0),
                    0
                );

                const jobIds = acceptedBids.map((b) => b.jobId.toString());
                const relatedJobs = jobs.filter((j) =>
                    jobIds.includes(j._id.toString())
                );

                activeProjects = relatedJobs.filter((j) =>
                    ["accepted"].includes(j.status)
                ).length;

                growth = acceptedBids.filter(
                    (b) => new Date(b.createdAt) >= lastMonth
                ).length;
            }


            // Add to totals
            totalRevenue += userRevenue;
            totalActiveProjects += activeProjects;
            totalGrowth += growth;

            return {
                userId: user._id,
                name: user.firstName || user.lastName
                    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                    : user.username,
                email: user.email,
                profile: user.profile,
                role: user.role,
                isActive: user.isActive,
                rating: user.avgRating,
                createdAt: user.createdAt,
                projects,
                totalRevenue: userRevenue,
                activeProjects,
                growth,
                averageRating: averageRating,
            };
        });

        const structured = {
            totalUsers: users.length,
            totalRevenue,
            totalActiveProjects,
            totalGrowth,
            users: usersData,
        };

        await createCache("users", structured, 3600); // cache for 1 hour

        res.status(200).json(structured);
    } catch (error) {
        console.error("Error in getUsers:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getClients = async (req, res) => {
    try {
        const usersRes = await axios.get("http://localhost:5000/api/auth/users");
        const users = usersRes.data.filteredUsers || usersRes.data;
        const clients = users.filter((user) => user.role === "client");

        const jobsRes = await axios.get("http://localhost:7000/api/jobs/jobs");
        const jobs = Array.isArray(jobsRes.data) ? jobsRes.data : jobsRes.data.data || [];

        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setDate(now.getDate() - 30);

        let totalRevenue = 0;
        let totalActiveProjects = 0;
        let totalGrowth = 0;
        let suspendedClients = 0;

        const clientData = clients.map((client) => {
            const clientJobs = jobs.filter((job) => job.clientId === client._id);
            const projects = clientJobs.length;

            const userRevenue = clientJobs.reduce(
                (sum, job) =>
                    sum +
                    (job.milestones?.reduce(
                        (mSum, m) => mSum + (m.isPaid ? m.amount : 0),
                        0
                    ) || 0),
                0
            );
            const activeProjects = clientJobs.filter((j) =>
                ["open", "in-progress"].includes(j.status)
            ).length;
            const growth = clientJobs.filter(
                (j) => new Date(j.createdAt) >= lastMonth
            ).length;

            totalRevenue += userRevenue;
            totalActiveProjects += activeProjects;
            totalGrowth += growth;
            if (!client.isActive) suspendedClients += 1;

            return {
                client,
                projects,
                totalRevenue: userRevenue,
                activeProjects,
                growth,
                
                
            };
        });

        const structuredClients = {
            totalClients: clients.length,
            totalActiveUsers: clients.filter((c) => c.isActive).length,
            totalInactiveUsers: clients.filter((c) => !c.isActive).length,
            totalRevenue,
            totalActiveProjects,
            totalGrowth,
            clients: clientData,
        };

        
        res.status(200).json(structuredClients);
    } catch (error) {
        console.error("Error in getClients:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getFreelancers = async (req, res) => {
    try {
        const cachedFreelancers = await getCache("freelancers");
        if (cachedFreelancers) return res.status(200).json(cachedFreelancers);

        const usersRes = await axios.get("http://localhost:5000/api/auth/freelancers");
        const users = usersRes.data.users || usersRes.data;
        const freelancers = users.filter((u) => u.role === "freelancer");

        const bidsRes = await axios.get("http://localhost:7000/api/jobs/getBids");
        const bids = Array.isArray(bidsRes.data?.bids) ? bidsRes.data.bids : [];

        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setDate(now.getDate() - 30);

        let totalRevenue = 0;
        let totalActiveProjects = 0;
        let totalCompletedProjects = 0;
        let totalGrowth = 0;
        let responseTime = 0;

        const freelancerData = freelancers.map((freelancer) => {
            const acceptedBids = bids.filter(
                (bid) =>
                    (Array.isArray(bid.freelancerId)
                        ? bid.freelancerId.includes(freelancer._id)
                        : bid.freelancerId === freelancer._id) &&
                    bid.status === "accepted"
            );

            const projects = acceptedBids.length;
            const userRevenue = acceptedBids.reduce(
                (sum, bid) => sum + (bid.amount || 0),
                0
            );
            const activeProjects = acceptedBids.filter(
                (b) => b.status === "accepted"
            ).length;
            const growth = acceptedBids.filter(
                (b) => new Date(b.createdAt) >= lastMonth
            ).length;
            const completedProjects = acceptedBids.filter(
                (b) => b.status === "completed"
            ).length;
            const successRate = completedProjects / projects * 100 || 0;

            //calculate average response time in hours based on timestamps
            let totalResponseTime = 0;
            acceptedBids.forEach((bid) => {
                const createdAt = new Date(bid.createdAt);
                const acceptedAt = new Date(bid.updatedAt);
                const diffInHours = Math.abs(acceptedAt - createdAt) / 36e5;
                totalResponseTime += diffInHours;
            });
            responseTime = projects > 0 ? totalResponseTime / projects : 0;
            totalRevenue += userRevenue;
            totalActiveProjects += activeProjects;
            totalGrowth += growth;
            totalCompletedProjects += completedProjects;

            return {
                freelancerId: freelancer._id,
                name: freelancer.firstName
                    ? `${freelancer.firstName} ${freelancer.lastName || ""}`.trim()
                    : freelancer.username,
                email: freelancer.email,
                isActive: freelancer.isActive,
                projects,
                totalRevenue: userRevenue,
                activeProjects,
                growth,
                completedProjects,
                averageRating: freelancer.freelancerProfile?.avgRating || 0,
                profile: freelancer.profile,
                skills: freelancer.freelancerProfile?.skills || [],
                userStatus: freelancer.userStatus,
                availability: freelancer.freelancerProfile?.availability || "not set",
                hourlyRate: freelancer.freelancerProfile?.hourlyRate || 0,
                successRate: successRate.toFixed(2),
                averageResponseTime: responseTime.toFixed(2), // in hours
            };
        });

        const structuredFreelancers = {
            totalFreelancers: freelancers.length,
            totalActiveUsers: freelancers.filter((f) => f.isActive).length,
            totalInactiveUsers: freelancers.filter((f) => !f.isActive).length,
            totalRevenue,
            totalActiveProjects,
            totalGrowth,
            freelancers: freelancerData,
        };

        await createCache("freelancers", structuredFreelancers, 3600);
        res.status(200).json(structuredFreelancers);
    } catch (error) {
        console.error("Error in getFreelancers:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const forceLogoutUsers = async (req, res) => {
    try {
        const { userIds } = req.body;
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: "Invalid user IDs" });
        }
        userIds.forEach((userId) => async () => {
            const getUserLoginSessions = await axios.get(`http://localhost:5000/api/auth/userSessions/${userId}`);
            const userSessions = getUserLoginSessions.data;

            if (userSessions && userSessions.length > 0) {
                await Promise.all(userSessions.map(session => {
                    return axios.delete(`http://localhost:5000/api/auth/logout/${session._id}`);
                }));
            }
        });
        res.status(200).json({ message: "Users logged out successfully" });
    } catch (error) {
        console.error("Error in forceLogoutUsers:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { userStatus } = req.body;

        if (!['active', 'suspended'].includes(userStatus)) {
            return res.status(400).json({ message: "Invalid user status" });
        }

        // Forward update request to Auth microservice
        const response = await axios.patch(
            `http://localhost:5000/api/auth/update-status/${userId}`,
            { userStatus }
        );

        res.status(200).json({
            message: "User status updated successfully",
            data: response.data
        });

    } catch (error) {
        res.status(500).json({
            message: "Error while updating user status",
            error: error.message
        });
    }
};
