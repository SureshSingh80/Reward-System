import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(request){
    dbConnect();
    const {adminID,password} = await request.json();
    console.log(adminID,password);

   try {
     const admin = await Admin.findOne({adminId:adminID});
     if(!admin){
         return NextResponse.json({message:"Admin not found"},{status:400});
     }
 
     const isMatch = await bcrypt.compare(password,admin.password);
     if(!isMatch){
         return NextResponse.json({message:"Invalid credentials"},{status:400});
     }

     const payload = {
         adminId:admin.adminId,
         role:"admin"          
     }
     // create jwt token
     const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});

     const response = NextResponse.json({message:"Login successful"},{status:200});
     response.cookies.set("adminToken",token,{
         httpOnly:true, // prevent access to javascript (client-side)
        //  secure:true,
         sameSite:"lax",
         maxAge:60*60*24, // token expires in 1 day
         path:'/' // cookie will be sent to all routes
     });
     return response;
   } catch (error) {
     return NextResponse.json({message:"Error in login"},{status:500});
   }

   
}