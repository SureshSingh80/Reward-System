import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || null;
  const adminToken = request.cookies.get('adminToken')?.value || null;
 
//   console.log("token in middleware=",token);
      console.log("adminToken in middleware=",adminToken);

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/" || path === "/admin/login";
  
    if(!isPublicPath && !token){
      return NextResponse.redirect(new URL("/login", request.url)); 
    }

    if(!isPublicPath && !adminToken){
      return NextResponse.redirect(new URL("/admin/login", request.url)); 
    }  

  return NextResponse.next();
  
}

// See "Matching Paths" 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/dashboard',
    '/help',
     '/admin/:path*', // ✅ everything under /admin/*
  ]
};
