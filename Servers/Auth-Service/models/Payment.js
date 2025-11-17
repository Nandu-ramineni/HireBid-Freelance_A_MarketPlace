import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subscription'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
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

paymentSchema.pre('save', function (next) {
    if (this.isModified('status')) {
        this.updatedAt = Date.now();
    }
    next();
})

const SubscriptionPayments = mongoose.model('SubscriptionPayment', paymentSchema);
export default SubscriptionPayments;