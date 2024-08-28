import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/_helpers/server";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/app/_helpers/server/api";

async function signUp(req: NextRequest, res: NextResponse) {
  console.log(req);
  console.log(req.method);
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      {
        status: 405,
      }
    );
  }

  const { email, username, password } = await req.json();
  console.log(email, username, password);

  try {
    const existingUser = await db.Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new db.Users({
      email,
      username,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}

module.exports = apiHandler({
  GET: signUp,
  POST: signUp,
  PUT: signUp,
  DELETE: signUp,
});
