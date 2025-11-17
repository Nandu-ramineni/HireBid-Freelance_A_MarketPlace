import crypto from 'crypto'
import SubscriptionPayments from '../Models/Payment.js';
import razorpayInstance from '../utils/razorpayConfig.js';
import Subscription from '../models/Subscription.js';

export const createRazorPayOrder = async (amount, currency, userId, subscriptionId) => {

    if (!amount || isNaN(amount)) {
        throw new Error('Invalid amount');
    }


    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: `sub_${subscriptionId.toString().slice(-12)}`,
        payment_capture: 1
    };

    try {
        const order = await razorpayInstance.orders.create(options);

        const payment = new SubscriptionPayments({
            userId,
            subscriptionId,
            amount,
            currency,
            paymentMethod: 'razorpay',
            status: 'pending',
            razorpayOrderId: order.id,
        });

        await payment.save();

        return { orderId: order.id, paymentId: payment._id };
    } catch (error) {
        console.log('Error while creating Razorpay order', error);
        throw error;
    }
};


export const captureRazorPayPayment = async (razorpayPaymentId, razorpayOrderId, razorpaySignature,) => {
    try {
        console.log('Capturing Razorpay Payment', { razorpayPaymentId, razorpayOrderId, razorpaySignature });
        const payment = await SubscriptionPayments.findOne({ razorpayOrderId });
        console.log('Payment found', payment);
        if (!payment) {
            return { status: 'failed', message: 'Payment not found' };
        }
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const generatedSignature = hmac.digest('hex');
        if (generatedSignature !== razorpaySignature) {
            await SubscriptionPayments.findByIdAndUpdate(payment.subscriptionId, { status: 'pending' });
            return { status: 'failed', message: 'Invalid signature' };
        }
        payment.razorpayPaymentId = razorpayPaymentId;
        payment.status = 'completed';
        payment.updatedAt = new Date();
        await payment.save();

        const subscription = await Subscription.findById(payment.subscriptionId);
        if (!subscription) {
            return { status: 'failed', message: 'Associated subscription not found' };
        }
        const now = new Date();
        const currentEndDate = new Date(subscription.endDate);
        if (subscription.status === 'active' && currentEndDate > now) {
            subscription.endDate = new Date(currentEndDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        } else {
            // Reset subscription window
            subscription.startDate = now;
            subscription.endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        }
        subscription.status = 'active';
        subscription.updatedAt = now;
        await subscription.save();
        return {
            status: 'success',
            message: 'Payment captured and subscription activated',
            payment,
            subscription
        };
    } catch (error) {
        console.log('Error while capturing Razorpay Payment', error);
        return { status: 'failed', message: 'Server error during Razorpay capture' };
    }
}
