import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT ,
    authServiceUrl: process.env.AUTH_SERVICE_URL,
    jobServiceUrl: process.env.JOB_SERVICE_URL,
    reputationServiceUrl: process.env.REPUTATION_SERVICE_URL,
    paymentServiceUrl: process.env.PAYMENT_SERVICE_URL,
    chatServiceUrl: process.env.CHAT_SERVICE_URL,
    notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL,
    rabbitMqUrl: process.env.RABBITMQ_URL,
    jwtSecret: process.env.JWT_SECRET
}