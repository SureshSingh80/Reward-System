import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function POST(request){
     dbConnect();
     const {couponCode,rewardsPoint}= await request.json();
     console.log(couponCode,rewardsPoint);
     try {
        const newCoupon = new Coupons({
            couponCode,
            rewardsPoint
        });
        await newCoupon.save();
        return NextResponse.json({message:"Coupon Generated successfully"},{status:200});
     } catch (error) {
      
        console.log(error);
        return NextResponse.json({message:"Error in Generating Coupon"},{status:502});
        
     }
     
}