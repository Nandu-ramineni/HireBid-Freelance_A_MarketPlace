import express from 'express';
import { captureFiatPayment,  createFiatPayment } from '../Controllers/paymentController.js';
import {authMiddleware} from '../Middlewares/authMiddleware.js';
const router = express.Router();
router.post('/fiat',authMiddleware,createFiatPayment);
router.post('/fiat/capture',authMiddleware,captureFiatPayment);
// router.post('/crypto',authMiddleware,createCryptoPayment);

export default router;