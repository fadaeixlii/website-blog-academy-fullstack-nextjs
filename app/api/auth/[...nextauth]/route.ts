import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/_helpers/server";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error("No credentials provided");

        const user = await db.Users.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password ?? ""
        );

        if (!isPasswordValid) {
          throw new Error("Incorrect email or password");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          role: user.role,
          slug: user.slug ?? "",
        } as User;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          const existingUser = await db.Users.findOne({ email: user.email });
          if (!existingUser && profile) {
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
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async session({ session, token }) {
      try {
        const sessionUser = await db.Users.findOne({
          email: token.email,
        });
        console.log(token);
        console.log(session);
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.role = sessionUser.role;
          session.user.slug = sessionUser.slug ?? "";
        }

        if (token) {
          session.jwt = token.jwt; // Add jwt token to the session object
        }

        // session.accessToken = token.account.accessToken

        return session;
      } catch (error) {
        console.error("Error during session callback:", error);
        return session;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          const sessionUser = await db.Users.findOne({
            email: user.email,
          });

          if (sessionUser) {
            const jwtToken = jwt.sign(
              {
                id: sessionUser._id.toString(),
                email: sessionUser.email,
                role: sessionUser.role,
              },
              process.env.JWT_SECRET!,
              { expiresIn: "1h" }
            );
            token.id = sessionUser._id.toString();
            token.role = sessionUser.role;
            token.slug = sessionUser.slug ?? "";
            token.jwt = jwtToken;
          }
        }
        console.log(user);
        console.log(token);
        return token;
      } catch (error) {
        console.error("Error during JWT callback:", error);
        return token;
      }
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
export { handler as GET, handler as POST };
