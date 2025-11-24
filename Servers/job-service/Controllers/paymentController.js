import axios from "axios";
import Job from "../Models/Job.js";
import Payment from "../Models/Payment.js";
import { captureRazorPayPayment, createRazorPayOrder } from "../Services/razorpayService.js";

export const createFiatPayment = async (req, res) => {
    const {userId} = req.user;
    const {amount, currency,  freelancerId, bidId, jobId, milestoneId} = req.body;
    try {
        const {orderId, paymentId} = await createRazorPayOrder({amount, currency, clientId:userId, freelancerId, bidId, jobId, milestoneId});
        res.status(201).json({message: 'Payment order created', orderId, paymentId});
    } catch (error) {
        res.status(500).json({message: 'Payment order creation failed', error: error.message});
    }
}

export const captureFiatPayment = async (req, res) => {
    const {razorpayPaymentId, razorpayOrderId, razorpaySignature} = req.body;
    try {
        const payment = await captureRazorPayPayment(razorpayPaymentId, razorpayOrderId, razorpaySignature);
        if (payment.status === 'failed') {
            res.status(400).json({message: payment.message});
        } else {
            res.status(200).json({message: 'Payment successful', payment});
        }
    } catch (error) {
        res.status(500).json({message: 'Payment failed', error: error.message});
    }
}

export const getPaymentStatus = async (req, res) => {
    const {razorpayPaymentId} = req.params;
    try {
        const payment = await captureRazorPayPayment(razorpayPaymentId);
        if (payment.status === 'failed') {
            res.status(400).json({message: payment.message});
        } else {
            res.status(200).json({message: 'Payment status retrieved', payment});
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to retrieve payment status', error: error.message});
    }
}



export const getFreelancerPaymentHistory = async (req, res) => {
    const { userId } = req.user;

    try {
        const paymentHistory = await Payment.find({ freelancerId: userId })
            .populate({
                path: 'jobId',
                select: 'title milestones'
            })
            .populate({
                path: 'bidId',
                select: 'amount'
            })
            .sort({ createdAt: -1 });

        if (!paymentHistory || paymentHistory.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Get unique client IDs
        const clientIds = [...new Set(paymentHistory.map(p => p.clientId))];
        const clientDataMap = {};

        // Fetch client names
        await Promise.all(clientIds.map(async clientId => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/auth/getClient/${clientId}`);
                clientDataMap[clientId] = data?.clientProfile?.company || 'Unknown Client';
            } catch (e) {
                clientDataMap[clientId] = 'Unknown Client';
            }
        }));

        // Format response
        const formattedData = paymentHistory.map(payment => {
            const milestones = payment.jobId?.milestones || [];
            const milestone = payment.milestoneId
                ? milestones.find(m => m._id?.toString() === payment.milestoneId?.toString())
                : null;

            return {
                jobTitle: payment.jobId?.title || 'Untitled Job',
                clientName: clientDataMap[payment.clientId] || 'Unknown Client',
                milestoneDescription: milestone?.description || 'N/A',
                amount: payment.amount,
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                invoice: milestone?.invoice || null,
                paidAt: payment.updatedAt,
                type: payment.status === "completed" ? "credit" : payment.status,
            };
        });

        res.status(200).json({ success: true, data: formattedData });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve payment history',
            error: error.message,
        });
    }
};

export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: payments });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve payments',
            error: error.message,
        });
    }
};
