import express from 'express';
import { captureFiatPayment, createFiatPayment } from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/fiat',authMiddleware,createFiatPayment);
router.post('/fiat/capture',authMiddleware,captureFiatPayment);

export default router;