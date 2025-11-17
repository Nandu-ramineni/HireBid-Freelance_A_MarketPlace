import amqp from 'amqplib/callback_api.js';
import dotenv from 'dotenv';
dotenv.config();
let channel = null;

export const connectRabbitMQ = async() => {
    amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
        if(err){
            throw new Error('Error connecting to RabbitMQ',err);
        }
        connection.createChannel((err, ch) => {
            if(err){
                throw new Error('Error creating channel',err);
            }
            channel = ch;
            console.log('RabbitMQ connected and channel created');
        });
    });
}

export const getChannel = () => {
    return channel;
}