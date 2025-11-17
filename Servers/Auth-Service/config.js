import mongoose from "mongoose";

const DbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Error while connecting to database');
    }
}

export default DbConnection;