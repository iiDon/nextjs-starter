import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/configs/auth";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const locale = await getLocale();
  const messages = await getMessages();
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
 

  if (!session) {
    redirect("/");
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, ["Pages.Dashboard.Sidebar", "Common"])}
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <main className="bg-gray-100 dark:bg-gray-900 flex-1 rounded-xl p-4">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </NextIntlClientProvider>
  );
};

export default DashboardLayout;
