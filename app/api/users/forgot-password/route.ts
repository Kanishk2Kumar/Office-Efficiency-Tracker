import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { Resend } from "resend";
import ResetPasswordEmail from "@/email/resetPasswordEmail";

await connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const reqBody = req.json();
    const { email } = await reqBody;

    // Validate input
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 404 }
      );
    }

    const userId = findUser._id;

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const tokenExpiry = Date.now() + 3600000;

    try {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpires: tokenExpiry,
        },
      });
    } catch (dbUpdateError: any) {
      console.error("Error updating user with reset token:", dbUpdateError);
      return NextResponse.json(
        { error: "Failed to generate reset token." },
        { status: 500 }
      );
    }

    let ResetPasswordEmailContent;
    try {
      ResetPasswordEmailContent = await ResetPasswordEmail({
        email,
        link: `${process.env.DOMAIN}/reset-password?token=${hashedToken}`,
      });
    } catch (emailRenderError: any) {
      console.error("Error rendering reset email:", emailRenderError);
      return NextResponse.json(
        { error: "Failed to generate email content." },
        { status: 500 }
      );
    }

    try {
      const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset Password Request",
        react: ResetPasswordEmailContent,
      });
    } catch (emailSendError: any) {
      console.error("Error sending reset email:", emailSendError);
      return NextResponse.json(
        { error: "Failed to send reset email." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Reset password email sent successfully.", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Unexpected error during forgot password:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
