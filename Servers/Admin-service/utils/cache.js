import redis from 'redis';

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
    
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

export const deleteCache = async (key) => {
    try {
        await client.del(key);
        return true;
    } catch (error) {
        console.error(`Error deleting cache for key: ${key}`, error);
        return false;
    }
}

export const clearCache = async () => {
    try {
        await client.flushAll();
        return true;
    } catch (error) {
        console.error('Error clearing cache', error);
        return false;
    }
}

export default client;