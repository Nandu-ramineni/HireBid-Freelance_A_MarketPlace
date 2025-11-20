import express from "express";
import { rateLimiterMiddleware } from "../utils/rateLimiter.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { getBidsData, getGigsDashboardData } from "../controllers/gigsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();
router.get('/getGigs',authMiddleware,getGigsDashboardData)
router.get('/getBids',authMiddleware,rateLimiterMiddleware,getBidsData)


export default router;