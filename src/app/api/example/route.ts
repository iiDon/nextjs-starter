import { guard } from "@/app/actions/services/guard";
import { throwError } from "@/lib/errors/throwError";
import { getLocale } from "@/app/actions/services/getLocale";
import { NextResponse } from "next/server";
import { limiter } from "@/lib/rate-limiter";
import { getIp } from "@/app/actions/services/getIp";
import { prisma } from "@/configs/prisma/prisma";
import { getTranslations } from "next-intl/server";
import { CustomizedError } from "@/lib/errors/errors";

export async function GET(request: Request) {
  try {
    const ip = getIp(request); // get ip from request
    await limiter.consume(ip); // consume the ip
    const locale = await getLocale(request); // get locale from request
    await guard(["ADMIN"], locale); // guard the request
    const t = await getTranslations({
      locale, // get locale
      namespace: "Pages.Dashboard.Examples", // get namespace
    }); // get translations

    // Uncomment the line below to test custom error handling
    // throw new CustomizedError(t("Internal server error"), 500);

    // do the logic here
    const examples = await prisma.example.findMany({
      include: {
        User: true,
      },
    });

    if (examples[0]?.title === "test") {
      throw new CustomizedError(t("No_examples_found"), 404); // if you want to throw error use customized error with the status code
    }

    return NextResponse.json(examples); // return the examples
  } catch (error) {
    return throwError(error); // throw error with this function
  }
}
