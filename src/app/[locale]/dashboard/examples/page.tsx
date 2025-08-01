import { Examples } from "@/components/screens/dashboard/examples/Examples";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import React from "react";

const ExamplesPage = async () => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, ["Pages.Dashboard.Examples"])}
    >
      <Examples />
    </NextIntlClientProvider>
  );
};

export default ExamplesPage;
