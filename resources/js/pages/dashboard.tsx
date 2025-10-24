


import { StatCard } from "@/components/StatCard";
import { RecentActivity } from "@/components/RecentActivity";
import { Users, DollarSign, ShoppingCart, TrendingUp, RefreshCw } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);


const initialStats = {
  users: 2847,
  revenue: 45231,
  orders: 1234,
  growth: 18.7,
};

const initialChartData = {
  users: [2200, 2300, 2500, 2600, 2700, 2800, 2847],
  revenue: [32000, 35000, 37000, 40000, 42000, 44000, 45231],
  orders: [800, 900, 1000, 1100, 1200, 1220, 1234],
  months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
};

const Dashboard = () => {
  const [stats, setStats] = useState(initialStats);
  const [chartData, setChartData] = useState(initialChartData);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      // For demo, just randomize the stats a bit
      setStats((prev) => ({
        users: prev.users + Math.floor(Math.random() * 20),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        orders: prev.orders + Math.floor(Math.random() * 30),
        growth: +(prev.growth + (Math.random() * 2 - 1)).toFixed(1),
      }));
      setChartData((prev) => ({
        ...prev,
        users: [...prev.users.slice(1), prev.users[6] + Math.floor(Math.random() * 20)],
        revenue: [...prev.revenue.slice(1), prev.revenue[6] + Math.floor(Math.random() * 1000)],
        orders: [...prev.orders.slice(1), prev.orders[6] + Math.floor(Math.random() * 30)],
      }));
      setRefreshing(false);
    }, 800);
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-4 bg-background min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-primary">Overview</h2>
            <p className="text-lg text-secondary mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-60"
            disabled={refreshing}
            title="Refresh dashboard"
          >
            <RefreshCw className={refreshing ? 'animate-spin' : ''} size={18} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats.users.toLocaleString()}
            change={"+12.5%"}
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            change={"+8.2%"}
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Orders"
            value={stats.orders.toLocaleString()}
            change={"+23.1%"}
            icon={ShoppingCart}
            trend="up"
          />
          <StatCard
            title="Growth"
            value={`+${stats.growth}%`}
            change={"+4.3%"}
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-2">User Growth</h3>
            <Line
              data={{
                labels: chartData.months,
                datasets: [
                  {
                    label: 'Users',
                    data: chartData.users,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99,102,241,0.1)',
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
              height={220}
            />
          </div>
          <div className="bg-card rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-2">Revenue & Orders</h3>
            <Bar
              data={{
                labels: chartData.months,
                datasets: [
                  {
                    label: 'Revenue',
                    data: chartData.revenue,
                    backgroundColor: '#34d399',
                  },
                  {
                    label: 'Orders',
                    data: chartData.orders,
                    backgroundColor: '#60a5fa',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } },
              }}
              height={220}
            />
          </div>
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
