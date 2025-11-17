import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    invoice: {
        type: String,
        default: null
    },
})

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    budget:{
        type: Number,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    image:{
        type: String,
        default: null
    },
    status:{
        type: String,
        enum : ['open', 'in-progress', 'completed', 'closed'],
        default: 'open'
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    freelancerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    detailDesc:{
        type: String
    },
    benefits: {
        type: [String]
    },
    jobType:{
        type: String,
        enum: ['Full Time', 'Part Time', 'Contract'],
        required: true
    },
    location:{
        type: String,
        required: true
    },
    requirements:{
        type: [String]
    },
    experienceLevel:{
        type: String,
        enum: ['Entry Level', 'Intermediate', 'Expert'],
        required: true
    },
    proposals:{
        type: Number,
        default: 0
    },
    milestones: [milestoneSchema]
},{
    timestamps: true
})

const Job = mongoose.model('Job', jobSchema);
export default Job;