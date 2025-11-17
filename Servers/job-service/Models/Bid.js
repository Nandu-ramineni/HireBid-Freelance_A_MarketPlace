import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    freelancerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }],
    acceptedFreelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    amount:{
        type: Number,
        required: true
    },
    message:{
        type: String,
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    }
},{
    timestamps: true
});

const Bid = mongoose.model('Bid', bidSchema);
export default Bid;