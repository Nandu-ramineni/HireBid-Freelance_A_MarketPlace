import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DbConnection from './Config/db.js';
import ChatRoutes from './Routes/chatRoutes.js';
import { Server } from 'socket.io';
dotenv.config();

const app =express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/chat',ChatRoutes);
// app.use(bodyParser());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});
export { io };

// Example event (optional)
io.on("connection", (socket) => {
  console.log("✅ A client connected:", socket.id);
});
const PORT = process.env.PORT;
DbConnection();

app.get('/',(req,res)=>{
    res.send('Hello from Chat Service');
});

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

