import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "./defaults";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
});
