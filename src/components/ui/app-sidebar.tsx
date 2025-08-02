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
import { Button } from "./button";
import { ChevronDown, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  SIDEBAR_ITEMS,
  SidebarGroup as SidebarGroupType,
} from "@/constants/sidebar-items";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";
import { useLocale } from "next-intl";
import { usePathname } from "@/configs/i18n/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

export function AppSidebar() {
  const locale = useLocale();
  const { data: session } = useSession();

  return (
    <Sidebar side={locale === "ar" ? "right" : "left"} className="border-e">
      <SidebarHeader className="border-b bg-muted/30">
        <div className="flex flex-row items-center gap-x-4 py-6 px-4">
          <div className="relative">
            <Image
              src="/logo_transparent.png"
              alt="logo"
              width={50}
              height={50}
              style={{ width: "auto", height: "auto" }}
              className="rounded-lg shadow-sm"
            />
          </div>
          <div className="flex flex-col justify-end gap-1 w-full">
            <h1 className="text-lg font-semibold w-full text-foreground">
              {session?.user?.name}
            </h1>
            <p className="text-sm text-muted-foreground w-full">
              {session?.user?.role === "ADMIN" ? "مدير النظام" : "مسؤول متجر"}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        {SIDEBAR_ITEMS.map((group) => (
          <SidebarGroupRender key={group.title} group={group} />
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t bg-muted/30 p-4">
        <div className="space-y-3">
          <LanguageSwitcher />
          <Button
            variant="destructive"
            className="w-full h-10"
            onClick={() => signOut()}
          >
            <LogOutIcon className="w-4 h-4 me-2" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarGroupRender({ group }: { group: SidebarGroupType }) {
  const t = useTranslations("Pages.Dashboard.Sidebar");
  const pathname = usePathname();
  const { data: session } = useSession();

  // Filter items based on user role
  const filteredItems = group.items.filter((item) => {
    if (!session?.user?.role) return false;
    return item.role.includes(session.user.role as Role);
  });

  // Don't render group if no items are accessible
  if (filteredItems.length === 0) return null;

  return (
    <SidebarGroup className="mb-3">
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1.5">
        {t(group.title)}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-0.5">
          {filteredItems.map((item, index) => {
            if (item.type === "collapsible") {
              // Filter subitems for collapsible items
              const accessibleSubitems = item.subitems.filter((subItem) => {
                if (!session?.user?.role) return false;
                return subItem.role.includes(session.user.role as Role);
              });

              // Don't render collapsible item if no subitems are accessible
              if (accessibleSubitems.length === 0) return null;

              return (
                <Collapsible
                  defaultOpen={
                    item.defaultOpen ||
                    item.subitems.some((subItem) => pathname === subItem.url)
                  }
                  key={index}
                  className="group/collapsible "
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full justify-between hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-md bg-background border border-border">
                        <div className="flex items-center gap-3 ">
                          <item.icon className="w-4 h-4 text-muted-foreground group-data-[state=open]/collapsible:text-primary transition-colors" />
                          <span className="font-medium text-sm">
                            {t(item.title)}
                          </span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-muted-foreground group-data-[state=open]/collapsible:text-primary transition-all duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent className="mt-2  rounded-md p-2 bg-muted/20">
                    <SidebarMenu className="space-y-0.5">
                      {accessibleSubitems.map((subItem, subIndex) => {
                        const isActive = pathname === subItem.url;
                        return (
                          <SidebarMenuItem key={subIndex}>
                            <Link
                              href={subItem.url}
                              className={cn(
                                "flex items-center gap-3 w-full py-2.5 px-3 rounded-md ps-6 relative transition-all duration-200 hover:scale-[1.02]",
                                isActive
                                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md"
                                  : "hover:bg-primary/10 hover:text-primary hover:shadow-sm"
                              )}
                            >
                              <div
                                className={cn(
                                  "absolute start-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full",
                                  isActive
                                    ? "bg-primary-foreground"
                                    : "bg-muted-foreground/60"
                                )}
                              ></div>
                              <span
                                className={cn(
                                  "font-medium text-sm",
                                  isActive && "text-primary-foreground"
                                )}
                              >
                                {t(subItem.title)}
                              </span>
                            </Link>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              );
            } else {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={index}>
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-3 w-full py-2.5 px-3 rounded-md transition-all duration-200 hover:scale-[1.02]",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md"
                        : "hover:bg-primary/10 hover:text-primary hover:shadow-sm"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      )}
                    />
                    <span
                      className={cn(
                        "font-medium text-sm",
                        isActive && "text-primary-foreground"
                      )}
                    >
                      {t(item.title)}
                    </span>
                  </Link>
                </SidebarMenuItem>
              );
            }
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
