import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Signup Controller
export const Signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Basic input validation (add more robust validation as needed)
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    if(password.length<6)
    {
        return res.status(400).json({message:"Password must be atleast 6 characters"})
    }

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });
if(newUser)
{
    generateToken(newUser._id,res)
    await newUser.save();
    const {password:_,...userData}=newUser.toObject()
    return res.status(201).json({ success: true, message: "User created successfully." ,userData});

}


  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const Login=async(req ,res)=>{
    try{
        const {email,password}=req.body

        const user=await UserModel.findOne({email})
        if(!user)
        {
            return res.status(404).json({message:"Invalid Email"})
        }
        const correctPassword= await bcrypt.compare(password,user.password)
        if(!correctPassword)
        {
            return res.status(401).json({message:"Invalid Password"})
        }
        generateToken(user._id,res)
        const {password:_,...userData}=user.toObject()
        return res.status(200).json({success:true,message:"Login Successful",userData})

    } catch(error)
    {
        console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const Logout=async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(201).json({message:"Logout Successful"})
        
    } catch (error) {
        console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const UpdateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body
        const userId=req.user._id
        if(!profilePic)
        {
            return res.status(400).json({message:"Profile Pic is required"})
        }
      const uploadResponse=  await cloudinary.uploader.upload(profilePic)
      const updatedUser= await UserModel.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
      return res.status(200).json(updatedUser)
    } catch (error) {
        console.error("Update Profile Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" }); 
    }

}
export const checkAuth=async(req,res)=>{
    try {
        const {password:_,...userData}=req.user.toObject()
        return res.status(200).json(userData)
        
    } catch (error) {
        console.error("Check Auth Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" }); 
    }
}