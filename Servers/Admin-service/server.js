import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import AdminRoutes from './routes/adminRoutes.js';
import UserRoutes from './routes/userRoutes.js';
import GigRoutes from './routes/gigRoutes.js';
import monitorRoutes from './routes/monitorRoutes.js';
import DbConnection from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use('/api/v1/admin', AdminRoutes);
app.use('/api/v1/admin/users', UserRoutes);
app.use('/api/v1/admin/gigs', GigRoutes);
app.use('/api/v1/admin/monitor', monitorRoutes);

const PORT = process.env.PORT;

DbConnection();

app.get('/', (req, res) => {
    res.send('Admin Service is running');
    }
)

app.listen(PORT, () => {
    console.log(`Admin Service is running on port ${PORT}`);
});
