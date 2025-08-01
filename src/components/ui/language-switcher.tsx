"use client";

import { Locale, useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCALES } from "@/configs/i18n/defaults";
import { usePathname, useRouter } from "@/configs/i18n/navigation";
export default function LanguageSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      onValueChange={(value) => {
        router.push(pathname, { locale: value as Locale });
      }}
      defaultValue={locale}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t("Language")} />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
