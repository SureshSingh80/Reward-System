import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function DELETE(request){
    try {
        await dbConnect();
        const {couponCode} = await request.json();
        console.log("delete couponCode= ",couponCode);
        //  validate couponCode
        if(!couponCode)
            return NextResponse.json({message:'Coupon code is required'}, {status:400});

        // delete coupon with couponCode and claimed true status
        const deletedCoupon = await Coupons.findOneAndDelete({couponCode:couponCode,isClaimed:true});
        console.log("deletedCoupon= ",deletedCoupon);
        if(!deletedCoupon)
            return NextResponse.json({message:'Coupon Not found'}, {status:400});
        
        return NextResponse.json({message:'coupon deleted successfully'}, {status:200});
    } catch (error) {
        console.log("error in deleting coupon= ",error.message);
        return NextResponse.json({message:'failed to delete'}, {status:400});
    }
}