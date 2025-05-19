import UserModel from "../models/user.model.js"

export const protectRoute=async(req ,resizeBy,next)=>{
    try {
        const token= req.cookies.token
        if(!token)
        {
            return res.status(404).json({message:"Unauthorized- No Token Found"})
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded)
        {
            return res.status(404).json({message:"Unauthorised-Invalid Token"})
        }
        const user= await UserModel.findById(decoded.userId)
        if(!user)
        {
            return res.status(404).json({message:"User not Found"})
        }
        req.user=user
        next();
    } catch (error) {
        console.log("Protect Route Error",error)
    }
}