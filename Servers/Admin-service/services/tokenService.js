import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import client from '../utils/cache.js';
dotenv.config();

export const generateAccessToken = (adminId,role) => {
    return jwt.sign({adminId,role}, process.env.JWT_SECRET, { expiresIn: '15m' });
}

export const generateRefreshToken = (adminId) => {
    const refreshToken = jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: '15m' });
    client.set(adminId.toString(), refreshToken);
    return refreshToken;
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const verifyRefreshToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const storedToken = await client.get(decoded.userId);
        if (storedToken !== refreshToken) {
            throw new Error('Token mismatch');
        }
        return generateAccessToken(decoded.userId, decoded.role);
    } catch (err) {
        throw new Error('Invalid refresh token');
    }
}