import { useLocale } from "next-intl";

export const useDir = () => {
  const locale = useLocale();
  return locale === "ar" ? "rtl" : "ltr";
};
