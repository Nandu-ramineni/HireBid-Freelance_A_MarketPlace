import Notification from "../models/Notification.js";
import { publishNotification } from "../Services/notificationService.js";


export const sendNotification = async (req, res) => {
    const { userId, message, notificationType } = req.body;
    try {
        await publishNotification({ userId, message, notificationType });
        res.status(200).json({ success: true, message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
}

export const getNotificationByUser = async(req,res) => {
    const { userId } = req.user;
    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
}

export const markAsRead = async(req,res) => {
    const { notificationId } = req.params;
    try {
        const notification = await Notification.findById(notificationId);
        if(!notification){
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }
        if(notification.userId.toString() !== req.user){
            return res.status(401).json({ success: false, message: 'You are not authorized to perform this action' });
        }
        notification.read = true;
        await notification.save();
        res.status(200).json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
}