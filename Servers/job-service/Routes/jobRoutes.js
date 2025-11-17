import express from 'express';
import { authMiddleware } from '../Middlewares/authMiddleware.js';
import { addMilestone, createJob, deleteJob, freelancerDashboardDetails, generateReportForClient, getClientGigs, getJobById, getJobs, getSavedJobsByFreelancer, saveJobByFreelancer, unsaveJobByFreelancer, upload } from '../Controllers/jobController.js';
import {   acceptBid,completeBid,getAcceptedFreelancerBidByJobId,getBidDetails,getBids,getBidsByJobId, getBidsByUser, getClientAcceptedBids, getClientCompletedBids, getFreelancerCompletedBids, placeBid,   } from '../Services/bidService.js';
import { getFinancialOverviewForFreelancer, getFreelancerJobs, getJobRecommendsForClient, getJobRecommendsForFreelancer } from '../Services/jobService.js';
import { getInvoicesForClient } from '../Controllers/invoiceController.js';
import { getFreelancerPaymentHistory} from '../Controllers/paymentController.js';

const router = express.Router();

router.post('/post-job',authMiddleware,upload.single('image'),createJob);
router.get('/jobs',getJobs);
router.get('/getBids',getBids)
router.get('/jobs/savedGigs',authMiddleware,getSavedJobsByFreelancer);
router.get('/client/jobs',authMiddleware,getClientGigs);
router.get('/freelancer/jobs',authMiddleware,getFreelancerJobs);
router.get('/jobs/:id',getJobById);
router.post('/jobs/milestone',authMiddleware,addMilestone);
router.post('/bids',authMiddleware,placeBid);
router.patch('/bids/:bidId/accept', authMiddleware, acceptBid);
router.patch('/bids/:bidId/complete', authMiddleware, completeBid);
router.get('/bids/:jobId',authMiddleware,getBidsByJobId);
router.get('/bid/:bidId',authMiddleware,getBidDetails);
router.get('/client-report',authMiddleware,generateReportForClient);
router.get('/get-accepted-bid/:jobId', authMiddleware, getAcceptedFreelancerBidByJobId);
router.get('/client-accepted-bids',authMiddleware,getClientAcceptedBids);
router.get('/client-completed-bids',authMiddleware,getClientCompletedBids);
router.get('/freelancer-completed-bids', authMiddleware, getFreelancerCompletedBids);
router.get('/client/invoices', authMiddleware, getInvoicesForClient);
router.get('/freelancer/financial-overview', authMiddleware, getFinancialOverviewForFreelancer);
router.get('/freelancer/analytics', authMiddleware, freelancerDashboardDetails);
router.get('/payment-history', authMiddleware, getFreelancerPaymentHistory);
router.get('/user-bids',authMiddleware,getBidsByUser);
router.get('/recommend',authMiddleware,getJobRecommendsForFreelancer);
router.get('/client/recommend',authMiddleware,getJobRecommendsForClient);
router.post('/job/save-gig',authMiddleware,saveJobByFreelancer);
router.delete('/job/delete/:jobId',authMiddleware,deleteJob);
router.delete('/jobs/unsave', authMiddleware, unsaveJobByFreelancer);



export default router;