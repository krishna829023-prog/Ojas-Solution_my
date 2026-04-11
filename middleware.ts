import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token;
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // If authenticated but missing custom username, force them to onboarding
    if (isAuth && !token?.customUsername && pathname !== "/onboarding" && !pathname.startsWith("/api/")) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // If authenticated and already boarded, avoid onboarding screen
    if (isAuth && token?.customUsername && pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        
        // Pass allowing these without lock, they are strictly allowed or onboarding redirects take over
        if (pathname === "/" || pathname === "/about" || pathname === "/login") {
          return true;
        }
        
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    }
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|$|about).*)",
  ],
};
