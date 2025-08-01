import { Role } from "@/configs/prisma/generated";
import { Home, LucideIcon, FileText } from "lucide-react";

type SidebarItem = {
  title: IntlPath;
  url: string;
  icon: LucideIcon;
  role: Role[];
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    role: [Role.ADMIN, Role.USER],
  },
  {
    title: "Examples",
    url: "/dashboard/examples",
    icon: FileText,
    role: [Role.ADMIN],
  },
];
