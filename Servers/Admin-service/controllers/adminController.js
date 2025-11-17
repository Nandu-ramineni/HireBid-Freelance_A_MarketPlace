import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'Strict',
    maxAge: 15 * 60 * 1000
}

export const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email, username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newAdmin = new Admin({ username, email, password: hashedPassword });
        await newAdmin.save();
        return res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error while registering admin", error: error.message });
    }
}

export const AdminLogin = async (req, res) => {
    const { username, email, password } = req.body;

    if (!password || (!email && !username)) {
        return res.status(400).json({ message: "Please provide password and either email or username" });
    }

    try {
        let admin;
        if (email) {
            admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(404).json({ message: "Invalid email" });
            }
        }
        else if (username) {
            admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(404).json({ message: "Invalid username" });
            }
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }
        admin.traction.lastLogin = new Date();
        admin.traction.loginsCount += 1;
        await admin.save();
        const accessToken = generateAccessToken(admin._id, admin.role);
        const refreshToken = generateRefreshToken(admin._id);
        // res.cookie('accessToken', accessToken, {...cookieOptions, maxAge: 7 * 24 * 60 * 60* 1000});
        // res.cookie('refreshToken', refreshToken, {...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000});
        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error("Error in AdminLogin:", error);
        return res.status(500).json({ message: "Error while logging in admin", error: error.message });
    }
};
