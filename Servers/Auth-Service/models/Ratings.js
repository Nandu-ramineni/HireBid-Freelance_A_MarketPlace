import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        trim: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },
    type: {
        type: String,
        enum: ['client-to-freelancer', 'freelancer-to-client'],
        required: true,
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
