import { NextResponse } from "next/server";
import { RateLimiterRes } from "rate-limiter-flexible";
import { CustomizedError } from "./errors";
import { getTranslations } from "next-intl/server";

export const throwError = async (error: unknown) => {
  const t = await getTranslations("Error");
  if (error instanceof CustomizedError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof RateLimiterRes) {
    return NextResponse.json(
      {
        message: t("Too many requests"),
        msBeforeNext: (error.msBeforeNext / 1000).toFixed(0),
      },
      { status: 429 }
    );
  }

  return NextResponse.json(
    { message: t("Internal server error") },
    { status: 500 }
  );
};
