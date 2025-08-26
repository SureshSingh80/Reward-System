import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request){
      try {
            await dbConnect();
            const {searchParams} = new URL(request.url);
            const email = searchParams.get("email");
            console.log("email =",email);

            // validation
            if(!email)
                  return NextResponse.json({message:"Email is required"},{status:400});

            const coupons = await Coupons.find({redeemedByEmail:email,isClaimed:true});
            // console.log("claimed coupons for email= ",coupons);

            return NextResponse.json({message:coupons},{status:200});

      }catch (error) {
            console.log("Error in fetching data using email");
            return NextResponse.json({message:"Error in fetching data using email"},{status:500});
      }
}