import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
            return this.audience === "single";
        }
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    notificationType: {
        type: String,
        enum: ["email", "push", "in-app"],
        default: "in-app"
    },
    audience: {
        type: String,
        enum: ["single", "broadcast"],
        default: "single"
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Notification", NotificationSchema);
