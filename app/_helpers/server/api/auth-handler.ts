import { URLs } from "@/Services/URLs";
import joi from "joi";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export { authHandler };

async function authHandler(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token || token.role !== "admin") {
      throw new Error("token unauthorized");
    }
  } catch (error) {
    console.log(error);
    if (error) {
      throw `Authorized error: ${error}`;
    }
  }
}
