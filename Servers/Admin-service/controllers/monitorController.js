import mongoose from 'mongoose';

export const getAllDatabaseMetrics = async (req, res) => {
  try {
    const client = mongoose.connection.getClient();
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();

    const results = [];

    for (const dbInfo of dbs.databases) {
      const db = client.db(dbInfo.name);
      const stats = await db.command({ dbStats: 1 });
      const serverStatus = await db.admin().serverStatus();

      const totalSizeMB = (stats.dataSize + stats.indexSize) / (1024 * 1024);
      const storageSizeMB = stats.storageSize / (1024 * 1024);
      const usagePercent =
        storageSizeMB > 0
          ? ((totalSizeMB / storageSizeMB) * 100).toFixed(2)
          : "0.00";

      results.push({
        databaseName: dbInfo.name,
        collections: stats.collections,
        storage: {
          totalSizeMB: totalSizeMB.toFixed(2),
          storageSizeMB: storageSizeMB.toFixed(2),
          usagePercent,
        },
        activeConnections: serverStatus.connections?.current || 0,
        securityScore: 85, // mock
        activeSessions: 17, // mock
        failedLogins: 5, // mock
        queryPerformance: {
          avgQueryTimeMs: 12,
          slowQueries: 3,
        },
      });
    }

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching DB metrics:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch database metrics.' });
  }
};
