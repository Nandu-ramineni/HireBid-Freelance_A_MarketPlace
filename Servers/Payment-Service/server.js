import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import DbConnection from './Config/db.js';
import paymentRoutes from './Routes/paymentRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;
app.use('/api/payments',paymentRoutes);
DbConnection();
app.get('/', (req, res) => {
    res.send('Hello from Payment Service');
});

app.listen(PORT, () => {
    console.log(`Payment Service is running on port ${PORT}`);
});