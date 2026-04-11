import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Matches the pages to redirect to login if user is not authenticated
  callbacks: {
    authorized: ({ req, token }) => {
      // The middleware checks whether the user is authorized.
      // Returning true means they are allowed to proceed.
      // Returning false redirects them to the sign-in page.
      
      const { pathname } = req.nextUrl;
      
      // Allow access to Home and About without login or signup
      if (pathname === "/" || pathname === "/about" || pathname === "/login") {
        return true;
      }
      
      // If none of the above are matched, require an auth token
      return !!token;
    },
  },
  pages: {
    signIn: '/login', // specify the login path
  }
});

// Protect only the following routes from middleware, leaving everything else alone
export const config = {
  matcher: [
    // Protect everything...
    "/((?!api|_next/static|_next/image|favicon.ico|login|$|about).*)",
  ],
};
