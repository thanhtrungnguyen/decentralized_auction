const express = require("express");
require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectSyncBlockchainDB = require("./databases/connectSyncBlockchainBD");
const http = require("http");
// const { Server } = require("socket.io");
const { createServer } = require("http");

const multer = require("multer");

const createSocket = require("./socketio");
const authRoute = require("./routers/auth.js");
const userRoute = require("./routers/users.js");
const accountRoute = require("./routers/accounts.js");
const auctionRoute = require("./routers/auctions.js");
const propertyRoute = require("./routers/properties.js");
const categoryRoute = require("./routers/categories.js");
const newsRoute = require("./routers/news.js");
const { address } = require("./services/callContractFunction");

console.log("Starting...");

const app = express();

// config app
// const http = createServer(app);
const server = createSocket(app);

//config library
const PORT = 8800;

app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);
app.use(express.json());
// app.use(express.urlencoded({
//   extended:true
// }))

connectSyncBlockchainDB();

const upload = multer({ dest: "uploads/" });
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/property", propertyRoute);
app.use("/api/auction", auctionRoute);
app.use("/api/account", accountRoute);
app.use("/api/category", categoryRoute);
app.use("/api/news", newsRoute);

app.use(require("./routers"));

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    res.status(err.status).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

console.log(`Contract address: ${address}`);

server.listen(PORT, () => {
    // connect();
    console.log("Connected to backend.");
});
console.log("=======================================");
