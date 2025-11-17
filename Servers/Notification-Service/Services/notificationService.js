import nodemailer from 'nodemailer';
import { getChannel } from '../config/rabbitMq.js';

export const sendEmailNotification = async(userEmail,subject,message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject,
        text: message
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Error while sending email', error);
    }
}

export const publishNotification = async (notificationData) => {
    const channel = getChannel();
    const queue = 'notificationQueue';
    await channel.assertQueue(queue,{durable: false});
    channel.sendToQueue(queue,Buffer.from(JSON.stringify(notificationData)),{persistent: true});
    console.log('Notification published to RabbitMQ queue');
}