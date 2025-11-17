import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import DbConnection from './config/db.js';
import { connectRabbitMQ } from './config/rabbitMq.js';
import NotificationRoutes from './Routes/notificationRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/notifications', NotificationRoutes);

const PORT = process.env.PORT;

DbConnection();

app.get('/', (req, res) => {
    res.send('Notification Service is running');
});
app.listen(PORT, async() => {
    await connectRabbitMQ();
    console.log(`Server is running on port ${PORT}`);
});
