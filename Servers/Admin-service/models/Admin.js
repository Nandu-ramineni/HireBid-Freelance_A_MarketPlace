import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'superAdmin'],
    },
    traction: {
        lastLogin: {
            type: Date,
            default: null,
        },
        loginsCount: {
            type: Number,
            default: 0,
        }
    }
})

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
