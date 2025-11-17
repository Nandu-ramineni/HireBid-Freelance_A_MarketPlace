import express from 'express';
import { rateLimiterMiddleware } from '../utils/rateLimiter.js';
import { changePassword, deleteUser, facebookOAuthLogin, forgotPassword, getAllFreelancers, getClient, getClientProfile, getClients, getFreelancers, getSavedProfiles, getUserById, getUsers, googleOAuthLogin, microsoftOAuthLogin, refreshTokens, resetPassword, saveFreelancerProfile, sendOtpToEmail, updateClientProfile, updateFreelancerProfile, updateProfile, updateUserStatus, upload, userLogin, userRegister, verifyOtp } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createReview } from '../controllers/reviewController.js';


const router = express.Router();

router.post('/register', rateLimiterMiddleware, userRegister);
router.post('/login', rateLimiterMiddleware, userLogin);
router.post('/google',rateLimiterMiddleware,googleOAuthLogin);
router.post('/facebook',rateLimiterMiddleware,facebookOAuthLogin);
router.post('/microsoft',rateLimiterMiddleware,microsoftOAuthLogin);
router.post('/refresh',  refreshTokens);
router.get('/users', rateLimiterMiddleware, getUsers);
router.get('/getUser',authMiddleware, getUserById);
router.get('/getClient',authMiddleware, getClientProfile);
router.get('/getUser/:userId',getFreelancers);
router.get('/getClient/:userId',getClients);
router.get('/client/:userId',getClient)
router.post('/save-freelancer',authMiddleware,saveFreelancerProfile);
router.get('/get-saved-freelancers', authMiddleware, getSavedProfiles);
router.patch('/update',authMiddleware, upload.single('profileImage'), updateFreelancerProfile);
router.patch('/update-clientProfile',authMiddleware, upload.single('profileImage'), updateClientProfile);
router.patch('/change-password',authMiddleware, changePassword);
router.post('/post-review',authMiddleware, rateLimiterMiddleware, createReview);
router.post('/forgot-password',rateLimiterMiddleware,forgotPassword);
router.post('/forgot-password/send-otp',rateLimiterMiddleware,sendOtpToEmail);
router.post('/forgot-password/verify-otp',rateLimiterMiddleware,verifyOtp);
router.post('/reset-password/:resetToken',rateLimiterMiddleware,resetPassword);
router.delete('/delete',authMiddleware, deleteUser);
router.get('/freelancers', getAllFreelancers);
router.patch('/update-status/:userId', updateUserStatus);

export default router;