import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";
import Customers from "@/models/Customers";

export async function GET(request) {
    try {
        await dbConnect();
        console.log("Get Request for fetche coupon");
        
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        console.log("coupon ID=",id);

        // validate ID
        if(!id)
            return NextResponse.json({message:"ID is required"},{status:400});

        const coupon = await Coupons.findById(id).populate('redeemedBy');

        if(!coupon){
            return NextResponse.json({message:"Coupon Not found"},{status:400});
        }
        console.log("coupon= ",coupon);
        
        return NextResponse.json({coupon},{status:200});

    } catch (error) {
        console.log("Faild to fetch claimed coupon" , error);
         return NextResponse.json({message:"Failed to Fetch"},{status:500});
    }
}