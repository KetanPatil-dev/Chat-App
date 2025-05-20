import mongoose from "mongoose";


export const ConnectDB=async()=>{
try {
    
    await mongoose.connect(process.env.MONGO_URL)
console.log("MONGODB Connected Successfully")
    
} catch (error) {
    console.log("MongoError",error)
}
}