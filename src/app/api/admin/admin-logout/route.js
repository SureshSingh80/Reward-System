import { NextResponse } from "next/server";

export async function GET(request){
      try {
         const response = NextResponse.json({message:"Logout successful"},{status:200});
         response.cookies.set('adminToken','',{
            path:'/',
            httpOnly:true,
            // secure:true,
            sameSite:"lax",
            expires: new Date(0)
         });
         return response;
      } catch (error) {
         return NextResponse.json({message:"Error in logging out"},{status:401});
      }
}