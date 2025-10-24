import { dashboard } from "@/routes/index";
import { useState } from "react";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types";
import { Link } from "@inertiajs/react";
import { LayoutGrid, DollarSign, BarChart2, FileText, Users, Briefcase, FileWarning } from "lucide-react";
import AppLogo from "./app-logo";

const mainNavItems: NavItem[] = [
    { title: "Dashboard", href: dashboard(), icon: LayoutGrid },
    {
        title: "Billing & Collection",
        icon: DollarSign,
        children: [
            { title: "Actual Collection", href: "/admin/collection", icon: BarChart2 },
            { title: "Account Receivables", href: "/admin/accounts-receivable", icon: FileText },
        ],
    },
    { title: "Full Time Employee", href: "/admin/employees", icon: Users },
    { title: "Number of Projects", href: "/admin/monitoring", icon: Briefcase },
    { title: "Number of DOLE Case", href: "/admin/dole-cases", icon: FileWarning },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sidebar
            variant="inset"
            collapsible="icon"
            className={`transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
        >
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
