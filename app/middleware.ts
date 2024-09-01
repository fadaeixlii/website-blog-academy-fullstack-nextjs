import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Extract language and theme from cookies
  const language = req.cookies.get("language")?.value || "fa"; // Default language is 'fa'
  const theme = req.cookies.get("theme")?.value || "light"; // Default theme is 'light'
  console.log(language, theme);
  // Set the language and theme as headers to pass them to the app
  const response = NextResponse.next();
  response.headers.set("Accept-Language", language);
  response.headers.set("Theme", theme);

  return response;
}

// Apply this middleware to all routes
export const config = {
  matcher: "/:path*",
};
