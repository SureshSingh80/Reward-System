import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        await dbConnect();
        const {searchParams} = new URL(request.url);
        const filter=searchParams.get("filter");
        console.log("Filter= ",filter);
        

        //  validate filter 
        if(!filter){
            return NextResponse.json({message:"Filter is required"},{status:400});
        }
        
        let filteredCoupons;

        if(filter=='all'){
             filteredCoupons = await Coupons.find({});
            //  console.log("filteredCoupons= ",filteredCoupons);
            
        }

        if(filter=='claimed'){
            filteredCoupons = await Coupons.find({isClaimed:true});
            // console.log("filteredCoupons= ",filteredCoupons);
            
        }

        if(filter=='unclaimed'){
            filteredCoupons = await Coupons.find({isClaimed:false});
            // console.log("filteredCoupons= ",filteredCoupons);
            
        }

        

        

        return NextResponse.json({message:filteredCoupons},{status:200});
    } catch (error) {
        console.log("Error in fetching filtered coupons= ",error.message);
    }
}