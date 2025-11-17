import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DBConnection from './config.js';
import JobRoutes from './Routes/jobRoutes.js'
import PaymentRotes from './Routes/paymentRoutes.js';
import { connectRabbitMq } from './Utils/rabbitMQ.js';
dotenv.config();


const app =express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/jobs', JobRoutes);
app.use('/api/job/payment', PaymentRotes);


const PORT = process.env.PORT ;
DBConnection();
connectRabbitMq();

app.get('/', (req, res) => {
    res.send('Server running fine from job service');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});