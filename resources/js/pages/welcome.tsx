import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChartBarLabelCustom } from '@/components/ChartBarLabelCustom';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

type ProjectStat = {
    id?: number;
    name: string;
}

export default function Welcome() {
    const { project_status: project_statusRaw, project_count, projects: projectsRaw, ongoing_projects_count } = usePage().props;
    const project_status: ProjectStat[] = Array.isArray(project_statusRaw) ? project_statusRaw : [];
    const projects: any[] = Array.isArray(projectsRaw) ? projectsRaw : [];
    const totalProjectCount = Number(project_count) || 0;
    const ongoingProjectsCount = Number(ongoing_projects_count) || 0;

    // State for real-time updates
    const [isUpdating, setIsUpdating] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Key metrics mock
    const metrics = [
        { label: 'Total Users', value: 1200 },
        { label: 'Active Projects', value: 32 },
        { label: 'Revenue', value: '₱1,200,000' },
        { label: 'Growth', value: '12%' },
    ];

    // Sample data
    const lineData = [
        { month: 'Jan', income: 120000 },
        { month: 'Feb', income: 135000 },
        { month: 'Mar', income: 125000 },
        { month: 'Apr', income: 142000 },
        { month: 'May', income: 138000 },
        { month: 'Jun', income: 150000 },
    ];

    const barData = [
        { project: 'DOTr', billing: 8500000, collected: 2300000 },
        { project: 'BIR', billing: 5800000, collected: 900000 },
        { project: 'Sandigan', billing: 7500000, collected: 1200000 },
    ];

    const pieData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Calculate project status statistics
    const statusStats = project_status.map(status => {
        // Filter projects by status
        const statusProjects = projects.filter(project => project.status === status.name || project.status === status.id);
        
        // Calculate total bid price for this status
        const totalBidPrice = statusProjects.reduce((sum, project) => {
            return sum + (Number(project.bid_price_one_year) || 0);
        }, 0);
        
        // Count of projects with this status
        const bidCount = statusProjects.length;
        
        return {
            status: status.name,
            bidPrice: totalBidPrice,
            bidCount: bidCount
        };
    });

    // Calculate total bid price across all projects for percentage calculation
    const totalBidPrice = statusStats.reduce((sum, stat) => sum + stat.bidPrice, 0);

    // Add percentage share to each status
    const statusStatsWithPercentage = statusStats.map(stat => ({
        ...stat,
        percentage: totalBidPrice > 0 ? ((stat.bidPrice / totalBidPrice) * 100) : 0
    }));

    // Transform projects data for FTE allocation chart
    const chartData = projects
        .filter(project => project.fte && project.fte > 0) // Only include projects with FTE data
        .sort((a, b) => Number(b.fte) - Number(a.fte)) // Sort by FTE descending (highest first)
        .slice(0, 8) // Limit to top 8 projects for better visualization
        .map(project => ({
            month: project.project_name || `Project ${project.project_number}`, // Using month field as project name
            desktop: Number(project.fte) || 0 // FTE value
        }));

    // Real-time data updates every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsUpdating(true);
            
            // Reload only the current page data without full page refresh
            router.reload({ 
                only: ['projects', 'project_count', 'ongoing_projects_count', 'project_status'],
                onSuccess: () => {
                    setIsUpdating(false);
                    setLastUpdated(new Date());
                },
                onError: () => {
                    setIsUpdating(false);
                }
            });
        }, 30000); // 30 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6 md:p-10">
            {/* Real-time Status Indicator */}
            <div className="flex justify-end mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={`w-2 h-2 rounded-full ${isUpdating ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                    {isUpdating ? 'Updating data...' : `Last updated: ${lastUpdated.toLocaleTimeString()}`}
                </div>
            </div>

            {/* FTE Allocation Chart and Project Status Section */}
            <div className="flex gap-6 mb-8">
                <div className="w-1/2">
                    <ChartBarLabelCustom 
                        chartData={chartData}
                        title="FTE Allocation per Project"
                        description="Current Active Projects - Q4 2024"
                        footerTrend={{
                            text: "Resource utilization trending",
                            isUp: true
                        }}
                        footerDescription="Showing Full-Time Equivalent staff allocation across active projects"
                        ongoingCount={ongoingProjectsCount}
                    />
                </div>
                <div className="w-1/2">
                    <Card className="bg-[#0f172a] border border-[#1e293b] shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="pb-2 border-b border-[#1e293b]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white tracking-wide">
                                        Project Status Statistics
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        Bid performance by project status
                                    </p>
                                    <div className="mt-2 text-xs text-gray-400">
                                        <span className="text-[#38bdf8] font-semibold text-sm">{statusStatsWithPercentage.length}</span> status categories
                                    </div>
                                </div>
                                <div className="px-3 py-1 text-xs font-medium text-[#38bdf8] bg-[#1e293b] rounded-md">
                                    Live Data
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className="w-full h-[360px] overflow-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#1e293b]">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-300 text-sm">Status</th>
                                            <th className="text-right py-3 px-4 font-semibold text-gray-300 text-sm">Bid Price</th>
                                            <th className="text-right py-3 px-4 font-semibold text-gray-300 text-sm">Bid Count</th>
                                            <th className="text-right py-3 px-4 font-semibold text-gray-300 text-sm">% Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statusStatsWithPercentage.map((stat, index) => (
                                            <tr 
                                                key={index} 
                                                className="border-b border-[#1e293b]/50 hover:bg-[#1e293b]/30 transition-all duration-200"
                                            >
                                                <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        stat.status.toLowerCase().includes('win')
                                                            ? 'bg-green-400'
                                                            : stat.status.toLowerCase().includes('lost')
                                                            ? 'bg-red-400'
                                                            : stat.status.toLowerCase().includes('ongoing')
                                                            ? 'bg-blue-400'
                                                            : 'bg-yellow-400'
                                                    }`}></div>
                                                    {stat.status}
                                                </td>
                                                <td className="py-3 px-4 text-right font-mono text-gray-300">
                                                    ₱{stat.bidPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="py-3 px-4 text-right font-semibold text-[#38bdf8]">
                                                    {stat.bidCount}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <div className="w-[60px] bg-[#0f172a] rounded-full h-2 overflow-hidden">
                                                            <div 
                                                                className="h-2 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] transition-all duration-500"
                                                                style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="font-semibold text-gray-300 text-sm min-w-[45px]">
                                                            {stat.percentage.toFixed(1)}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 border-[#38bdf8]/30 bg-[#1e293b]/30">
                                            <td className="py-3 px-4 font-bold text-white">Total</td>
                                            <td className="py-3 px-4 text-right font-mono font-bold text-white">
                                                ₱{totalBidPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="py-3 px-4 text-right font-bold text-[#38bdf8]">
                                                {statusStatsWithPercentage.reduce((sum, stat) => sum + stat.bidCount, 0)}
                                            </td>
                                            <td className="py-3 px-4 text-right font-bold text-white">
                                                100.0%
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Line Chart */}
                <Card className="flex-1">
                    <CardContent className="w-full h-[22rem] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => `₱${value.toLocaleString()}`} />
                                <Line type="monotone" dataKey="income" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Bar Chart */}
                <Card className="flex-1">
                    <CardContent className="w-full h-[22rem] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="project" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => `₱${value.toLocaleString()}`} />
                                <Bar dataKey="billing" fill="#10b981" name="Billed Amount" />
                                <Bar dataKey="collected" fill="#3b82f6" name="Collected Amount" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="flex-1">
                    <CardContent className="w-full h-[22rem] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="70%"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
