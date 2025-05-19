import express from "express"
import { Login, Signup,Logout, UpdateProfile, checkAuth } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/protectRoute.js"

const AuthRoutes= express.Router()

AuthRoutes.post("/signup",Signup)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/logout",Logout)
AuthRoutes.post("/update-profile",protectRoute,UpdateProfile)
AuthRoutes.get("/checkauth",protectRoute,checkAuth)
export default AuthRoutes