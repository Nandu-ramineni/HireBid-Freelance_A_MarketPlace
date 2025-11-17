import express from 'express';
import { authMiddleware } from '../Middlewares/authMiddleware.js';
import { getNotificationByUser, markAsRead, sendNotification } from '../Controllers/notificationController.js';
import { body } from 'express-validator';
const router = express.Router();

router.post('/',authMiddleware,
    [
        body('userId','userId is required').notEmpty().withMessage('userId is required'),
        body('message','message is required').notEmpty().withMessage('message is required'),
        body('notificationType','notificationType is required').not().isEmpty().withMessage('notificationType is required')
    ]
    ,sendNotification);

router.get('/',authMiddleware,getNotificationByUser);
router.patch('/:notificationId',authMiddleware,markAsRead);

export default router;