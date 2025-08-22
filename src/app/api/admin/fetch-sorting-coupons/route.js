import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        await dbConnect();
        const {searchParams} = new URL(request.url);
        const sort = searchParams.get("sort");
        console.log("sorting= ",sort);
        
        if(!sort)
            return NextResponse.json({message:"Sorting is required"},{status:400});

        let sortedCoupons;
        // ascending order (rewards points)

        if(sort=='ascending'){
            sortedCoupons = await Coupons.find().sort({rewardsPoint:1});
            console.log("ascending sortedCoupons= ",sortedCoupons);
            
        }

        // descending order (rewards points)
        if(sort=='descending'){
            sortedCoupons = await Coupons.find().sort({rewardsPoint:-1});
            // console.log(" descending sortedCoupons= ",sortedCoupons);
            
        }

        // newest (latest created coupons)
        if(sort=='newest'){
            sortedCoupons = await Coupons.find().sort({createdAt:-1});
            // console.log(" newest sortedCoupons= ",sortedCoupons);
            
        }

        // oldest (created first to last)
        if(sort=='oldest'){
            sortedCoupons = await Coupons.find().sort({createdAt:1});
            // console.log(" oldest sortedCoupons= ",sortedCoupons);
            
        }

        // natural insertion order (default order)
        if(sort=='default'){
            sortedCoupons = await Coupons.find({});
            // console.log(" default sortedCoupons= ",sortedCoupons);
            
        }
        

        return NextResponse.json({message:sortedCoupons},{status:200});
    } catch (error) {
        console.log("Error in fetching filtered coupons");
        return NextResponse.json({message:"Error in fetching filtered coupons"},{status:500});
    }
}