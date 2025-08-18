import { dbConnect } from "@/lib/dbConnect";
import Customers from "@/models/Customers";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        await dbConnect();
        const {searchParams} = new URL(request.url);
        const email = searchParams.get("email");
        console.log("Email from query= ",email);
        
         // validation for email
         if(!email)
            return NextResponse.json({message:"Email is required"},{status:400});

         const user = await Customers.findOne({email:email});
         console.log("user= ",user);


        return NextResponse.json({user:user},{status:200});
    } catch (error) {
        console.log("Error in fetching data using email");
        return NextResponse.json({message:"Error in fetching data using email"},{status:500});
    }
}