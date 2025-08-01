import "server-only";
import { DEFAULT_LOCALE } from "@/configs/i18n/defaults";
import { routing } from "@/configs/i18n/routing";
import { hasLocale } from "next-intl";

export const getLocale = async (request: Request) => {
  // Example: Receive the `locale` via a search param
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");

  if (!hasLocale(routing.locales, locale)) {
    return DEFAULT_LOCALE;
  }

  return locale;
};
