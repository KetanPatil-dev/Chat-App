import mongoose from "mongoose";

export const ConnectDB=async()=>{
try {
   const connection= await mongoose.connect(process.env.MONGO_URL)
    console.log(`MONGODB Connected Successfully: ${connection.connection.host}`)
} catch (error) {
    console.log("MongoError",error)
}
}