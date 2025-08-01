import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/configs/i18n/routing";
import Providers from "../providers";
import { Cairo } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/configs/auth";

import "../globals.css";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.className} antialiased`}>
        <Providers locale={locale} session={session}>
          <main>{children}</main>
          <Toaster
            richColors
            position={locale === "ar" ? "top-right" : "top-left"}
          />
        </Providers>
      </body>
    </html>
  );
}
