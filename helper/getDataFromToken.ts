import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decoded.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
