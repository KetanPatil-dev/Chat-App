import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/connect.js";
import AuthRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import MessageRoutes from "./routes/message.routes.js";
import cors from "cors"
import { app,server } from "./lib/socket.js";
dotenv.config();

const PORT = process.env.PORT || 9090;


// Middlewares
app.use(express.json({limit:"20mb"}));
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
  
}))

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);

const Start = async () => {
  try {
    await ConnectDB(); // Await DB connection
    server.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
  } catch (error) {
    console.log("Server failed to start:", error);
    process.exit(1); // Exit on failure
  }
};

Start();
