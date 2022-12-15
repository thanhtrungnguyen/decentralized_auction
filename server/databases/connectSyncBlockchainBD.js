const mongoose = require("mongoose");

const connectSyncBlockchainDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected.");
        return;
    }

    mongoose.connect(process.env.MONGO_DB_SYNC_BLOCKCHAIN, {}, (err) => {
        if (err) throw err;
        console.log("Connected to Sync Blockchain DB (mongodb).");
    });
};

module.exports = connectSyncBlockchainDB;
