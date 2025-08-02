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
import { Globe } from "lucide-react";

type LanguageSwitcherProps = {
  onlyIcon?: boolean;
};

export default function LanguageSwitcher({
  onlyIcon = false,
}: LanguageSwitcherProps) {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Map locale codes to display names
  const localeDisplayNames: Record<string, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    zh: "中文",
    ja: "日本語",
    ar: "العربية",
    // Add more locales as needed
  };

  const getDisplayName = (localeCode: string) => {
    return localeDisplayNames[localeCode] || localeCode.toUpperCase();
  };

  return (
    <div className="relative">
      <Select
        onValueChange={(value) => {
          router.push(pathname, { locale: value as Locale });
        }}
        defaultValue={locale}
      >
        <SelectTrigger
          className={`h-10 px-3 py-2 bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent group ${
            onlyIcon ? "[&>svg:last-child]:hidden" : ""
          }`}
        >
          {onlyIcon ? (
            <Globe className="w-5 h-5 text-muted-foreground" />
          ) : (
            <SelectValue
              placeholder={t("Language")}
              className="flex-1 text-left"
            />
          )}
        </SelectTrigger>

        <SelectContent className="bg-background border border-border rounded-lg shadow-lg p-1 z-50">
          {LOCALES.map((localeOption) => (
            <SelectItem
              key={localeOption}
              value={localeOption}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors"
            >
              <div className="flex items-center gap-2 w-full">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1 text-foreground font-medium">
                  {getDisplayName(localeOption)}
                </span>
                {localeOption === locale && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
