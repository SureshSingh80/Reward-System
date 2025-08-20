import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
    dbConnect();
    const {_id,couponCode,rewardsPoint}= await request.json();
    console.log(_id,couponCode,rewardsPoint);
    
        const newCoupon = await Coupons.findOneAndUpdate(
            {_id:_id}, // filter
            {$set:{couponCode:couponCode,rewardsPoint:rewardsPoint}}, // update
            {new:true} // options (for return updated document)
        );
        console.log("updated coupon= ",newCoupon);
        if(!newCoupon){
            return NextResponse.json({message:"Error in updating coupon"},{status:502});
        }
        return NextResponse.json({coupon:newCoupon},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"failed to update coupon"},{status:502});
    }
    
}