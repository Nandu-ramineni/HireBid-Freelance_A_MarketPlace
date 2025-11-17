import mongoose from "mongoose";

const reputationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reputationScore:{
        type: Number,
        default: 0,
        min: 0,
    },
    ratingsReceived:{
        type: Number,
        default: 0,
        min: 0,
    },
    ratingsGiven:{
        type: Number,
        default: 0,
        min: 0,
    },
    reviews:[
        {
            jobId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Job',
                required: true
            },
            rating:{
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            review:{
                type: String,
                trim: true
            },
            createdAt:{
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Reputation = mongoose.model('Reputation', reputationSchema);
export default Reputation;