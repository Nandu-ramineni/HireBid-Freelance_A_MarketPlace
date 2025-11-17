import axios from "axios";

export const getGigsDashboardData = async (req, res) => {
    try {
        // Fetch gigs (projects)
        const gigsRes = await axios.get("http://localhost:7000/api/jobs/jobs");
        const gigs = Array.isArray(gigsRes.data) ? gigsRes.data : gigsRes.data.data || [];

        // Fetch bids
        const bidsRes = await axios.get("http://localhost:7000/api/jobs/getBids");
        const bids = Array.isArray(bidsRes.data?.bids) ? bidsRes.data.bids : [];

        // Map jobId to accepted/completed bid
        const acceptedBidsMap = bids
            .filter(bid => bid.status === "accepted" || bid.status === "completed")
            .reduce((acc, bid) => {
                acc[bid.jobId] = bid;
                return acc;
            }, {});

        let totalProjects = gigs.length;
        let activeProjects = 0;
        let completedProjects = 0;

        const enrichedProjects = await Promise.all(gigs.map(async (project) => {
            const acceptedBid = acceptedBidsMap[project._id] || null;

            const milestones = Array.isArray(project.milestones) ? project.milestones : [];
            const totalMilestones = milestones.length;
            const paidMilestones = milestones.filter(m => m.isPaid).length;

            // Completion status
            const isCompleted = paidMilestones === totalMilestones && totalMilestones > 0;

            if (isCompleted) {
                completedProjects++;
            } else if (acceptedBid) {
                activeProjects++;
            }

            const now = new Date();
            const deadline = new Date(project.deadline);
            const timeDiff = deadline - now;
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            let priority = "Low";
            if (daysLeft <= 5) {
                priority = "High";
            } else if (daysLeft <= 15) {
                priority = "Medium";
            }
            const createdAt = new Date(project.createdAt);
            const updatedAt = new Date(project.updatedAt);
            const deadLine = new Date(project.deadline);

            // Calculate workedHours (in hours, rounded to 1 decimal)
            const workedHours = +((updatedAt - createdAt) / (1000 * 60 * 60)).toFixed(1);

            // Calculate totalHours (from creation to deadline)
            const totalHours = +((deadLine - createdAt) / (1000 * 60 * 60)).toFixed(1);

            // Progress percentage
            const progress = totalMilestones > 0
                ? ((paidMilestones / totalMilestones) * 100).toFixed(1)
                : "";

            let clientInfo = null;
            let freelancerInfo = null;

            if (acceptedBid) {
                try {
                    const freelancerId = Array.isArray(acceptedBid.freelancerId)
                        ? acceptedBid.freelancerId[0]
                        : acceptedBid.freelancerId;

                    const [clientRes, freelancerRes] = await Promise.all([
                        axios.get(`http://localhost:5000/api/auth/getClient/${acceptedBid.clientId}`),
                        axios.get(`http://localhost:5000/api/auth/getUser/${freelancerId}`)
                    ]);

                    clientInfo = clientRes.data;
                    freelancerInfo = freelancerRes.data;
                } catch (err) {
                    console.error(`Failed to fetch user details for project ${project._id}:`, err.message);
                }
            }

            return {
                ...project,
                acceptedBid,
                progress,
                priority,
                workedHours,
                totalHours,
                isCompleted,
                clientInfo:{
                    company:clientInfo?.clientProfile?.company || "N/A",
                    profilePic: clientInfo?.profile || null,
                },
                freelancerInfo:{
                    name: freelancerInfo?.firstName + " " + freelancerInfo?.lastName || "N/A",
                    profilePic: freelancerInfo?.profile || null,
                },
            };
        }));

        const avgCompletionRate = totalProjects > 0
            ? ((completedProjects / totalProjects) * 100).toFixed(2)
            : "0.00";

        return res.status(200).json({
            totalProjects,
            activeProjects,
            completedProjects,
            avgCompletionRate: `${avgCompletionRate}%`,
            projects: enrichedProjects,
        });

    } catch (error) {
        console.error("Error fetching gigs dashboard data:", error.message || error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
