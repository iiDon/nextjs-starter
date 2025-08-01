import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./configs/i18n/routing";
import { NextRequest } from "next/server";
import { throwError } from "./lib/errors/throwError";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  try {
    return intlMiddleware(request);
  } catch (error) {
    return throwError(error);
  }
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
