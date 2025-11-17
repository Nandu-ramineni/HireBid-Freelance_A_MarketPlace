import { getChannel } from "../config/rabbitMq.js"
import Notification from "../models/Notification.js"

export const consumeNotifications = async() => {
    const channel = getChannel();
    const queue = 'notificationQueue';
    try {
        await channel.assertQueue(queue,{durable: false});
        channel.consume(
            queue,
            async(message) =>{
                const content = JSON.parse(message.content.toString());
                const { userId, message, notificationType } = content;
                const notification = new Notification({
                    userId,
                    message,
                    notificationType
                })
                await notification.save();
                console.log(`Notification saved for user ${userId}`);
                channel.ack(message);
            },{
                noAck: false
            }
        )
    } catch (error) {
        console.log('Error while consuming notifications', error);
    }
}