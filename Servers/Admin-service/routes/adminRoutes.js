import express from "express";
import { AdminLogin, registerAdmin } from "../controllers/adminController.js";

const router = express.Router();


router.post('/register',registerAdmin);
router.post('/login', AdminLogin);

export default router