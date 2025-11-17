import mongoose from "mongoose";


const GigPayments = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    bidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    milestoneId:{
        type:String,
        default: null
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'ETH', 'BTC', 'BNB'],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['razorpay', 'crypto'],
        required: true
    },
    razorpayOrderId: {
        type: String,
        default: null
    },
    razorpayPaymentId: {
        type: String,
        default: null
    },
    transactionHash: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Payment = mongoose.model('Payment', GigPayments);
export default Payment;