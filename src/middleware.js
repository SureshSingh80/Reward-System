import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || null;
  const adminToken = request.cookies.get("adminToken")?.value || null;
  const isAdminPath = path.startsWith("/admin");

  //   console.log("token in middleware=",token);
  // console.log("adminToken in middleware=", adminToken);

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/"

  
   // for admin route protection
  if (isAdminPath && path !== "/admin/login" && !adminToken) {
    // console.log("admin middleware working...");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

   // for customer route protection
 if (!isAdminPath && !isPublicPath && !token) {
    // console.log("customer middleware working...");
    return NextResponse.redirect(new URL("/login", request.url));
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
};
