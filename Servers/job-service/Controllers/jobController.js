import multer from "multer";
import Job from "../Models/Job.js";
import { createCache, deleteCache, getCache } from "../Utils/cache.js";
import cloudinary from "../Utils/cloudinaryConfig.js";
import axios from "axios";
import SavedGigs from "../Models/SavedGigs.js";
import mongoose from "mongoose";
import Bid from "../Models/Bid.js";
import moment from "moment";

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const Auth_URL = process.env.AUTH_SERVICE_URL || "http://localhost:5000/api/auth/users";

export const upload = multer({ storage: storage });

export const createJob = async(req,res) => {
    const {title,description,budget,deadline,category,location,detailDesc,jobType,experienceLevel} = req.body;
    const { userId } = req.user;
    if (!title || !description || !budget || !deadline || !category || !location || !detailDesc || !jobType || !experienceLevel) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try{
        let imageUrl = "";
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'profile_images',
                crop: 'fill',
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            imageUrl= result.secure_url;
        }
        const milestones = req.body.milestones ? JSON.parse(req.body.milestones) : [];
        const skills = req.body.skills ? JSON.parse(req.body.skills) : [];
        const benefits = req.body.benefits ? JSON.parse(req.body.benefits) : [];
        const requirements = req.body.requirements ? JSON.parse(req.body.requirements) : [];
        const job = new Job({
            title,
            description,
            budget,
            deadline,
            category,
            clientId: userId,
            milestones,
            skills,
            location,
            detailDesc,
            benefits,
            jobType,
            requirements,
            experienceLevel,
            image: imageUrl
        });
        await job.save();

        const userResponse = await axios.get(Auth_URL);
        const users = userResponse.data;
        const client = users.find(user => user._id.toString() === userId.toString());
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        client.clientProfile.projects.push(job._id);
        await createCache('jobs', JSON.stringify([job]), 300);

        res.status(201).json({ message: 'Job created successfully', job });
    } catch(error){
        res.status(500).json({message: 'Error while creating job',error: error.message});
    }
}

export const getJobs = async(req,res) => {
    try {
        const cachedJobs = await getCache('jobs');
        if (cachedJobs) {
            return res.status(200).json(JSON.parse(cachedJobs));
        } else {
            const jobs = await Job.find();
            await createCache('jobs', JSON.stringify(jobs), 60);
            return res.status(200).json(jobs);
        }
    } catch (error) {
        res.status(500).json({message: 'Error while fetching jobs',error: error.message});
    }
}


export const getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const cachedJob = await getCache(`job_${id}`);
        if (cachedJob) {
            try {
                return res.status(200).json(JSON.parse(cachedJob));
            } catch (parseError) {
                console.error("Cache parse error:", parseError);
            }
        }
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        let client = null;
        try {
            const userResponse = await axios.get("http://localhost:5000/api/auth/users");
            const users = userResponse.data;
            client = users.find(user => user._id.toString() === job.clientId.toString());
        } catch (userFetchError) {
            console.error("Error fetching users:", userFetchError.message);
        }

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        const clientInfo = {
            username: client.firstName ,
            email: client.email,
            profile: client.profile,
            company: client.clientProfile.company,
            location: client.clientProfile.location,
            website: client.clientProfile.website,
            since: client.createdAt
        };

        const jobData = { ...job.toObject(), clientInfo };
        try {
            await createCache(`job_${id}`, JSON.stringify(jobData), 300); // 5-minute cache
        } catch (cacheError) {
            console.error("Cache save error:", cacheError);
        }
        return res.status(200).json(jobData);
    } catch (error) {
        console.error("Error fetching job:", error.message);
        res.status(500).json({ message: "Error while fetching job", error: error.message });
    }
};


export const addMilestone = async(req,res) => {
    const {jobId,description,amount} = req.body;
    try {
        const job = await Job.findById(jobId);
        if(!job) return res.status(404).json({message: 'Job not found'});
        job.milestones.push({description,amount});
        await job.save();
        res.status(200).json({message: 'Milestone added successfully',job});
    } catch (error) {
        res.status(500).json({message: 'Error while adding milestone',error: error.message});
    }
}

export const deleteJob = async(req,res) => {
    const {jobId} = req.params;
    try {
        const job = await Job.findById(jobId);
        if(!job) return res.status(404).json({message: 'Job not found'});
        await Job.deleteOne({_id: jobId});
        await deleteCache('jobs');
        res.status(200).json({message: 'Job deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error while deleting job',error: error.message});
    }
}

export const saveJobByFreelancer = async (req, res) => {
    const { jobId } = req.body;
    const { userId } = req.user;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        const gig = await SavedGigs.findOne({ jobId, freelancerId: userId });
        if (gig) {
            return res.status(400).json({ message: 'Gig already saved' });
        }
        
        const savedGig = new SavedGigs({
            jobId,
            freelancerId: userId
        });
        await savedGig.save();
        return res.status(201).json({ message: 'Job saved successfully', job });
    } catch (error) {
        res.status(500).json({
            message: 'Error while saving job',
            error: error.message
        });
    }
};


export const getSavedJobsByFreelancer = async (req, res) => {
    const { userId } = req.user;
    try {
        const savedGigs = await SavedGigs.find({ freelancerId: userId }).populate('jobId');
        if (!savedGigs || savedGigs.length === 0) {
            return res.status(404).json({ message: 'No saved jobs found' });
        }
        return res.status(200).json(savedGigs);
    } catch (error) {
        res.status(500).json({
            message: 'Error while fetching saved jobs',
            error: error.message
        });
    }
};


export const unsaveJobByFreelancer = async (req, res) => {
    const { userId } = req.user;
    const { jobId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: 'Invalid userId or jobId' });
        }
        const savedGig = await SavedGigs.findOne({ jobId, freelancerId: userId });
        if (savedGig >= null) {
            return res.status().json({ message: 'Saved job not found' });
        }
        await SavedGigs.deleteOne({ _id: savedGig._id });
        return res.status(200).json({ message: 'Job unsaved successfully' });
    } catch (error) {
        return res.status(500).json({
            message: 'Error while unsaving job',
            error: error.message,
        });
    }
};

export const getClientGigs = async (req, res) => {
    const { userId } = req.user;
    try {
        const job = await Job.find({ clientId: userId });
        if (!job || job.length === 0) {
            res.status(404).json({ message: 'No gigs found for this client' });
        }
        return res.status(200).json(job);
    } catch (error) {
        return res.status(500).json({
            message: 'Error while fetching client gigs',
            error: error.message,
        });
    }
}


export const generateReportForClient = async (req, res) => {
    const { userId } = req.user;

    try {
        const jobs = await Job.find({ clientId: userId }).lean();

        if (!jobs.length) {
            return res.status(404).json({ message: "No gigs found for this client" });
        }

        const jobIds = jobs.map(job => job._id);
        const bids = await Bid.find({ jobId: { $in: jobIds } }).lean();

        const statusCount = {
            open: 0,
            "in-progress": 0,
            completed: 0,
            closed: 0,
        };

        const monthlyRevenue = {}; // e.g. { "2025-07": { paid: 0, unpaid: 0 } }

        const detailedJobs = await Promise.all(jobs.map(async job => {
            const jobBids = bids.filter(bid => String(bid.jobId) === String(job._id));
            const totalBids = jobBids.length;

            // 🧠 Get latest accepted bid for the job
            const acceptedBid = jobBids
                .filter(bid => bid.status === "accepted" && bid.freelancerId)
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

            let acceptedFreelancer = null;
            if (acceptedBid && acceptedBid.freelancerId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/auth/getUser/${acceptedBid.freelancerId}`);
                    acceptedFreelancer = response.data;
                } catch (err) {
                    acceptedFreelancer = {
                        _id: acceptedBid.freelancerId,
                        error: "Failed to fetch freelancer details",
                    };
                }
            }

            // 💰 Revenue summary
            let paidAmount = 0;
            let unpaidAmount = 0;

            job.milestones?.forEach(milestone => {
                if (milestone.isPaid) {
                    paidAmount += milestone.amount;
                } else {
                    unpaidAmount += milestone.amount;
                }

                const monthKey = moment(job.createdAt).format("YYYY-MM");
                if (!monthlyRevenue[monthKey]) {
                    monthlyRevenue[monthKey] = { paid: 0, unpaid: 0 };
                }

                if (milestone.isPaid) {
                    monthlyRevenue[monthKey].paid += milestone.amount;
                } else {
                    monthlyRevenue[monthKey].unpaid += milestone.amount;
                }
            });

            statusCount[job.status] += 1;

            return {
                ...job,
                totalBids,
                acceptedFreelancer,
                paidAmount,
                unpaidAmount,
            };
        }));

        return res.status(200).json({
            message: "Report generated successfully",
            report: {
                totalJobs: jobs.length,
                statusCount,
                monthlyRevenue,
                jobs: detailedJobs,
            },
        });

    } catch (error) {
        console.error("Error in generateReportForClient:", error.message);
        return res.status(500).json({
            message: "Error while generating report",
            error: error.message,
        });
    }
};

export const freelancerDashboardDetails = async (req, res) => {
    const { userId } = req.user;

    try {
        // 1. Get all accepted bids for this freelancer
        const acceptedBids = await Bid.find({ freelancerId: userId })
            .populate("jobId");

        // 2. Extract valid jobs
        const validJobs = acceptedBids
            .filter(bid => bid.jobId !== null)
            .map(bid => bid.jobId);

        // 3. Fetch companyName for each job's clientId via individual API calls
        const allProjectsWithAnalytics = await Promise.all(
            validJobs.map(async (job) => {
                let companyName = null;
                let companyLogo = null;
                let companyEmail = null;

                try {
                    if (job.clientId) {
                        const { data } = await axios.get(
                            `http://localhost:5000/api/auth/client/${job.clientId}`
                        );
                        companyName = data?.clientProfile?.company || null;
                        companyLogo = data?.profile || null;
                        companyEmail = data?.email || null;
                    }
                } catch (err) {
                    res.status(500).send(`Failed to fetch client for job ${job._id}: ${err.message}`);
                }

                // Analytics
                const totalMilestones = job.milestones.length;
                const paidMilestones = job.milestones.filter(m => m.isPaid).length;
                const pendingMilestones = totalMilestones - paidMilestones;
                const totalEarnings = job.milestones
                    .filter(m => m.isPaid)
                    .reduce((acc, m) => acc + m.amount, 0);

                return {
                    job: {
                        ...job.toObject(),
                        clientCompanyName: companyName,
                        clientLogo: companyLogo,
                        clientEmail: companyEmail,
                    },
                    analytics: {
                        totalMilestones,
                        paidMilestones,
                        pendingMilestones,
                        totalEarnings,
                    },
                };
            })
        );

        const completedJobs = allProjectsWithAnalytics.filter(p => p.job.status === "completed");
        const activeProjects = allProjectsWithAnalytics.filter(p =>
            ["open", "in-progress"].includes(p.job.status)
        );

        res.status(200).json({
            totalCompletedJobs: completedJobs.length,
            totalActiveProjects: activeProjects.length,
            completedJobs,
            allProjects: allProjectsWithAnalytics,
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error while fetching freelancer dashboard details",
            error: error.message,
        });
    }
};