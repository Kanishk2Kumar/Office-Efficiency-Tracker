import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { Resend } from "resend";
import WelcomeEmail from "@/email/welcomeEmail";

await connectToDatabase();
function generatePassword(length: number = 8): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const allChars = upper + lower + numbers + symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = req.json();
    const { email, name, levelOfAccess, department } = await reqBody;

    if (!email) {
      return NextResponse.json("Invalid input", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json("User already exists", { status: 409 });
    }

    const salt = await bcryptjs.genSalt(10);
    const newPassword = generatePassword();
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const newUser = new User({
      name,
      email,
      levelOfAccess,
      department,
      password: hashedPassword,
    });

    const saveUser = await newUser.save();
    if (!saveUser) {
      return NextResponse.json("Failed to register user", { status: 500 });
    }

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
    const welcomeEmailContent = await WelcomeEmail({
      user_name: name,
      user_email: email,
      user_password: newPassword,
      login_link:
        `${process.env.DOMAIN}/sign-in` || "https://example.com/login",
      company_email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "",
    });

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to Our Platform, " + name,
      react: welcomeEmailContent,
    });
    return NextResponse.json(
      { message: "User registered successfully", success: true, saveUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during user signup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
