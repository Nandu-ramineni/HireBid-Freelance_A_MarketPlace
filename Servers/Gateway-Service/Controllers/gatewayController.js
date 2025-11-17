import { forwardRequest } from "../Services/proxyService.js";


export const forwardToAuthService = (req,res) => forwardRequest('auth',req,res);
export const forwardToJobService = (req,res) => forwardRequest('job',req,res);
export const forwardToReputationService = (req,res) => forwardRequest('reputation',req,res);
export const forwardToPaymentService = (req,res) => forwardRequest('payment',req,res);
export const forwardToChatService = (req,res) => forwardRequest('chat',req,res);
export const forwardToNotificationService = (req,res) => forwardRequest('notification',req,res);
