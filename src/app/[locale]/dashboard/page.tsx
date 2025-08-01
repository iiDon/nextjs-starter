import { Dashboard } from "@/components/screens/dashboard/dashboard/Dashboard";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import React from "react";

const DashboardPage = async () => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, ["Pages.Dashboard.Dashboard"])}
    >
      <Dashboard />
    </NextIntlClientProvider>
  );
};

export default DashboardPage;
