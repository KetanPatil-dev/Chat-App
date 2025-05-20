import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/connect.js";
import AuthRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import MessageRoutes from "./routes/message.routes.js";

dotenv.config();

const PORT = process.env.PORT || 9090;
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);

const Start = async () => {
  try {
    await ConnectDB(); // Await DB connection
    app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
  } catch (error) {
    console.log("Server failed to start:", error);
    process.exit(1); // Exit on failure
  }
};

Start();
