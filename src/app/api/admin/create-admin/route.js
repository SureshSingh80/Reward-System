import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export async function POST(request) {
  const { name, email, password } = await request.json();
  dbConnect();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const adminId = 'ADM_' + nanoid(8); // e.g., ADM_A8J94KGZ


  try {
    const newAdmin = new Admin({
      adminId,
      name,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    return  NextResponse.json(
      {message:"Admin created successfully"},
      {status:200}
    );
  } catch (error) {
    return  NextResponse.json(
       {message:"Error in creating admin"},
       {status:502}
    );
  }
}
