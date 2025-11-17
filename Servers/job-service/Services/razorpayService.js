import crypto from 'crypto'
import razorpayInstance from '../Utils/razorpayConfig.js';
import Job from '../Models/Job.js';
import Payment from '../Models/Payment.js';
import { generateInvoiceAndUpload } from '../Utils/invoiceGenerator.js';
import { sendPaymentInvoiceEmail } from '../Utils/nodemailerConfig.js';
import axios from 'axios';

export const createRazorPayOrder = async ({amount, currency, clientId, freelancerId, bidId, jobId, milestoneId}) => {

    if (!amount || isNaN(amount)) {
        throw new Error('Invalid amount');
    }


    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: `sub_${bidId.toString().slice(-12)}`,
        payment_capture: 1
    };

    try {
        const order = await razorpayInstance.orders.create(options);

        const payment = new Payment({
            clientId: clientId,
            freelancerId: freelancerId,
            amount,
            currency,
            jobId: jobId,
            bidId: bidId,
            milestoneId: milestoneId,
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
        const payment = await Payment.findOne({ razorpayOrderId });
        if (!payment) {
            return { status: 'failed', message: 'Payment not found' };
        }
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const generatedSignature = hmac.digest('hex');
        if (generatedSignature !== razorpaySignature) {
            await Payment.findByIdAndUpdate(payment._id, { status: 'pending' });
            return { status: 'failed', message: 'Invalid signature' };
        }
        const job = await Job.findById(payment.jobId);
        if (!job) {
            return { status: 'failed', message: 'Job not found' };
        }

        const milestoneToUpdate = job.milestones.find(
            m => m._id?.toString() === payment.milestoneId?.toString()
        );

        if (!milestoneToUpdate) {
            return { status: 'failed', message: 'Milestone not found in job' };
        }

        milestoneToUpdate.isPaid = true;
        await job.save();

        payment.razorpayPaymentId = razorpayPaymentId;
        payment.status = 'completed';
        payment.updatedAt = new Date();
        await payment.save();
        
        const getFreelancerDetails = await axios.get(`http://localhost:5000/api/auth/getUser/${payment.freelancerId}`);
        const getClientDetails = await axios.get(`http://localhost:5000/api/auth/getClient/${payment.clientId}`);
        const {username,email,firstName,lastName} = getFreelancerDetails.data;
        const invoiceUrl  = await generateInvoiceAndUpload({
            client: getClientDetails.data,
            freelancer: getFreelancerDetails.data,
            firstName,
            lastName,
            job: job,
            milestone: milestoneToUpdate,
            amount: payment.amount,
            paymentId: razorpayPaymentId,
        });
        await sendPaymentInvoiceEmail(email, username, job.title, invoiceUrl, milestoneToUpdate);

        return {
            status: 'success',
            message: 'Payment captured and milestone marked as paid',
            payment,
            invoiceUrl
        };
    } catch (error) {
        console.log('Error while capturing Razorpay Payment', error);
        return { status: 'failed', message: 'Server error during Razorpay capture' };
    }
}
