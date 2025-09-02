import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        dbConnect();
        console.log("Get Request for fetche coupon");
        
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');

        // console.log("coupon ID=",id);
        const coupon = await Coupons.findById(id);
        console.log("coupon= ",coupon);
        
        return NextResponse.json({coupon},{status:200});

    } catch (error) {
         return NextResponse.json({message:"Failed to view this coupon"},{status:500});
    }
}