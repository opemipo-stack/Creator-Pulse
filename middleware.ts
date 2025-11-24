import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Handle OPTIONS requests
    if (request.method === "OPTIONS") {
      return NextResponse.json(
        {},
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "86400",
          },
        }
      );
    }

    // For other methods, attach CORS headers to the response
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return response;
  }

  // Non-API requests continue normally
  return NextResponse.next();
}

// Apply middleware only to /api/*
export const config = {
  matcher: "/api/:path*",
};
