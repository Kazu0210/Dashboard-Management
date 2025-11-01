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
import { Link, usePage } from "@inertiajs/react";
import { LayoutGrid, DollarSign, BarChart2, FileText, Users, Briefcase, FileWarning, Settings, Shield } from "lucide-react";
import AppLogo from "./app-logo";

const mainNavItems: NavItem[] = [
    { title: "Dashboard", href: dashboard(), icon: LayoutGrid },
    {
        title: "Billing & Collection",
        icon: DollarSign,
        children: [
            { title: "Actual Collection", href: "/admin/collections", icon: BarChart2 },
            { title: "Account Receivables", href: "/admin/accounts-receivable", icon: FileText },
        ],
    },
    {
        title: "Project / Client Monitoring",
        icon: Briefcase,
        children: [
            { title: "Project Monitoring", href: "/admin/projects", icon: Briefcase },
            { title: "Client Monitoring", href: "/admin/clients", icon: Users },
        ],
    },
    { title: "Employee Management", href: "/admin/employees", icon: Users },
    { title: "DOLE Cases", href: "/admin/dole-cases", icon: FileWarning },
    { title: "Financial Summary", href: "/admin/financial-summary", icon: BarChart2 },
];

const footerNavItems: NavItem[] = [];

const adminNavItems: NavItem[] = [
    { title: "User Management", href: "/admin/users", icon: Users },
    // { title: "Roles", href: "/admin/roles", icon: Shield },
    // { title: "Settings", href: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const page = usePage();

    return (
        <Sidebar
            variant="inset"
            collapsible="icon"
            className={`transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
        >
            <SidebarContent>
                <NavMain items={mainNavItems} />

                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Admin Tools</SidebarGroupLabel>
                    <SidebarMenu>
                        {adminNavItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={item.href ? page.url.startsWith(typeof item.href === 'string' ? item.href : item.href.url) : false}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
