import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request){
    dbConnect();
    try {
        const coupons = await Coupons.find({});
        // console.log("fetched coupons= ",coupons);
        
        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({message:"failed to fetch"},{status:400});
    }
}