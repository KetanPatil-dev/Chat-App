import express from "express"
import {protectRoute} from "../middlewares/protectRoute.js"
import { getMessages, getUsersForSideBar } from "../controllers/message.controller.js"
const MessageRoutes=express.Router()

MessageRoutes.get("/users",protectRoute,getUsersForSideBar)
MessageRoutes.get("/:id",protectRoute,getMessages)

export default MessageRoutes