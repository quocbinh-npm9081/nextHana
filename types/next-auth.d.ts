import { ISession, IUserCredentials } from "@/utils/types";
import NextAuth from "next-auth";
declare module "next-auth" {
  interface User extends IUserCredentials {
    name: string;
    phoneNumber: string;
  }
  interface Session {
    user: IUserCredentials;
  }
}
