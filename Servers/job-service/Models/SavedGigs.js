import mongoose from "mongoose";


const SavedGigsSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const SavedGigs = mongoose.model('SavedGigs', SavedGigsSchema);
export default SavedGigs;