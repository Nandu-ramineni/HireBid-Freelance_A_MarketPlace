import redis from 'redis';

const client = redis.createClient({
    url: process.env.REDIS_URL
    // username: 'default',
    // password: 'e6RrW9h45RhHPhoYiRywj7f2MSqlP7nG',
    // socket: {
    //     host: 'redis-15422.c93.us-east-1-3.ec2.redns.redis-cloud.com',
    //     port: 15422
    // }
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

export const deleteCache = async(key) => {
    try {
        await client.del(key);
        return true;  
    } catch (err) {
        console.error(`Error deleting cache for key: ${key}`, err);
        return false;  
    }
}


