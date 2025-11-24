import { getAllPayments } from "../controllers/paymentController.js";
import express from "express";

const router  = express.Router();

router.get('/all',authMiddleware,getAllPayments);

export default router;