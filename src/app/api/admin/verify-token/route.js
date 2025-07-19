import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
export async function GET(request){
    const cookieStore = await cookies();
     const token = cookieStore.get('adminToken')?.value;
     console.log("Token in verification= ",token);
   
     if(!token){
        return NextResponse.json({ok:false,message:"No token"},{status:400});
     }
     try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded token= ",decoded);
        if(decoded.role!='admin'){
            throw new Error("Not admin");
        }
     } catch (error) {
         const response = NextResponse.json({ok:false,message:"failed to verify"},{status:401});
         response.cookies.set('adminToken','',{
            path:'/',
            httpOnly:true,
            // secure:true,
            sameSite:"lax",
            expires: new Date(0)
         })
         return response;
     }

     return  NextResponse.json({ok:true,message:"verified successfully"},{status:200})


}