import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

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
    const { email, name } = await reqBody;
    
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
      password: hashedPassword,
    });

    const saveUser = await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully", success: true, saveUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during user signup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
