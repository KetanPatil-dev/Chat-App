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
