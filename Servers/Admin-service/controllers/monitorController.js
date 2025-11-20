import mongoose from "mongoose";
import os from "os";


// GLOBAL STORE FOR API LATENCY

let apiLog = []; 
const MAX_LOGS = 50;

// Middleware to track API response time
export const apiLatencyMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        apiLog.push({
            route: req.originalUrl,
            method: req.method,
            duration,
            timestamp: new Date()
        });

        if (apiLog.length > MAX_LOGS) apiLog.shift(); // keep log small
    });

    next();
};

// ----------------------------------------------------
// 1. DATABASE STATS
// ----------------------------------------------------
export const getDatabaseStats = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const stats = await db.command({ dbStats: 1 });

        const dataSizeMB = (stats.dataSize / (1024 * 1024)).toFixed(2);
        const storageSizeMB = (stats.storageSize / (1024 * 1024)).toFixed(2);
        const indexSizeMB = (stats.indexSize / (1024 * 1024)).toFixed(2);

        // Fix NaN — calculate manually:
        const totalSizeMB = (
            (stats.dataSize + stats.indexSize) /
            (1024 * 1024)
        ).toFixed(2);

        return res.status(200).json({
            database: db.databaseName,
            collections: stats.collections,
            objects: stats.objects,
            avgObjSize: stats.avgObjSize,
            dataSizeMB,
            storageSizeMB,
            indexSizeMB,
            totalSizeMB,  // FIXED VALUE
            extents: stats.numExtents,
            indexes: stats.indexes
        });

    } catch (error) {
        console.error("Database Stats Error:", error);
        return res.status(500).json({ error: "Failed to retrieve database stats" });
    }
};


// ----------------------------------------------------
// 2. SERVER (OS) STATS
// ----------------------------------------------------
export const getServerStats = (req, res) => {
    try {
        const cpuLoad = os.loadavg(); // [1-min, 5-min, 15-min]
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMemPercent = (((totalMem - freeMem) / totalMem) * 100).toFixed(1);

        return res.status(200).json({
            uptime: os.uptime(),
            platform: os.platform(),
            cpuCores: os.cpus().length,
            cpuLoad, // load average
            memory: {
                totalMB: (totalMem / 1024 / 1024).toFixed(2),
                freeMB: (freeMem / 1024 / 1024).toFixed(2),
                usedPercent: usedMemPercent
            },
            nodeVersion: process.version
        });

    } catch (error) {
        console.error("Server Stats Error:", error);
        return res.status(500).json({ error: "Failed to retrieve server stats" });
    }
};

// ----------------------------------------------------
// 3. API LATENCY STATS
// ----------------------------------------------------
export const getApiLatencyStats = (req, res) => {
    try {
        const avgTime =
            apiLog.length > 0
                ? (
                      apiLog.reduce((sum, item) => sum + item.duration, 0) /
                      apiLog.length
                  ).toFixed(2)
                : 0;

        return res.status(200).json({
            averageResponseTime: `${avgTime} ms`,
            recentRequests: apiLog.slice(-20).reverse()
        });

    } catch (error) {
        console.error("API Latency Error:", error);
        return res.status(500).json({ error: "Failed to retrieve latency stats" });
    }
};

// ----------------------------------------------------
// 4. MONGO QUERY PROFILING (SLOW QUERIES)
// ----------------------------------------------------
export const getSlowQueries = async (req, res) => {
    try {
        const db = mongoose.connection.db;

        // enable profiling level 1 (slow queries only)
        await db.command({ profile: 1, slowms: 50 });

        const profileCollection = db.collection("system.profile");

        const slowQueries = await profileCollection
            .find()
            .sort({ millis: -1 })
            .limit(20)
            .toArray();

        return res.status(200).json({
            slowQueries
        });

    } catch (error) {
        console.error("Profiler Error:", error);
        return res.status(500).json({ error: "Failed to retrieve profiler data" });
    }
};
