const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectSyncBlockchainDB = require("./databases/connectSyncBlockchainBD");

const authRoute = require("./routers/auth.js");
const userRoute = require("./routers/users.js");
const accountRoute = require("./routers/accounts.js");
const auctionRoute = require("./routers/auctions.js");
const propertyRoute = require("./routers/properties.js");
const categoryRoute = require("./routers/categories.js");
const newsRoute = require("./routers/news.js");

const multer = require("multer");
console.log("Starting...");
// config app
const app = express();

//config library
const PORT = 8800;
dotenv.config();
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

//connect salesforce

// app.post("/webhook", (req, res) => {
//     const webhook = req.body;
//     console.log(webhook);
//     res.status(200).json;
// });

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

app.listen(PORT, () => {
    // connect();
    console.log("Connected to backend.");
});
console.log("=======================================");
