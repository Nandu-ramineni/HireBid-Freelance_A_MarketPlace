import express from "express";
import { apiLatencyMiddleware, getApiLatencyStats, getDatabaseStats, getServerStats, getSlowQueries } from "../controllers/monitorController.js";


const router = express.Router();

// Apply latency tracking to all admin routes
router.use(apiLatencyMiddleware);

router.get("/db", getDatabaseStats);
router.get("/server", getServerStats);
router.get("/latency", getApiLatencyStats);
router.get("/slow-queries", getSlowQueries);

export default router;
