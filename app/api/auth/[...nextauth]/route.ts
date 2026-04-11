import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUsers } from "@/lib/local-db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.customUsername) {
        token.customUsername = session.customUsername;
        token.customName = session.customName;
      }

      if (!token.email) return token;

      // Extract username directly from local JSON cache if present
      const users = getUsers();
      if (users[token.email]) {
        token.customUsername = users[token.email].username;
        token.customName = users[token.email].name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.customUsername = token.customUsername;
        // @ts-ignore
        session.user.customName = token.customName;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
