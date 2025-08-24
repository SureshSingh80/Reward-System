import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    const res = NextResponse.json({ success: true });

    // set cookie for 7 days
    res.cookies.set("token", token, {
      httpOnly: true, // protect from JS access
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (error) {
     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
