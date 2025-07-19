import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
    dbConnect();
    const {_id,couponCode,rewardsPoint}= await request.json();
    console.log(_id,couponCode,rewardsPoint);
    
        const newCoupon = await Coupons.findOneAndUpdate(
            {_id:_id},
            {$set:{couponCode:couponCode,rewardsPoint:rewardsPoint}}
        );
        if(!newCoupon){
            return NextResponse.json({message:"Error in updating coupon"},{status:502});
        }
        return NextResponse.json({message:"coupon updated successfully"},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"failed to update coupon"},{status:502});
    }
    
}