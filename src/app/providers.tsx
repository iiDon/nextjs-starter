"use client";
import React from "react";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Locale, NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const Providers = ({
  children,
  locale,
  session,
}: {
  children: React.ReactNode;
  locale: Locale;
  session?: Session | null;
}) => {
  return (
    <NextIntlClientProvider locale={locale}>
      <SessionProvider session={session}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
