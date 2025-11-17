import express from 'express';
import morgan from 'morgan';
import gatewayRoutes from './Routes/gatewayRoutes.js';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/api',gatewayRoutes);

export default app;