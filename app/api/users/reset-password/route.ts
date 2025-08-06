import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

await connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token, newPassword } = reqBody;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Reset token is required." }, { status: 400 });
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    let hashedPassword: string;
    try {
      const salt = await bcryptjs.genSalt(10);
      hashedPassword = await bcryptjs.hash(newPassword, salt);
    } catch (hashError: any) {
      console.error("Error hashing password:", hashError);
      return NextResponse.json({ error: "Failed to process password." }, { status: 500 });
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired password reset token." },
        { status: 400 }
      );
    }

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpires = undefined;

    try {
      await user.save();
    } catch (saveError: any) {
      console.error("Error saving user after password reset:", saveError);
      return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Password has been reset successfully.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Unexpected error during password reset:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}