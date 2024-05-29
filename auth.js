import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./lib/clientPromise";
import { findUserByEmail } from "./queries/auth-queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.MONGODB_DB_NAME,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),

    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const found = await findUserByEmail(credentials?.email);
        if (!found) {
          throw new Error(
            "Could not find user with email " + credentials?.email
          );
        } else {
          const isMatch = found?.password === credentials?.password;
          if (isMatch) {
            user = found;
          } else {
            throw new Error("Password mismatch!");
          }
        }
        return user;
      },
    }),
  ],
});
