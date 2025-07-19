import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function DELETE(request){
    try {
        dbConnect();
        const {id} = await request.json();
        console.log("delete id= ",id);
        const deletedCoupon = await Coupons.findByIdAndDelete(id);
        console.log("deletedCoupon= ",deletedCoupon);
        if(!deletedCoupon){
            return NextResponse.json({message:'Coupon Not found'}, {status:400});
        }
        return NextResponse.json({message:'coupon deleted successfully'}, {status:200});
    } catch (error) {
        console.log("error in deleting coupon= ",error.message);
        return NextResponse.json({message:'failed to delete'}, {status:400});
    }
}