import { dbConnect } from "@/lib/dbConnect";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";
import Customers from "@/models/Customers";

export async function POST(request){
     try {
         await dbConnect();
         const {title,message,type,customerId}= await request.json();
         console.log("title=",title,"message=",message,"type=",type,"customerId=",customerId);

         // validatation 
         if(!title || !message || !type) return NextResponse.json({message:"Title, Message and Type is required"},{status:400});

         const notification = await Notification.create({title,message,type});
         console.log("notification= ",notification);

         if(!notification) 
            return NextResponse.json({message:"Error in Generating notification"},{status:500});

         // send notification to customer
         const customer = await Customers.findOneAndUpdate({_id:customerId},{$push:{notifications:notification._id}},{new:true});
         console.log("customer= ",customer);

         if(!customer) 
            return NextResponse.json({message:"Error in sending notification"},{status:500});
         
         return NextResponse.json({message:"Notification sent successfully"},{status:200});
     } catch (error) {
        console.log("ERROR in sending notification",error);
        return NextResponse.json({message:"Error in sending notification"},{status:500});
     }
}