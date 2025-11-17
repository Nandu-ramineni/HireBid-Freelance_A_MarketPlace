import express from 'express';
import dotenv from 'dotenv';
import DbConnection from './config.js';
import bodyParser from 'body-parser';
import UserRoutes from './routes/authRoutes.js'
import SubscriptionRoutes from './routes/subscriptionRoutes.js';
import PaymentRoutes from './routes/paymentRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth',UserRoutes);
app.use('/api/subscription',SubscriptionRoutes);
app.use('/api/payment',PaymentRoutes);
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

DbConnection();
app.listen(PORT,'::', () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
app.get('/', (req, res) => {
    res.send('Server is running Fine');
});