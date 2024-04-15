import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const { WEATHER_API_KEY } = process.env;

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  if (nextUrl.pathname.startsWith("/api-weather")) {
    return NextResponse.rewrite(
      `${nextUrl.href}&appid=${WEATHER_API_KEY}`,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api-weather/:path*"],
};
