import { dbConnect } from "@/lib/dbConnect";
import Coupons from "@/models/Coupons";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        await dbConnect();
        const {searchParams} = new URL(request.url);
        const sort = searchParams.get("sort");
        const email = searchParams.get("email");
        console.log("sorting= ",sort);
        console.log("email=", email);
        
        if(!sort || !email) {
                console.log("Sort input is required or email is required");
                return NextResponse.json({message:"Sorting is required"},{status:400});
        }

        const trimedSort = sort.trim();
            

        let sortedCoupons;
        // ascending order (rewards points)

        if(trimedSort==='ascending'){
           
            sortedCoupons = await Coupons.find({redeemedByEmail:email,isClaimed:true}).sort({rewardsPoint:1});
            // console.log("ascending sortedCoupons= ",sortedCoupons);
            
        }

        // descending order (rewards points)
        if(trimedSort==='descending'){
            sortedCoupons = await Coupons.find({redeemedByEmail:email,isClaimed:true}).sort({rewardsPoint:-1});
            // console.log(" descending sortedCoupons= ",sortedCoupons);
            
        }

        // natural insertion order (default order)
        if(trimedSort==='default'){
            sortedCoupons = await Coupons.find({redeemedByEmail:email,isClaimed:true});
            console.log(" default sortedCoupons= ",sortedCoupons);
            
        }
       return NextResponse.json({message:sortedCoupons},{status:200});

    } catch (error) {
        console.log("Error in fetching filtered coupons");
        return NextResponse.json({message:"Error in fetching filtered coupons"},{status:500});
    }
}