import { dbConnect } from "@/lib/dbConnect";
import Customers from "@/models/Customers";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        dbConnect();
        const customers = await Customers.find({}); 
        // console.log("fetched customers= ",customers);
        
        return NextResponse.json({customers},{status:200});
    } catch (error) {
        console.log("Error in fetching customers in backend ",error);
        return NextResponse.json({message:"failed to fetch customers"},{status:400});
    }
}