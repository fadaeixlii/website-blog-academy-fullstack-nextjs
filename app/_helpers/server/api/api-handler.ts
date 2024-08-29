import { NextRequest, NextResponse } from "next/server";
import { validateMiddleware } from "./validate-middleware";
import { errorHandler } from "./error-handler";
import { authHandler } from "./auth-handler";

export { apiHandler };

function apiHandler(handler: any) {
  const wrappedHandler: any = {};
  const httpMethods = ["GET", "POST", "PUT", "DELETE"];

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== "function") {
      console.log("handler is not function ", method);
      return;
    }

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        const json = await req.json();
        req.json = () => json;
      } catch {}

      try {
        if (handler[method].admin) {
          await authHandler(req);
        }
        if (handler[method].schema)
          await validateMiddleware(req, handler[method].schema);

        const responseBody = await handler[method](req, ...args);
        return NextResponse.json(responseBody || {});
      } catch (err: any) {
        return errorHandler(err);
      }
    };
  });
  return wrappedHandler;
}
