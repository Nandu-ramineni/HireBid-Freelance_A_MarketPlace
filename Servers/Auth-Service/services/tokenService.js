import jwt from 'jsonwebtoken';
import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();
const client = redis.createClient({
    url: process.env.REDIS_URL
});
client.connect()
    .then(() => {
        console.log('Redis client connected');
    })
    .catch((err) => {
        console.error('Redis connection error', err);
    });
client.on('error', (err) => {
    console.error('Redis error', err);
});
export const generateAccessToken = (userId,role,tokenVersion) => {
    return jwt.sign({userId,role,tokenVersion}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

export const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    client.set(userId.toString(), refreshToken);
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

export const createCache = async (key, value, duration) => {
    try {
        await client.setEx(key, duration, JSON.stringify(value));
        return true;  
    } catch (err) {
        console.error(`Error setting cache for key: ${key}`, err);
        return false;  
    }
}

export const getCache = async(key) => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error getting cache for key: ${key}`, error);
    }
}

export const deleteCache = async(key) => {
    try {
        await client.del(key);
        return true;  
    } catch (err) {
        console.error(`Error deleting cache for key: ${key}`, err);
        return false;  
    }
}