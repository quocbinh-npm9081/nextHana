import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/utils/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // the session will last 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    FacebookProvider({
      clientId: String(process.env.FACEBOOK_CLIENT_ID),
      clientSecret: String(process.env.FACEBOOK_CLIENT_SECRET),
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { phoneNumber, password } = credentials as {
          phoneNumber: string;
          password: string;
        };
        if (!phoneNumber || !password) throw new Error("Invalid credentials !");
        await db.mongoDB.connect();
        const user = await UserModel.findOne({
          phoneNumber: phoneNumber,
        });
        console.log("user, ", user);

        await db.mongoDB.disconnect();
        if (!user || !bcrypt.compareSync(password, user.password))
          throw new Error("Số điện thoại hoặc mật khẩu không đúng !");
        if (user && bcrypt.compareSync(password, user.password)) return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user?.id) token._id = user.id;
      if (user?.isAdmin) token.idAdmin = user.isAdmin;
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token?._id) session.user._id = token._id as string;
      if (token?.isAdmin || session.user.isAdmin)
        session.user.isAdmin = token.isAdmin as boolean;
      return session;
    },
  },
  pages: {
    signIn: "/user/login",
  },
};
export default NextAuth(authOptions);
