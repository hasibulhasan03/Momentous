import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import authRouter from "./router/authRouter.js";
import eventRouter from "./router/eventRouter.js";
import bookingRouter from "./router/bookingRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/booking", bookingRouter);

dbConnection();

export default app;
