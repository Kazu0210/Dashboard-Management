

import { StatCard } from "@/components/StatCard";
import { RecentActivity } from "@/components/RecentActivity";
import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import AppLayout from '@/layouts/app-layout';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 bg-background min-h-screen">
        <div>
          <h2 className="text-3xl font-bold text-primary">Overview</h2>
          <p className="text-lg text-secondary mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="2,847"
            change="+12.5%"
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Revenue"
            value="$45,231"
            change="+8.2%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Orders"
            value="1,234"
            change="+23.1%"
            icon={ShoppingCart}
            trend="up"
          />
          <StatCard
            title="Growth"
            value="+18.7%"
            change="+4.3%"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <RecentActivity />
          </div>
          <div className="lg:col-span-3">
            <RecentActivity />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
