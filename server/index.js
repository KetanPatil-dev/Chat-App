import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/connect.js";
import AuthRoutes from "./routes/auth.routes.js";
dotenv.config();

const PORT = process.env.PORT || 9090;

const app = express();

app.use(express.json())

const Start = async () => {
  try {
    ConnectDB();
    app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
    app.use("/api/auth",AuthRoutes)
  } catch (error) {
    console.log(error);
  }
};
Start();
