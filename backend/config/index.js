import mongoose from "mongoose";
import {} from 'dotenv/config';

export const connectDB = async()=>{
  try {
    const connect = await mongoose.connect(process.env.MONGODB);
    
    if(connect){
      console.log("connection is ok");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

