import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      slug: string;
    } & DefaultSession["user"];
    jwt: string;
  }

  interface User {
    id: string;
    role: string;
    slug: string;
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    slug: string;
    jwt: string;
  }
}
