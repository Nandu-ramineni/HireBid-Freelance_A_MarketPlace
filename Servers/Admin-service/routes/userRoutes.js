import express from "express";
import { getClients, getFreelancers, getUsers, updateUserStatus } from "../controllers/userController.js";
import { rateLimiterMiddleware } from "../utils/rateLimiter.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";


const router = express.Router();

router.get('/getUsers',authMiddleware,rateLimiterMiddleware,getUsers)
router.get('/getClients', authMiddleware,rateLimiterMiddleware,getClients)
router.get('/getFreelancers', authMiddleware, rateLimiterMiddleware,getFreelancers)
router.patch('/update-status/:userId', authMiddleware, updateUserStatus);

export default router;