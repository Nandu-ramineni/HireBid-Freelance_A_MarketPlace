import mongoose from "mongoose";


const savedProfiles = new mongoose.Schema({
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const SavedProfiles = mongoose.model('SavedProfiles', savedProfiles);
export default SavedProfiles;
