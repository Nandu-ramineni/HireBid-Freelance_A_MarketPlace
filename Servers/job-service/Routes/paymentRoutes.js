import express from 'express';
import { authMiddleware } from '../Middlewares/authMiddleware.js';
import { captureFiatPayment, createFiatPayment, getAllPayments } from '../Controllers/paymentController.js';


const router = express.Router();

router.post('/fiat',authMiddleware,createFiatPayment);
router.post('/fiat/capture',authMiddleware,captureFiatPayment);
router.get('/all',authMiddleware,getAllPayments);

export default router;