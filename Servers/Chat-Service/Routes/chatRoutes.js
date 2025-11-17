import express from 'express';
import { getChatByJobId, sendMessage } from '../Controllers/chatController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';


const router = express.Router();

router.post('/send',authMiddleware,sendMessage);
router.get('/:jobId',authMiddleware,getChatByJobId);

export default router;