import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // overwrite with empty cookie + expired
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // past date = delete
    path: "/",
  });

  return res;
}
