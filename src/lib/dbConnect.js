import mongoose from "mongoose";

let isConnected = false;

export async function dbConnect() {

    if(isConnected){
        console.log("Already connected to database");
        return;
    }
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  
 
}
