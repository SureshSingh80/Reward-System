
import dbConnect from "@/lib/dbConnect";
import Customers from "@/models/Customers";
import { NextResponse } from "next/server";



export async function POST(request) {
    await dbConnect();

    try {
        const data = await request.json();
         const {c_id,name,email}=data;
         console.log("data=",data);
        
        // store in Customer collection
        let newCustomer = new Customers({
            c_id:c_id,
            name:name,
            email:email
        });
        await newCustomer.save();
        return NextResponse.json({message:"SignUp Successfull",status:200});
    } catch (error) {
        return NextResponse.json({message:"Error in Sign Up in backend",status:500});
    }

    

    console.log(data);
    return new Response(JSON.stringify(data));
}