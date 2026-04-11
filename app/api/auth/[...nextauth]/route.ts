import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login', // we will create a custom aesthetic login page
  },
  session: {
    strategy: "jwt",
  },
  // We can add callbacks if we need to enforce rules but NextAuth handles this well
});

export { handler as GET, handler as POST };
