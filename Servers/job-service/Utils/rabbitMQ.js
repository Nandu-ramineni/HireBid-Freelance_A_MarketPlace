import amqp from 'amqplib/callback_api.js';

let channel;

const createChannel = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('notifications');
}

export const sendNotification = async (message) => {
    if(!channel) await createChannel();
    channel.sendToQueue('notifications', Buffer.from(message));
}

export const connectRabbitMq = async () => {
    amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
    if (err) {
        throw new Error('Failed to connect to RabbitMQ');
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw new Error('Failed to create RabbitMQ channel');
        }
        const queue = 'job_messages';
        channel.assertQueue(queue, { durable: true });
        console.log('Waiting for messages in queue:', queue);
        channel.consume(queue, (msg) => {
            const message = JSON.parse(msg.content.toString());
            // Process the message (e.g., update job status, log chat history)
            console.log('Received message from Chat Service:', message);
            // Acknowledge the message
            channel.ack(msg);
        });
    });
});
}