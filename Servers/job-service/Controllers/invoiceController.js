import Job from "../Models/Job.js";


export const getInvoicesForClient = async (req, res) => {
    const { userId } = req.user;

    try {
        // Fetch all jobs created by the client
        const jobs = await Job.find({ clientId: userId }).lean();

        // Filter jobs with at least one milestone having an invoice
        const jobsWithInvoices = jobs
            .map(job => {
                const invoiceMilestones = job.milestones?.filter(m => m.invoice);

                if (invoiceMilestones.length > 0) {
                    return {
                        jobId: job._id,
                        title: job.title,
                        freelancerId: job.freelancerId,
                        status: job.status,
                        category: job.category,
                        image: job.image,
                        jobType: job.jobType,
                        milestones: invoiceMilestones.map(m => ({
                            description: m.description,
                            amount: m.amount,
                            isPaid: m.isPaid,
                            invoice: m.invoice
                        }))
                    };
                }

                return null;
            })
            .filter(job => job !== null);

        return res.status(200).json({ invoices: jobsWithInvoices });
    } catch (error) {
        console.error("Error fetching invoices for client:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

