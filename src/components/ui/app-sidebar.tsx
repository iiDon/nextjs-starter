"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Role } from "@/configs/prisma/generated";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./separator";
import { Button } from "./button";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { SIDEBAR_ITEMS } from "@/constants/sidebar-items";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";
import { useLocale } from "next-intl";
import { usePathname } from "@/configs/i18n/navigation";

export function AppSidebar() {
  const locale = useLocale();
  const { data: session } = useSession();
  const t = useTranslations("Pages.Dashboard.Sidebar");
  const pathname = usePathname();
  return (
    <Sidebar side={locale === "ar" ? "right" : "left"}>
      <SidebarHeader>
        <div className="flex flex-row items-center gap-x-4 py-4 px-2">
          <Image
            src="/logo_transparent.png"
            alt="logo"
            width={50}
            height={50}
            style={{ width: "auto", height: "auto" }}
          />
          <div className="flex flex-col justify-end gap-2 w-full">
            <h1 className="text-md font-bold w-full">{session?.user?.name}</h1>
            <p className="text-sm text-muted-foreground w-full">
              {session?.user?.role === "ADMIN" ? "مدير النظام" : "مسؤول متجر"}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">
            لوحة التحكم
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {SIDEBAR_ITEMS.map(
                (item) =>
                  session?.user?.role &&
                  item.role.includes(session.user.role as Role) && (
                    <SidebarMenuItem
                      className={cn("py-2.5 rounded-md")}
                      key={item.title}
                    >
                      <SidebarMenuButton
                        className="py-6"
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url}>
                          <item.icon
                            style={{ width: "22px", height: "22px" }}
                          />
                          <span className="font-bold">{t(item.title)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <LanguageSwitcher />
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => signOut()}
        >
          <LogOutIcon className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
