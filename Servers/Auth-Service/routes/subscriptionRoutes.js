import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { cancelSubscription, createSubscriptionIntent, getSubscriptionDetails, getSubscriptionHistory, getUserSubscriptions, updateSubscription } from '../controllers/subscriptionController.js';

const router = express.Router();


router.post('/subscribe',authMiddleware,createSubscriptionIntent);
router.post('/cancel',authMiddleware,cancelSubscription);
router.get('/userSubscriptions',authMiddleware,getUserSubscriptions);
router.get('/subscriptionHistory',authMiddleware,getSubscriptionHistory);
router.get('/subscriptionDetails/:subscriptionId',authMiddleware,getSubscriptionDetails);
router.patch('/updateSubscription',authMiddleware,updateSubscription);


export default router;