import express from "express"
import { Login, Signup,Logout } from "../controllers/auth.controller.js"

const AuthRoutes= express.Router()

AuthRoutes.post("/signup",Signup)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/logout",Logout)
export default AuthRoutes