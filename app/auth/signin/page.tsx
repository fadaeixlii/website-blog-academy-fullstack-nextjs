"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import AuthComponent from "./AuthComponent";

export default function SignInPage() {
  return (
    <SessionProvider>
      <div>
        <h1 className="text-2xl font-bold">Sign In</h1>

        <AuthComponent />
      </div>
    </SessionProvider>
  );
}
