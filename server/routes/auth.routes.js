import express from "express"
import { Signup } from "../controllers/auth.controller.js"

const AuthRoutes= express.Router()

AuthRoutes.post("/signup",Signup)
export default AuthRoutes