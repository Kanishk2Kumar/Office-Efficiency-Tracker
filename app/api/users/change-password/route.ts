import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

await connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, oldPassword, newPassword } = reqBody;

    // Validate input
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }
    if (!oldPassword || typeof oldPassword !== "string") {
      return NextResponse.json(
        { error: "Old password is required." },
        { status: 400 }
      );
    }
    if (
      !newPassword ||
      typeof newPassword !== "string" ||
      newPassword.length < 6
    ) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Check if the old password matches
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Old password is incorrect." },
        { status: 401 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;

    try {
      await user.save();
    } catch (saveError: any) {
      console.error("Error saving user after password change:", saveError);
      return NextResponse.json(
        { error: "Failed to change password." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Password has been changed successfully.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request format." },
      { status: 400 }
    );
  }
}
