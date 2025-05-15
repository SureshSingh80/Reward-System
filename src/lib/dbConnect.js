import mongoose, { mongo } from "mongoose";

let database={
   isConnected:false
}
async function dbConnect(){
    // if(database.isConnected){
    //     console.log("Already connected to database");
    //     return;
    // }
    console.log("Env Data:",process.env.FIREBASE_API_KEY);
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI);
        database.isConnected=true;
        console.log("DB connected Successfully",database.isConnected);
    } catch (error) {
        console.log(process.env.MONGODB_URI);
        console.log("Database connection failed");

    }
}

export default dbConnect;