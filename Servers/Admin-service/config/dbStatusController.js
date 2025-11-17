
import mongoose from "mongoose";

export const getDbStatus = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const stats = await db.command({ dbStats: 1 });
    const serverStatus = await db.command({ serverStatus: 1 });

    const queryLatencies = serverStatus.opLatencies?.reads || null;

    let avgResponseTimeMs = "N/A";
    if (queryLatencies && queryLatencies.ops > 0) {
      avgResponseTimeMs = (
        (queryLatencies.latency / 1e6) / queryLatencies.ops
      ).toFixed(2); // convert ns → ms
    }

    res.status(200).json({
      success: true,
      database: db.databaseName,
      dbSizeMB: (stats.dataSize / (1024 * 1024)).toFixed(2),
      storageSizeMB: (stats.storageSize / (1024 * 1024)).toFixed(2),
      collections: stats.collections,
      objects: stats.objects,

      queryPerformance: {
        totalQueries: serverStatus.opcounters?.query || 0,
        totalInserts: serverStatus.opcounters?.insert || 0,
        totalUpdates: serverStatus.opcounters?.update || 0,
        totalDeletes: serverStatus.opcounters?.delete || 0,
        avgResponseTimeMs, // ✅ avg query response time in milliseconds
      },
    });
  } catch (error) {
    console.error("Error fetching DB stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch database status",
      error: error.message,
    });
  }
};
