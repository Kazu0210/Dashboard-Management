import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

import {
    BarChart2,
    Users,
    Briefcase,
    FileText,
    FileWarning,
    DollarSign,
    Calendar,
    ShoppingCart,
    CreditCard,
    TrendingUp,
    TrendingDown,
    PieChart,
    BookOpen,
} from 'lucide-react';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
    { title: 'Actual Collection', href: '/actual-collection', icon: BarChart2 },
    { title: 'Full Time Employee', href: '/full-time-employee', icon: Users },
    { title: 'Number of Projects', href: '/number-of-projects', icon: Briefcase },
    { title: 'Account Receivables', href: '/account-receivables', icon: FileText },
    { title: 'Number of DOLE Case', href: '/admin/dole-cases', icon: FileWarning },
    { title: 'Total Contract Price (Annually)', href: '/total-contract-price', icon: DollarSign },
    { title: 'Monthly Supplies Expense', href: '/supplies-expense/monthly', icon: ShoppingCart },
    { title: 'Quarterly Supplies Expense', href: '/supplies-expense/quarterly', icon: ShoppingCart },
    { title: 'Semi Annual Supplies Exp', href: '/supplies-expense/semi-annual', icon: ShoppingCart },
    { title: 'Annual Supplies Exp', href: '/supplies-expense/annual', icon: ShoppingCart },
    { title: 'Payroll Monthly', href: '/payroll/monthly', icon: CreditCard },
    { title: 'Gross Income', href: '/gross-income', icon: TrendingUp },
    { title: 'Gross Expense', href: '/gross-expense', icon: TrendingDown },
    { title: 'Net Income (Monthly)', href: '/net-income/monthly', icon: PieChart },
    { title: 'Knowledge Base', href: '/knowledge-base', icon: BookOpen },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

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
