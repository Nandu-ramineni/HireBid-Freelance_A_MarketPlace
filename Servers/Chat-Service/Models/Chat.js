import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    freelancerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            message: {
                type: String,
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        },
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat',ChatSchema);
export default Chat;