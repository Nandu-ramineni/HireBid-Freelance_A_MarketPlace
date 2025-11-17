import express from 'express';
import { authMiddleware } from '../Middlewares/authMiddleware.js';
import { body } from 'express-validator';
import { getReputation, updateReputation } from '../Controllers/reputationController.js';


const router = express.Router();

router.post('/rate',authMiddleware,
    [
        body('rating').isInt({min:1,max:5}).withMessage('Rating must be between 1 and 5'),
        body('review').optional().isString().withMessage('Review must be a string'),
        body('userId').not().isEmpty().withMessage('userId is required'),
    ], updateReputation
);
router.get('/:userId',authMiddleware, getReputation);

export default router;