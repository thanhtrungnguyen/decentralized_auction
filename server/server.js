import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routers/auth.js";
import userRoute from "./routers/users.js";

// config app
const app = express();

//config library
const PORT = 8800;
dotenv.config();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

//connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB}`, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// network DB disconnected
mongoose.connection.on("disconnected", () => {
  console.log("mongoose disconnected");
});

// network DB connected
mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});

//middleware authen and author
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//middleware catch fault
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Sth went wrong!";
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server started on port ${PORT}`);
});
