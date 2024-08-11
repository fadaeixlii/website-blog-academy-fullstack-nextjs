import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { JWT } from "next-auth/jwt";
import { db } from "@/app/_helpers/server";
import { NextApiRequest, NextApiResponse } from "next";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google") {
        const existingUser = await db.Users.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new db.Users({
            email: user.email,
            username: user.name,
            image: user.image,
            role: "user", // Default role, can be updated later
          });
          await newUser.save();
        }
      }
      return true;
    },
    async session({ session, token }) {
      const sessionUser = await db.Users.findOne({
        email: token.email,
      });

      const t = JSON.parse(JSON.stringify(session));
      t.user.id = sessionUser?._id.toString();
      return t;
    },
    async jwt({ token, user }) {
      const sessionUser = await db.Users.findOne({
        email: user.email,
      });
      if (sessionUser) {
        token.id = sessionUser.id;
        token.role = sessionUser.role;
        token.slug = sessionUser.slug;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
const handler = NextAuth(options);

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

module.exports = {
  GET: handler,
  POST: handler,
};
