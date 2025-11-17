import amqp from 'amqplib/callback_api.js';
import dotenv from 'dotenv';
import { io } from '../server.js';

dotenv.config();

let channel = null;
const queue = 'job_messages'; // ✅ Unified queue name

amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
    if (err) {
        throw new Error('Error connecting to RabbitMQ: ' + err.message);
    }

    connection.createChannel((err, ch) => {
        if (err) {
            throw new Error('Error creating channel: ' + err.message);
        }

        channel = ch;
        channel.assertQueue(queue, { durable: true }); // ensure the queue exists

        console.log('✅ RabbitMQ connected and channel created');

        // ✅ Start consuming from correct queue
       channel.consume(queue, (msg) => {
    if (msg !== null) {
        try {
            const data = JSON.parse(msg.content.toString());
            console.log("📨 Received from RabbitMQ:", data);
            io.emit(`chat:${data.jobId}`, data);
            channel.ack(msg);
        } catch (err) {
            console.error("❌ Error processing message:", err);
            // optionally channel.nack(msg); to requeue
        }
    }
});

    });
});

export const publishMessage = (message) => {
    if (!channel) {
        throw new Error('RabbitMQ channel not initialized');
    }

    const msg = JSON.stringify(message);
    channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
    console.log(`🚀 Message published to RabbitMQ: ${msg}`);
    io.emit(`chat:${message.jobId}`, message); // Emit to socket.io for real-time updates
    return true;
};
