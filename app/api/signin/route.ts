import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/_helpers/server";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/app/_helpers/server/api";

async function signIn(req: NextRequest, res: NextResponse) {
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

  const { email, password } = await req.json();
  console.log(email, password);

  try {
    const user = await db.Users.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password ?? ""))) {
      console.log(user);
      NextResponse.json(
        { message: "Email or Password is wrong!" },
        {
          status: 401,
        }
      );
      throw new Error("Email or Password is wrong!");
    }
    console.log("first");
    return NextResponse.json(
      { message: "Log in successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
    throw new Error("Email or Password is wrong!");
  }
}

module.exports = apiHandler({
  GET: signIn,
  POST: signIn,
  PUT: signIn,
  DELETE: signIn,
});
