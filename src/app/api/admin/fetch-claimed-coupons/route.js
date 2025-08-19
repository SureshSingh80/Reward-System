import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await dbConnect();

        const coupons = await Coupons.find({isClaimed:true});
        console.log("claimed coupons= ",coupons);

        return NextResponse.json({coupons},{status:200});

    } catch (error) {
         console.log("Error in fetching claimed coupons");
         return NextResponse.json({message:"Error in fetching claimed coupons"},{status:500});
    }
}