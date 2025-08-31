import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        await dbConnect();
        const {couponCode,email} = await request.json();
        console.log("couponId=",couponCode," email=",email);

        // validation for couponId and email
        if(!couponCode || !email){
             return NextResponse.json({message:"Coupon id or email is not exist"},{status:400});
        }

        // check if coupon is exist with this email
        const coupon = await Coupons.findOne({couponCode:couponCode,redeemedByEmail:email});
        if(!coupon)
            return NextResponse.json({message:"Coupon is not exist with your email"},{status:400});

        if (coupon.isVerified) {
            return NextResponse.json({ message: "Coupon is already verified" },{ status: 400 });
       }

        // update isVerified and verifiedAt 
        const updatedCoupon = await Coupons.findOneAndUpdate({couponCode:couponCode,redeemedByEmail:email,redeemedAt:{ $type: "date", $ne: null }},{$set:{isVerified:true,verifiedAt:new Date()}},{new:true});
        console.log("updatedCoupon= ",updatedCoupon);

        if(!updatedCoupon)
            return NextResponse.json({message:"Coupon not found"},{status:500});


        // ✅ success email trigger
        // const status = await axios.post("https://fastapi.ameegolabs.com/webhook/send-verification-email", {
        //     email,
        //     couponCode,
        //     status: "success",
        //     message: "Coupon verified successfully"
        // });

        // console.log("email send with n8n status= ",status);

        return NextResponse.json({message:"Coupon verified successfully",data:updatedCoupon},{status:200});
    } catch (error) {
        console.log("error in verify coupon",error);
        return NextResponse.json({message:"Failed to  verifying coupon"},{status:500});
    }
}