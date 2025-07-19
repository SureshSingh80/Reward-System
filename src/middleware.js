import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || null;
 
//   console.log("token in middleware=",token);

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/";
  
    if(!isPublicPath && !token){
      return NextResponse.redirect(new URL("/login", request.url)); 
    }

  return NextResponse.next();
  
}

// See "Matching Paths" 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/dashboard',
    '/help'

  ]
};
