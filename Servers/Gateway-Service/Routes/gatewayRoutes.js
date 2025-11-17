import express from 'express';
import { forwardToAuthService, forwardToJobService } from '../Controllers/gatewayController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';
import rateLimit from 'express-rate-limit';


const router = express.Router();

router.use('/auth',forwardToAuthService);
router.use('/jobs',authMiddleware,forwardToJobService);
router.use('/reputation',authMiddleware,forwardToJobService);
router.use('/payment',authMiddleware,forwardToJobService);
router.use('/chat',authMiddleware,forwardToJobService);
router.use('/notification',authMiddleware,forwardToJobService);

// router.use(rateLimit)
export default router;