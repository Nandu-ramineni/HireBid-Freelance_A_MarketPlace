import axios from "axios";
import Bid from "../Models/Bid.js"
import Job from "../Models/Job.js";
import { sendBidAcceptedEmail } from "../Utils/nodemailerConfig.js";


export const placeBid = async (req, res) => {
    const { jobId, amount, message } = req.body;
    const { userId } = req.user;
    const token = req.headers.authorization;

    try {
        const { data: subscriptionData } = await axios.get('http://localhost:5000/api/subscription/userSubscriptions', {
            headers: {
                Authorization: token,
            },
        });


        if (!subscriptionData || !subscriptionData.subscriptions || subscriptionData.subscriptions.length === 0) {
            return res.status(404).json({ message: 'Subscription details not found' });
        }

        const userPlan = subscriptionData.subscriptions.filter(sub =>
            (sub.plan === 'premium' || sub.plan === 'enterprise') &&
            sub.status === 'active'
        );

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Gig not found' });
        }

        if (job.clientId.toString() === userId) {
            return res.status(400).json({ message: 'You cannot bid on your own Gig' });
        }

        if (job.budget < amount) {
            return res.status(400).json({ message: 'Bid amount cannot be greater than Gig budget' });
        }

        if (job.budget > 20000 && !userPlan) {
            return res.status(400).json({ message: 'Please upgrade your subscription to bid on high-budget Gigs' });
        }

        if (job.status === 'in-progress' || job.status === 'completed') {
            return res.status(400).json({ message: `Job is ${job.status}` });
        }

        const existingBid = await Bid.findOne({ jobId, freelancerId: userId });
        if (existingBid) {
            return res.status(400).json({ message: 'You have already placed a bid on this Gig' });
        }

        const newBid = new Bid({
            jobId,
            clientId: job.clientId,
            freelancerId: userId,
            amount,
            message,
        });

        await newBid.save();
        job.proposals = (Number(job.proposals) || 0) + 1;
        await job.save();
        res.status(201).json({ message: 'Bid placed successfully', bid: newBid });

    } catch (error) {
        res.status(500).json({ message: 'Error while placing bid', error: error.message });
    }
};

export const acceptBid = async (req, res) => {
    const { bidId } = req.params;
    const { status } = req.body;
    const { userId } = req.user;
    try {
        if (!['accepted', 'rejected','completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Please provide either accepted, rejected, or completed' });
        }
        const bid = await Bid.findById(bidId);
        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }
        const freelancerDetails = await axios.get(`http://localhost:5000/api/auth/getUser/${bid.freelancerId}`);
        if (!freelancerDetails.data) {
            return res.status(404).json({ error: 'Freelancer not found' });
        }
        const { email, username } = freelancerDetails.data;
        const job = await Job.findById(bid.jobId);
        if (!job || job.clientId.toString() !== userId) {
            return res.status(403).json({ error: 'You are not authorized to accept this bid' });
        }
        if (job.status === 'in-progress') {
            return res.status(400).json({ error: 'Job is already in progress' });
        }
        if (status === 'accepted') {
            job.status = 'in-progress';
            bid.status = 'accepted';
            bid.acceptedFreelancerId = bid.freelancerId;
        } else if (status === 'rejected') {
            if (bid.status === 'accepted') {
                return res.status(400).json({ error: 'Cannot reject an already accepted bid' });
            }
            bid.status = 'rejected';
            bid.acceptedFreelancerId = null;
        } 
        await job.save();
        await bid.save();
        await sendBidAcceptedEmail(email, username, bid.status, job.title);
        res.status(200).json({ message: `Bid ${status} successfully`, bid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process bid' });
    }
};
export const completeBid = async (req, res) => {
    const { bidId } = req.params;
    const { status } = req.body;
    const { userId } = req.user;

    try {
        if (status !== 'completed') {
            return res.status(400).json({ error: 'Invalid status. Please provide "completed"' });
        }

        const bid = await Bid.findById(bidId);
        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }

        const job = await Job.findById(bid.jobId);
        if (!job || job.clientId.toString() !== userId) {
            return res.status(403).json({ error: 'You are not authorized to complete this bid' });
        }

        if (job.status !== 'in-progress') {
            return res.status(400).json({ error: 'Job is not in progress' });
        }

        if (bid.status !== 'accepted') {
            return res.status(400).json({ error: 'Bid is not accepted' });
        }

        // ✅ Check if all milestones are paid
        const unpaidMilestone = job.milestones.find(m => !m.isPaid);
        if (unpaidMilestone) {
            return res.status(400).json({ error: 'All milestones must be marked as paid before completing the job.' });
        }

        const freelancerDetails = await axios.get(`http://localhost:5000/api/auth/getUser/${bid.freelancerId}`);
        if (!freelancerDetails.data) {
            return res.status(404).json({ error: 'Freelancer not found' });
        }

        const { email, username } = freelancerDetails.data;

        job.status = 'completed';
        bid.status = 'completed';

        await job.save();
        await bid.save();

        await sendBidAcceptedEmail(email, username, bid.status, job.title);

        res.status(200).json({ message: 'Bid completed successfully', bid });

    } catch (error) {
        console.error('Error in completeBid:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getBidsByJobId = async (req, res) => {
    const { jobId } = req.params;
    try {
        const bids = await Bid.find({ jobId }).populate(
            'jobId',
            'title image budget category skills deadline'
        );
        if (!bids.length) {
            return res.status(404).json({ message: 'No bids found for this job' });
        }
        const bidsWithFreelancers = await Promise.all(
            bids.map(async (bid) => {
                const freelancerId = Array.isArray(bid.freelancerId)
                    ? bid.freelancerId[0]
                    : bid.freelancerId;
                if (!freelancerId) return null;
                try {
                    const { data: freelancer } = await axios.get(
                        `http://localhost:5000/api/auth/getUser/${freelancerId}`
                    );
                    return {
                        bid,
                        freelancer,
                    };
                } catch (err) {
                    console.warn(`Could not fetch freelancer for bid ${bid._id}: ${err.message}`);
                    return null;
                }
            })
        );
        const validBids = bidsWithFreelancers.filter(Boolean);
        res.status(200).json({
            jobId,
            totalBids: validBids.length,
            bids: validBids,
        });
    } catch (error) {
        console.error('Error in getBidsByJobId:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getBidDetails = async (req, res) => {
    const { bidId } = req.params;
    try {
        const bid = await Bid.findById(bidId).populate('jobId', 'title image budget category skills deadline status');
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        const clientDetails = await axios.get(`http://localhost:5000/api/auth/getClient/${bid.clientId}`);
        if (!clientDetails.data) {
            return res.status(404).json({ message: 'client not found' });
        }
        const { clientProfile, profile } = clientDetails.data;
        const bidData = bid.toObject();
        bidData.clientName = clientProfile.company;
        bidData.clientProfile = profile;
        res.status(200).json({ bid: bidData });
    }
    catch (error) {
        res.status(500).json({ message: 'Error while fetching bid', error: error.message });
    }
}

export const getBidsByUser = async (req, res) => {
    const { userId } = req.user;
    try {
        let bids = await Bid.find({ freelancerId: userId }).populate('jobId', 'title image budget category description');
        // Filter out bids where jobId is null due to deleted job
        bids = bids.filter(bid => bid.jobId !== null);
        if (bids.length === 0) {
            return res.status(404).json({ message: 'No valid bids found for this user' });
        }
        res.status(200).json({ bids });
    } catch (error) {
        res.status(500).json({
            message: 'Error while fetching bids',
            error: error.message,
        });
    }
};



export const getAcceptedFreelancerBidByJobId = async (req, res) => {
    const { jobId } = req.params;
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        const acceptedBid = await Bid.findOne({ jobId, status: 'accepted' })
        if (!acceptedBid) {
            return res.status(404).json({ message: 'No accepted bid found for this job' });
        }
        const freelancerDetails = await axios.get(`http://localhost:5000/api/auth/getUser/${acceptedBid.freelancerId}`);
        if (!freelancerDetails.data) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.status(200).json({ acceptedBid, freelancer: freelancerDetails.data });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching accepted bid', error: error.message });
    }
}

export const getClientAcceptedBids = async (req, res) => {
    const { userId } = req.user;
    try {
        const jobs = await Job.find({ clientId: userId, status: 'in-progress' });
        if (!jobs.length) {
            return res.status(404).json({ message: 'No in-progress jobs found for this client' });
        }

        const acceptedBids = await Bid.find({ jobId: { $in: jobs.map(job => job._id) }, status: { $in: ['accepted', 'in-progress'] } })
            .populate('jobId', 'title image budget category skills deadline status');

        if (!acceptedBids.length) {
            return res.status(404).json({ message: 'No accepted bids found for this client' });
        }
        const totalAcceptedBids = acceptedBids.length;
        const acceptedBidsWithFreelancers = await Promise.all(
            acceptedBids.map(async (bid) => {
                const freelancerId = Array.isArray(bid.freelancerId) ? bid.freelancerId[0] : bid.freelancerId;
                if (!freelancerId) return null;

                try {
                    const { data: freelancer } = await axios.get(`http://localhost:5000/api/auth/getUser/${freelancerId}`);
                    return {
                        bid,
                        firstName: freelancer.firstName,
                        lastName: freelancer.lastName,
                        username: freelancer.username,
                        profile: freelancer.profile,
                        freelancerId: freelancer._id,
                        email: freelancer.email,
                        bio: freelancer.bio,
                        skills: freelancer.freelancerProfile.skills,


                    };
                } catch (err) {
                    console.warn(`Could not fetch freelancer for bid ${bid._id}: ${err.message}`);
                    return null;
                }
            })
        );


        res.status(200).json({ totalAcceptedBids,acceptedBids: acceptedBidsWithFreelancers.filter(Boolean) });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching accepted bids', error: error.message });
    }
}

export const getClientCompletedBids = async (req, res) => {
    const { userId } = req.user;

    try {
        // 1. Find completed jobs of this client
        const jobs = await Job.find({ clientId: userId, status: "completed" });

        if (!jobs.length) {
            return res.status(404).json({ message: "No completed jobs found for this client" });
        }

        // 2. Fetch completed bids for these jobs
        let completedBids = await Bid.find({
            jobId: { $in: jobs.map(job => job._id) },
            status: "completed"
        }).populate("jobId", "title image budget category skills deadline status");

        // 3. Filter out bids where job was deleted and populate returned null
        completedBids = completedBids.filter(bid => bid.jobId !== null);

        if (!completedBids.length) {
            return res.status(404).json({ message: "No completed bids found for this client" });
        }

        const totalCompletedBids = completedBids.length;

        // 4. Attach freelancer info
        const completedBidsWithFreelancers = await Promise.all(
            completedBids.map(async (bid) => {
                const freelancerId = Array.isArray(bid.freelancerId)
                    ? bid.freelancerId[0]
                    : bid.freelancerId;

                if (!freelancerId) return null;

                try {
                    const { data: freelancer } = await axios.get(
                        `http://localhost:5000/api/auth/getUser/${freelancerId}`
                    );

                    return {
                        bid,
                        firstName: freelancer.firstName,
                        lastName: freelancer.lastName,
                        username: freelancer.username,
                        profile: freelancer.profile,
                        freelancerId: freelancer._id,
                        email: freelancer.email,
                        bio: freelancer.bio,
                        skills: freelancer.freelancerProfile.skills,
                    };
                } catch (err) {
                    console.warn(`Freelancer fetch failed for bid ${bid._id}: ${err.message}`);
                    return null;
                }
            })
        );

        res.status(200).json({
            totalCompletedBids,
            completedBids: completedBidsWithFreelancers.filter(Boolean),
        });

    } catch (error) {
        res.status(500).json({
            message: "Error while fetching completed bids",
            error: error.message,
        });
    }
};


export const getFreelancerCompletedBids = async (req, res) => {
    const { userId } = req.user;
    try {
        const completedBids = await Bid.find({ freelancerId: userId, status: 'completed' })
            .populate('jobId', 'title image budget category skills deadline status');

        if (!completedBids.length) {
            return res.status(404).json({ message: 'No completed bids found for this freelancer' });
        }

        const totalCompletedBids = completedBids.length;
        const completedBidsWithClients = await Promise.all(
            completedBids.map(async (bid) => {
                const clientDetails = await axios.get(`http://localhost:5000/api/auth/getClient/${bid.clientId}`);
                if (!clientDetails.data) return null;

                return {
                    bid,
                    clientName: clientDetails.data.clientProfile.company,
                    clientProfile: clientDetails.data.profile,
                    clientId: clientDetails.data._id,
                    username: clientDetails.data.username,
                    email: clientDetails.data.email,
                    bio: clientDetails.data.bio,
                };
            })
        );

        res.status(200).json({ totalCompletedBids, completedBids: completedBidsWithClients.filter(Boolean) });
    }
    catch (error) {
        res.status(500).json({ message: 'Error while fetching completed bids', error: error.message });
    }
}


export const getBids = async (req, res) => {
    try {
        const bids = await Bid.find();
        if (!bids.length) {
            return res.status(404).json({ message: 'No bids found' });
        }
        res.status(200).json({ bids });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching bids', error: error.message });
    }
}