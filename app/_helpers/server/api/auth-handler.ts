import { URLs } from "@/Services/URLs";
import joi from "joi";
import { NextRequest } from "next/server";

export { authHandler };

async function authHandler(req: NextRequest) {
  try {
    console.log(req);
    const response = await fetch(URLs.ssoServer + URLs.USER_DETAIL, {
      ...req,
      method: "POST",
    });
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (data.status !== 200) {
      throw data.message + " ,token unauthorized";
    }
  } catch (error) {
    console.log(error);
    if (error) {
      throw `Authorized error: ${error}`;
    }
  }
}
