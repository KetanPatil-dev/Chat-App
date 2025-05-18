import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/connect.js";
dotenv.config();

const PORT = process.env.PORT || 9090;

const app = express();

const Start = async () => {
  try {
    ConnectDB();
    app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
Start();
