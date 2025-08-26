import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
            await dbConnect();
            const {searchParams} = new URL(request.url);
            const search = searchParams.get('search');
            const email = searchParams.get('email');
            console.log("search= ",search+' email= '+email);

            // validation 
            if(!email){
                return NextResponse.json({message:"email both is required"},{status:400});
            }
            const trimmedSearch = search.trim();

            const coupons = await Coupons.find({couponCode:{$regex:trimmedSearch,$options:"i"},redeemedByEmail:email});
            // console.log("fetched user searched coupons= ",coupons);
            return NextResponse.json({message:coupons},{status:200});
    }
    catch(error){
        console.log("Failed to fetch searched coupons",error);
        return NextResponse.json({message:"Failed to fetch"},{status:400});
    }
}