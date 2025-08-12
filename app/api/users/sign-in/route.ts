import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Employee from "@/models/employeeModel";
import Manager from "@/models/managerModel";
import HR from "@/models/hrModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

await connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // 2️⃣ Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // 3️⃣ Create JWT token payload
    const tokenData = {
      id: user._id,
      email: user.email,
      levelOfAccess: user.levelOfAccess,
      firstLogin : user.firstLogin
    };

    const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // 4️⃣ Fetch role-specific details
    let roleData;
    switch (user.levelOfAccess) {
      case "user":
        roleData = await Employee.findOne({ email: user.email });
        break;
      case "manager":
        roleData = await Manager.findOne({ email: user.email });
        break;
      case "hr":
        roleData = await HR.findOne({ email: user.email });
        break;
      default:
        return NextResponse.json({ error: "Invalid access level" }, { status: 403 });
    }

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: tokenData,
      details: roleData,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Error in POST /api/users/sign-in:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
