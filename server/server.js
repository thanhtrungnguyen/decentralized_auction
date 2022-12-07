const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routers/auth.js");
const userRoute = require("./routers/users.js");
const accountRoute = require("./routers/accounts.js");
const auctionRoute = require("./routers/auctions.js");
const propertyRoute = require("./routers/properties.js");
const categoryRoute = require("./routers/categories.js");

const multer = require("multer");

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
const upload = multer({ dest: "uploads/" });

// //connect DB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_DB}`, {});
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

//connect MONGO_DB_SYNC_BLOCKCHAIN
const connectSyncBlockchainDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_SYNC_BLOCKCHAIN);
        console.log("MongoDB Sync with Blockchain connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// // network DB disconnected
// mongoose.connection.on("disconnected", () => {
//   console.log("mongoose disconnected");
// });

// // network DB connected
// mongoose.connection.on("connected", () => {
//   console.log("mongoose connected");
// });

// //middleware authen and author
// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);

// //middleware auction manager
// app.use("/api/auction", auctionRoute);

// app.use("/api/property", propertyRoute);

// //middleware catch fault
// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Sth went wrong!";
//   return res.status(500).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// });

// app.listen(PORT, () => {
//   connectDB();
//   let ts = Date.now();

//   let date_ob = new Date("2022-10-31");
//   let date = date_ob.getDate();
//   let month = date_ob.getMonth() + 1;
//   let year = date_ob.getFullYear();

//   // prints date & time in YYYY-MM-DD format
//   console.log(year + "-" + month + "-" + date);
//   console.log(`server started on port + ${PORT}`);
// });

//connect salesforce

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/property", propertyRoute);
app.use("/api/auction", auctionRoute);
app.use("/api/account", accountRoute);
app.use("/api/category", categoryRoute);

// app.get('/Account/getAllAccount', (req, res) => {
//   conn.query("Select Id, Name, Phone, NumberOfEmployees from Account", (err, result) => {
//     if (err) {
//       res.send(err)
//     } else {
//       console.log("Total records" + result.totalSize)
//       res.json(result.records)
//     }
//   })
// })
app.listen(PORT, () => {
    // connect();
    console.log("Connected to backend.");
});
