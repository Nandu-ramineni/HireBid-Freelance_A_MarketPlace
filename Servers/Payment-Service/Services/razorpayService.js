import razorpayInstance from "../Config/razorpayConfig.js";
import Payment from "../Models/Payment.js";
import crypto from 'crypto'

export const createRazorPayOrder = async(amount,currency,userId,jobId,freelancerId) => {
    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: `receipt_job_${jobId}`,
        payment_capture: 1 
    };
    try {
        const order = await razorpayInstance.orders.create(options);
        const payment = new Payment({
            jobId,
            clientId: userId,
            freelancerId,
            amount,
            currency,
            paymentMethod: 'razorpay',
            status: 'pending',
            razorpayOrderId: order.id,
            status: 'pending'
        });
        await payment.save();
        return { orderId: order.id, paymentId: payment._id};
    } catch (error) {
        console.log('Error while creating Razorpay order',error);
    }
}

export const captureRazorPayPayment = async(razorpayPaymentId,razorpayOrderId,razorpaySignature) => {
    try {
        const payment = await Payment.find({razorpayOrderId});
        if(!payment){
            return { status: 'failed', message: 'Payment not found'};
        }
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generatedSignature = hmac.digest('hex');
        if(generatedSignature !== razorpaySignature){
            return { status: 'failed', message: 'Invalid signature'};
        }
        payment.razorpayPaymentId = razorpayPaymentId;
        payment.status = 'completed';
        await payment.save();
        return payment;
    } catch (error) {
        console.log('Error while capturing Razorpay Payment',error)
    }
}
