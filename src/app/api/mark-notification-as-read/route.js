import { dbConnect } from "@/lib/dbConnect";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function PUT(request){
    try {
        await dbConnect();
        const {notificationId}= await request.json();
        console.log("notificatoins==",notificationId);

        if(!notificationId)
             return NextResponse.json({message:"NotificationId is required"},{status:400});

         const updatedNotification = await Notification.updateOne({_id:notificationId},{isRead:true});
         console.log("UpdatedNotifcatoins= ",updatedNotification);

        return NextResponse.json({message:"success"},{status:200});
    } catch (error) {
        console.log("Error in marking notifications as read",error);
        return NextResponse.json({message:"Error in marking notifications as read"},{status:500});
    }
}