import { NextResponse } from "next/server";
import { verifyAdminToken } from "./utils/admin/verifyAdminToken";
import {verifyClientToken} from "./utils/user/verifyClientToken";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || null;
  const adminToken = request.cookies.get("adminToken")?.value || null;
  const isAdminPath = path.startsWith("/admin");

  //   console.log("token in middleware=",token);
  console.log("adminToken in middleware=", adminToken);

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/"

  
   // for admin route protection
  if (isAdminPath && path !== "/admin/login") {
      const result = await verifyAdminToken(adminToken);
         console.log("result for admin token= ",result);
      if(!result.ok){  
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
  }
 

   // for customer route protection
 if (!isAdminPath && !isPublicPath) {
    // console.log("customer middleware working...");
     const result = await verifyClientToken(token);
     console.log("result for client token= ",result);
    if(!result.ok){  
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths"
export const config = {
  matcher: [
    "/",
    "/profile",
    "/dashboard",
    "/show-coupons",
    "/help",
    "/admin/:path*", // ✅ everything under /admin/*
    

  ],
  runtime: "nodejs", // 👈 force node runtime

};
