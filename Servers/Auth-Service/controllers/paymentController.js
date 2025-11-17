import { captureRazorPayPayment, createRazorPayOrder } from "../services/razorpayService.js";


export const createFiatPayment = async (req, res) => {
    const {userId} = req.user;
    const {subscriptionId,amount, currency} = req.body;
    try {
        const {orderId, paymentId} = await createRazorPayOrder(amount, currency, userId, subscriptionId);
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
        }
        res.status(200).json({message: 'Payment successful', payment});
    } catch (error) {
        res.status(500).json({message: 'Payment failed', error: error.message});
    }
}