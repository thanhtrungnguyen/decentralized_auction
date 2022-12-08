const mongoose = require("mongoose");

const connectSyncBlockchainDB = async () => {
    try {
        const connectionString = await mongoose.connect(process.env.MONGO_DB_SYNC_BLOCKCHAIN);
        console.log(`Sync Blockchain Database connected: ${connectionString.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
};

module.exports = connectSyncBlockchainDB;
