import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    freelancerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount:{
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
    transactionHash:{
        type: String,
        default: null
    },
    status:{
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

PaymentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});
const Payment = mongoose.model('Payment',PaymentSchema);
export default Payment;