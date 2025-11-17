import mongoose from "mongoose";


const NotificationSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
        required: true,
        trim: true
    },
    notificationType:{
        type: String,
        enum: ['email', 'push', 'in-app'],
        default: 'in-app'
    },
    read:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;