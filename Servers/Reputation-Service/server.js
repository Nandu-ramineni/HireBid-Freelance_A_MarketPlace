import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import DbConnection from './Config/db.js';
import ReputationRoutes from './Routes/reputationRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/reputation',ReputationRoutes);
const PORT = process.env.PORT;

DbConnection();
app.get('/', (req, res) => {
    res.send('Hello from Reputation Service');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
