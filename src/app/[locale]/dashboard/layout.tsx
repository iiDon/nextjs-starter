import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/configs/auth";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const locale = await getLocale();
  const messages = await getMessages();

  if (!session) {
    redirect("/");
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, ["Pages.Dashboard.Sidebar", "Common"])}
    >
      <SidebarProvider>
        <AppSidebar />

        <main className="p-8 w-full bg-gray-100 dark:bg-gray-900">
          <SidebarTrigger className="" />
          {children}
        </main>
      </SidebarProvider>
    </NextIntlClientProvider>
  );
};

export default DashboardLayout;
