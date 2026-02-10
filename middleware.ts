// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup", "/verify-email", "/forgot-password", "/reset-password", "/"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow public routes
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  // allow next internals + static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  // allow auth APIs (so login/logout still works)
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // protect everything else
  const token = req.cookies.get("token")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
