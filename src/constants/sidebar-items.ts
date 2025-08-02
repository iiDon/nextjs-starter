import { Role } from "@/configs/prisma/generated";
import {
  Home,
  LucideIcon,
  FileText,
  Users,
  Settings,
  BarChart3,
  ShoppingCart,
  Package,
  CreditCard,
  MessageSquare,
  Bell,
  Calendar,
  FolderOpen,
  Database,
  Mail,
  Gift,
  Target,
  TrendingUp,
} from "lucide-react";

type SidebarCollapsibleItem = {
  title: IntlPath;
  type: "collapsible";
  defaultOpen: boolean;
  icon: LucideIcon;
  role: Role[];
  subitems: SidebarNestedItem[];
};

type SidebarItem = {
  title: IntlPath;
  type: "item";
  url: string;
  icon: LucideIcon;
  role: Role[];
};

type SidebarNestedItem = {
  title: IntlPath;
  type: "nested-item";
  url: string;
  role: Role[];
};

export type SidebarGroup = {
  title: IntlPath;
  items: (SidebarItem | SidebarCollapsibleItem)[];
};

export const SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        type: "item",
        url: "/dashboard",
        icon: Home,
        role: [Role.ADMIN, Role.USER],
      },
      {
        title: "Analytics",
        type: "item",
        url: "/dashboard/analytics",
        icon: BarChart3,
        role: [Role.ADMIN, Role.USER],
      },
      {
        title: "Reports",
        type: "collapsible",
        defaultOpen: false,
        icon: FileText,
        role: [Role.ADMIN, Role.USER],
        subitems: [
          {
            title: "Sales_Report",
            type: "nested-item",
            url: "/dashboard/reports/sales",
            role: [Role.ADMIN, Role.USER],
          },
          {
            title: "Examples",
            type: "nested-item",
            url: "/dashboard/examples",
            role: [Role.ADMIN],
          },
          {
            title: "Inventory_Report",
            type: "nested-item",
            url: "/dashboard/reports/inventory",
            role: [Role.ADMIN, Role.USER],
          },
          {
            title: "Customer_Report",
            type: "nested-item",
            url: "/dashboard/reports/customers",
            role: [Role.ADMIN, Role.USER],
          },
        ],
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        type: "collapsible",
        defaultOpen: false,
        icon: Users,
        role: [Role.ADMIN],
        subitems: [
          {
            title: "All_Users",
            type: "nested-item",
            url: "/dashboard/users",
            role: [Role.ADMIN],
          },

          {
            title: "Add_User",
            type: "nested-item",
            url: "/dashboard/users/add",
            role: [Role.ADMIN],
          },
          {
            title: "User_Roles",
            type: "nested-item",
            url: "/dashboard/users/roles",
            role: [Role.ADMIN],
          },
        ],
      },
      {
        title: "Products",
        type: "collapsible",
        defaultOpen: false,
        icon: Package,
        role: [Role.ADMIN, Role.USER],
        subitems: [
          {
            title: "All_Products",
            type: "nested-item",
            url: "/dashboard/products",
            role: [Role.ADMIN, Role.USER],
          },
          {
            title: "Add_Product",
            type: "nested-item",
            url: "/dashboard/products/add",
            role: [Role.ADMIN],
          },
          {
            title: "Categories",
            type: "nested-item",
            url: "/dashboard/products/categories",
            role: [Role.ADMIN],
          },
          {
            title: "Inventory",
            type: "nested-item",
            url: "/dashboard/products/inventory",
            role: [Role.ADMIN, Role.USER],
          },
        ],
      },
      {
        title: "Orders",
        type: "item",
        url: "/dashboard/orders",
        icon: ShoppingCart,
        role: [Role.ADMIN, Role.USER],
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Payments",
        type: "item",
        url: "/dashboard/payments",
        icon: CreditCard,
        role: [Role.ADMIN],
      },
      {
        title: "Transactions",
        type: "collapsible",
        defaultOpen: false,
        icon: BarChart3,
        role: [Role.ADMIN],
        subitems: [
          {
            title: "All_Transactions",
            type: "nested-item",
            url: "/dashboard/transactions",
            role: [Role.ADMIN],
          },
          {
            title: "Pending",
            type: "nested-item",
            url: "/dashboard/transactions/pending",
            role: [Role.ADMIN],
          },
          {
            title: "Completed",
            type: "nested-item",
            url: "/dashboard/transactions/completed",
            role: [Role.ADMIN],
          },
        ],
      },
      {
        title: "Invoices",
        type: "item",
        url: "/dashboard/invoices",
        icon: FileText,
        role: [Role.ADMIN, Role.USER],
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        title: "Messages",
        type: "item",
        url: "/dashboard/messages",
        icon: MessageSquare,
        role: [Role.ADMIN, Role.USER],
      },
      {
        title: "Notifications",
        type: "item",
        url: "/dashboard/notifications",
        icon: Bell,
        role: [Role.ADMIN, Role.USER],
      },
      {
        title: "Email",
        type: "collapsible",
        defaultOpen: false,
        icon: Mail,
        role: [Role.ADMIN],
        subitems: [
          {
            title: "Inbox",
            type: "nested-item",
            url: "/dashboard/email/inbox",
            role: [Role.ADMIN],
          },
          {
            title: "Sent",
            type: "nested-item",
            url: "/dashboard/email/sent",
            role: [Role.ADMIN],
          },
          {
            title: "Drafts",
            type: "nested-item",
            url: "/dashboard/email/drafts",
            role: [Role.ADMIN],
          },
        ],
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        title: "Calendar",
        type: "item",
        url: "/dashboard/calendar",
        icon: Calendar,
        role: [Role.ADMIN, Role.USER],
      },
      {
        title: "Files",
        type: "item",
        url: "/dashboard/files",
        icon: FolderOpen,
        role: [Role.ADMIN, Role.USER],
      },
      {
        title: "Database",
        type: "item",
        url: "/dashboard/database",
        icon: Database,
        role: [Role.ADMIN],
      },
      {
        title: "Settings",
        type: "collapsible",
        defaultOpen: false,
        icon: Settings,
        role: [Role.ADMIN],
        subitems: [
          {
            title: "General",
            type: "nested-item",
            url: "/dashboard/settings/general",
            role: [Role.ADMIN],
          },
          {
            title: "Security",
            type: "nested-item",
            url: "/dashboard/settings/security",
            role: [Role.ADMIN],
          },
          {
            title: "Appearance",
            type: "nested-item",
            url: "/dashboard/settings/appearance",
            role: [Role.ADMIN],
          },
          {
            title: "Notifications",
            type: "nested-item",
            url: "/dashboard/settings/notifications",
            role: [Role.ADMIN],
          },
        ],
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        title: "Campaigns",
        type: "item",
        url: "/dashboard/campaigns",
        icon: Target,
        role: [Role.ADMIN],
      },
      {
        title: "Promotions",
        type: "collapsible",
        defaultOpen: false,
        icon: Gift,
        role: [Role.ADMIN],
        subitems: [
          {
            title: "Active_Promotions",
            type: "nested-item",
            url: "/dashboard/promotions/active",
            role: [Role.ADMIN],
          },
          {
            title: "Create_Promotion",
            type: "nested-item",
            url: "/dashboard/promotions/create",
            role: [Role.ADMIN],
          },
          {
            title: "Promotion_History",
            type: "nested-item",
            url: "/dashboard/promotions/history",
            role: [Role.ADMIN],
          },
        ],
      },
      {
        title: "SEO",
        type: "item",
        url: "/dashboard/seo",
        icon: TrendingUp,
        role: [Role.ADMIN],
      },
    ],
  },
];
