import { dbConnect } from "@/lib/dbConnect";
import Customers from "@/models/Customers";
import Notification from "@/models/Notification";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request){
     try {
        await dbConnect();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        console.log("id= ",id);
        // validation
        if(!id){
            return NextResponse.json({message:"ID is required"},{status:400});
        }

        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //         console.log("Invalid ID");
        //         return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        //     }

        const notifications = await  Customers.findById(id).populate("notifications");
                // console.log("notifications= ",notifications);

        if(!notifications){
            return NextResponse.json({message:"notifications not found"},{status:500});
        }

        return NextResponse.json({notifications},{status:200});
     } catch (error) {
        console.log("Error in fetching notifications",error);
        return NextResponse.json({message:"Error in fetching notifications"},{status:500});
     }
}