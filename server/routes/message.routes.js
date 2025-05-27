import express from "express"
import {protectRoute} from "../middlewares/protectRoute.js"
import { getMessages, getUsersForSideBar, sendMesssage } from "../controllers/message.controller.js"
const MessageRoutes=express.Router()

MessageRoutes.get("/users",protectRoute,getUsersForSideBar)
MessageRoutes.get("/:id",protectRoute,getMessages)
MessageRoutes.post("/send/:id",protectRoute,sendMesssage)

export default MessageRoutes