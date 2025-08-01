import { routing } from "@/configs/i18n/routing";
import { DEFAULT_LOCALE } from "@/configs/i18n/defaults";
import arMessages from "@/../messages/ar.json";
import enMessages from "@/../messages/en.json";

type MessagesType = typeof DEFAULT_LOCALE extends "ar"
  ? typeof arMessages
  : typeof DEFAULT_LOCALE extends "en"
  ? typeof enMessages
  : typeof arMessages;

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: MessagesType;
  }
}
