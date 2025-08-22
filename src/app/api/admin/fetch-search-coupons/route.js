import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
            await dbConnect();
            const {searchParams} = new URL(request.url);
            const search = searchParams.get('search');
            console.log("search= ",search);
            const coupons = await Coupons.find({couponCode:{$regex:search,$options:"i"}});
            // console.log("fetched searched coupons= ",coupons);
            return NextResponse.json({message:coupons},{status:200});
    }
    catch(error){
        console.log("Failed to fetch searched coupons",error);
        return NextResponse.json({message:"Failed to fetch"},{status:400});
    }
}