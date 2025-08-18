import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        await dbConnect();
        const {couponCode,email,_id} = await request.json();
        console.log("couponCode ",couponCode);
        console.log("email ",email);
        console.log("_id=",_id);
            
        // validation for couponCode and email
        if(!couponCode)
            return NextResponse.json({message:"Coupon code is required"},{status:400});

        if(!email)
            return NextResponse.json({message:"Email is required"},{status:400});

        if(!_id)
            return NextResponse.json({message:"User id is required"},{status:400});

        // check coupon is already claimed
        const isCouponClaimed = await Coupons.findOne({couponCode:couponCode,isClaimed:true});
        console.log("isCouponClaimed= ",isCouponClaimed);

        if(isCouponClaimed){
            console.log("Coupon is already claimed");
            return NextResponse.json({message:"Coupon is already claimed"},{status:400});
        }

        // redeem the coupon (search by coupon code , update redemmedbyEmail, redemmedbyObject and isClaimed)
        const coupon = await Coupons.findOneAndUpdate({couponCode:couponCode},{$set:{redeemedByEmail:email,redeemedBy:_id,isClaimed:true}},{new:true});
        console.log("coupon= ",coupon);
        if(!coupon){
            console.log("Coupon not found");
            return NextResponse.json({message:"Coupon not found"},{status:400});
        }

        // validation for isClaimed
        if(coupon.isClaimed == false){
            console.log("Coupon is not claimed");
            return NextResponse.json({message:"Coupon is not claimed"},{status:400});
        }
       
        return NextResponse.json({message:coupon},{status:200});
    } catch (error) {
        console.log("Error in redeeming coupon= ",error.message);
        return NextResponse.json({message:"Error in redeeming coupon"},{status:500});
    }
}