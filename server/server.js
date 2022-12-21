const express = require("express");
require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectSyncBlockchainDB = require("./databases/connectSyncBlockchainBD");
const http = require("http");
// const { Server } = require("socket.io");
const { createServer } = require("http");
const jsforce = require("jsforce");
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

const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
});
conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, userInfor) => {
    if (err) {
        console.error(err);
    } else {
        console.log(userInfor.id);
    }
});
// const http = createServer(app);
createSocket(http);

const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT"],
//     },
// });
// var latestData;

// io.on("connection", async (socket) => {
//     socket.emit("data", latestData);
//     console.log(latestData);
// });

// setInterval(async () => {
//   var auctionlist = null;
//   await conn.query("Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auction__c  ", function (err, result) {
//       if (err) { return console.error(err); }
//       console.log("total : " + result.totalSize);
//       console.log("fetched : " + result.records.length);
//       auctionlist = result.records;
//   });
//   var currentTime = new Date();

//   auctionlist.map(async auction => {

//       var timeStartAuction = auction.Start_Aution_Time__c || '';
//       var timeStartAuctionVN = timeStartAuction.split('+')[0] + '+07:00';
//       var timeStartAuctionFN = new Date(timeStartAuctionVN);

//       var timeEndAuction = auction.End_Auction_Time__c || '';
//       var timeEndAuctionVN = timeEndAuction.split('+')[0] + '+07:00';
//       var timeEndAuctionFN = new Date(timeEndAuctionVN);

//       var timeStartRegistration = auction.Start_Registration_Time__c || '';
//       var timeStartRegistrationVN = timeStartRegistration.split('+')[0] + '+07:00';
//       var timeStartRegistrationFN = new Date(timeStartRegistrationVN);

//       var timeEndRegistration = auction.End_Registration_Time__c || '';
//       var timeEndRegistrationVN = timeEndRegistration.split('+')[0] + '+07:00';
//       var timeEndRegistrationFN = new Date(timeEndRegistrationVN);

//       var duePaymentTime = auction.Due_Payment_Time__c || '';
//       var duePaymentTimeVN = duePaymentTime.split('+')[0] + '+07:00';
//       var duePaymentTimeFN = new Date(duePaymentTimeVN);

//       if (currentTime - timeStartRegistrationFN >= 0 && currentTime - timeEndRegistrationFN <= 0) {
//           if (auction.Status__c != "RegistrationTime") {

//               await conn.sobject("Auction__c").update({
//                   Id: auction.Id,
//                   Status__c: "RegistrationTime",
//               }, (err, ret) => {
//                   if (err || !ret.success) { return console.error(err); }

//               })
//           }

//       }
//       if (currentTime - timeEndRegistrationFN > 0 && currentTime - timeStartAuctionFN < 0) {
//           if (auction.Status__c != "UpcomingforBid") {

//               await conn.sobject("Auction__c").update({
//                   Id: auction.Id,
//                   Status__c: "UpcomingforBid",
//               }, (err, ret) => {
//                   if (err || !ret.success) { return console.error(err); }

//               })
//           }

//       }

//       if (currentTime - timeStartAuctionFN >= 0 && currentTime - timeEndAuctionFN <= 0) {
//           if (auction.Status__c != "Bidding") {
//               await console.log(timeStartAuctionFN)
//               await conn.sobject("Auction__c").update({
//                   Id: auction.Id,
//                   Status__c: "Bidding",
//               }, (err, ret) => {
//                   if (err || !ret.success) { return console.error(err); }

//               })
//           }

//       }

//       if (currentTime - timeEndAuctionFN > 0 && currentTime - duePaymentTimeFN <= 0) {
//           if (auction.Status__c != "Closed") {
//               await console.log(timeStartAuctionFN)
//               await conn.sobject("Auction__c").update({
//                   Id: auction.Id,
//                   Status__c: "Closed",
//               }, (err, ret) => {
//                   if (err || !ret.success) { return console.error(err); }

//               })
//           }

//       }
//   });

//   // Update latest results for when new client's connect
//   await conn.query("Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c,"
//       + "Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auction__c ", function (err, result) {
//           if (err) { return console.error(err); }
//           console.log("total : " + result.totalSize);
//           console.log("fetched : " + result.records.length);
//           latestData = result.records;
//       });

//   // send it to all connected clients
//   io.emit('data', latestData);

//   console.log('Last updated: ' + new Date());

// }, 1000);

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

console.log(`Contract address: ${address}`);

server.listen(PORT, () => {
    // connect();
    console.log("Connected to backend.");
});
console.log("=======================================");
