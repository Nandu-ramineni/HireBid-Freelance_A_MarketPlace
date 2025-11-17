import Job from "../Models/Job.js";
import axios from "axios";
import { createCache, getCache } from "../Utils/cache.js";
import Bid from "../Models/Bid.js";

export const getJobRecommendsForFreelancer = async (req, res) => {
    const { userId } = req.user;
    try {
        const cacheKey = `freelancer_recommends_${userId}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return res.status(200).json(cachedData);
        }

        const userResponse = await axios.get('http://localhost:5000/api/auth/users');
        const users = userResponse.data;
        const freelancer = users.find(user => user._id === userId && user.role === 'freelancer');
        if (!freelancer) {
            return res.status(401).json({ message: 'Unauthorized to view recommended jobs' });
        }
        const freelancerSkills = freelancer.freelancerProfile?.skills;
        if (!freelancerSkills || freelancerSkills.length === 0) {
            return res.status(200).json({ message: 'No recommended jobs for you' });
        }
        const jobs = await Job.find({
            skills: { $in: freelancerSkills },
            status: 'open'
        });
        const jobsWithClientInfo = await Promise.all(jobs.map(async (job) => {
            const client = users.find(user => user._id === String(job.clientId));
            return {
                ...job.toObject(),
                clientInfo: client ? { name: client.firstName + ' ' + client.lastName, email: client.email } : null
            };
        }));
        await createCache(cacheKey, jobsWithClientInfo, 3600);
        res.status(200).json(jobsWithClientInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching recommends', error: error.message });
    }
}

export const getJobRecommendsForClient = async (req, res) => {
    const { userId } = req.user;
    try {
        const cacheKey = `client_recommends_${userId}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return res.status(200).json(cachedData);
        }
        const userResponse = await axios.get('http://localhost:5000/api/auth/users');
        const users = userResponse.data;
        const client = users.find(user => user._id === userId && user.role === 'client');
        if (!client) {
            return res.status(401).json({ message: 'Unauthorized to view recommended jobs' });
        }
        const jobs = await Job.find({
            clientId: userId,
            status: 'open'
        });
        if (!jobs || jobs.length === 0) {
            return res.status(200).json({ message: 'No recommended jobs for you' });
        }
        const matchingFreelancers = users.filter(user => user.role === 'freelancer' && user.freelancerProfile?.skills.some(skill => jobs[0].skills.includes(skill)));
        if (matchingFreelancers.length === 0) {
            return res.status(200).json({ message: 'No freelancers available for recommended jobs' });
        }
        const jobRecommendations = jobs.map(job => {
            const recommendedFreelancers = matchingFreelancers.filter(freelancer =>
                freelancer.freelancerProfile?.skills.some(skill => job.skills.includes(skill))
            );
            return {

                recommendedFreelancers: recommendedFreelancers.map(freelancer => ({
                    _id: freelancer._id,
                    name: freelancer.firstName + ' ' + freelancer.lastName,
                    email: freelancer.email,
                    profile: freelancer.freelancerProfile,
                    bio: freelancer.bio
                }))
            };
        });
        await createCache(cacheKey, jobRecommendations, 3600);
        res.status(200).json(jobRecommendations);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching recommends', error: error.message });

    }
}


export const getFinancialOverviewForFreelancer = async (req, res) => {
    try {
        const { userId } = req.user;

        // Step 1: Get all accepted bids for the freelancer
        const acceptedBids = await Bid.find({
            freelancerId: userId,
            status: 'accepted'
        }).populate('jobId');
        if (!acceptedBids || acceptedBids.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Associated job and freelancer not found",
                data: {
                    totalEarnings: 0,
                    pendingPayments: 0,
                    availableToWithdraw: 0
                }
            });
        }

        let totalEarnings = 0;
        let pendingPayments = 0;
        let availableToWithdraw = 0;
        let thisMonthEarnings = 0;
        let lastMonthEarnings = 0;

        for (const bid of acceptedBids) {
            const job = await Job.findById(bid.jobId);

            totalEarnings += bid.amount;

            // If job has milestones, calculate paid and unpaid
            if (job && job.milestones && job.milestones.length > 0) {
                job.milestones.forEach(milestone => {
                    if (milestone.isPaid) {
                        availableToWithdraw += milestone.amount;
                    } else {
                        pendingPayments += milestone.amount;
                    }
                });
            } else {
                // If no milestones, consider full bid amount as pending
                pendingPayments += bid.amount;
            }
        }
        // Calculate earnings for this month and last month
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const endOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        for (const bid of acceptedBids) {
            const bidDate = new Date(bid.createdAt);
            if (bidDate >= startOfMonth) {
                thisMonthEarnings += bid.amount;
            } else if (bidDate >= startOfLastMonth && bidDate <= endOfLastMonth) {
                lastMonthEarnings += bid.amount;
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                totalEarnings,
                thisMonthEarnings,
                lastMonthEarnings,
                pendingPayments,
                availableToWithdraw
            }
        });

    } catch (error) {
        console.error("Error in getFinancialOverviewForFreelancer:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const getFreelancerJobs = async (req, res) => {
    const { userId } = req.user;
    try {
        const jobs = await Job.find({ freelancerId: userId });
        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Error in getFreelancerJobs:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}