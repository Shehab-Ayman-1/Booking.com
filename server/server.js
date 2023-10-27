import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOrigins, DBconnection } from "./configs/index.js";
import { auths, hotels, rooms, users } from "./routes/index.js";

// Configs
export const app = express();
dotenv.config();
app.use(cors(corsOrigins));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100kb", parameterLimit: 10000000 }));

// Middleware
app.use("/api/users", users);
app.use("/api/auths", auths);
app.use("/api/hotels", hotels);
app.use("/api/rooms", rooms);
app.use("/", (req, res) => res.json({ message: "Welcome On Booking.com" }));

// MongoDB Connection
DBconnection();
mongoose.connection.on("connected", () => console.log("Database Connected 🚀"));
mongoose.connection.on("disconnected", () => console.log("Database Disconnected 😭"));

app.listen(process.env.PORT || 5000);
