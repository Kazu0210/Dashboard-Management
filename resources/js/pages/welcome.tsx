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
import { ChartBarInteractive } from '@/components/ChartBarInteractive';

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

    // Transform projects data for the supplies & equipment chart
    const suppliesEquipmentData = projects.map(project => ({
        project_name: project.project_name || `Project ${project.project_number}`,
        total_supplies_equipment: Number(project.total_supplies_equipment) || 0,
        bid_price: Number(project.bid_price_one_year) || 0,
        project_id: project.id,
        status: project.status
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
        <div className="h-screen w-full bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-10 overflow-hidden flex flex-col">
            {/* Real-time Status Indicator */}
            <div className="flex justify-end mb-2 sm:mb-4 flex-shrink-0">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <div className={`w-2 h-2 rounded-full ${isUpdating ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                    <span className="hidden sm:inline">{isUpdating ? 'Updating data...' : `Last updated: ${lastUpdated.toLocaleTimeString()}`}</span>
                    <span className="sm:hidden">{isUpdating ? 'Updating...' : 'Live'}</span>
                </div>
            </div>

            {/* FTE Allocation Chart, Project Status, and Pie Chart Section */}
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 lg:gap-6 mb-4 lg:mb-6 flex-1 min-h-0">
                <div className="w-full lg:w-2/5 h-1/2 lg:h-full">
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
                <div className="w-full lg:w-2/5 h-1/2 lg:h-full">
                    <Card className="bg-[#0f172a] border border-[#1e293b] shadow-xl rounded-lg lg:rounded-2xl overflow-hidden h-full flex flex-col">
                        <CardHeader className="pb-2 border-b border-[#1e293b] p-3 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                    <h3 className="text-sm sm:text-lg font-semibold text-white tracking-wide">
                                        Project Status Statistics
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-400">
                                        Bid performance by project status
                                    </p>
                                    <div className="mt-1 sm:mt-2 text-xs text-gray-400">
                                        <span className="text-[#38bdf8] font-semibold text-xs sm:text-sm">{statusStatsWithPercentage.length}</span> status categories
                                    </div>
                                </div>
                                <div className="px-2 sm:px-3 py-1 text-xs font-medium text-[#38bdf8] bg-[#1e293b] rounded-md whitespace-nowrap">
                                    Live Data
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-2 sm:p-6 flex-1 flex flex-col overflow-hidden">
                            <div className="w-full flex-1 overflow-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#1e293b]">
                                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-300 text-xs sm:text-sm">Status</th>
                                            <th className="text-right py-2 sm:py-3 px-1 sm:px-4 font-semibold text-gray-300 text-xs sm:text-sm hidden sm:table-cell">Bid Price</th>
                                            <th className="text-right py-2 sm:py-3 px-1 sm:px-4 font-semibold text-gray-300 text-xs sm:text-sm">Count</th>
                                            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-300 text-xs sm:text-sm">Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statusStatsWithPercentage.map((stat, index) => (
                                            <tr 
                                                key={index} 
                                                className="border-b border-[#1e293b]/50 hover:bg-[#1e293b]/30 transition-all duration-200"
                                            >
                                                <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-white flex items-center gap-2">
                                                    <div className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${
                                                        stat.status.toLowerCase().includes('ongoing')
                                                            ? 'bg-green-400'
                                                            : stat.status.toLowerCase().includes('loss')
                                                            ? 'bg-red-400'
                                                            : stat.status.toLowerCase().includes('eoc')
                                                            ? 'bg-blue-400'
                                                            : 'bg-yellow-400'
                                                    }`}></div>
                                                    <span className="text-xs sm:text-sm truncate">{stat.status}</span>
                                                </td>
                                                <td className="py-2 sm:py-3 px-1 sm:px-4 text-right font-mono text-gray-300 text-xs sm:text-sm hidden sm:table-cell">
                                                    ₱{stat.bidPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                </td>
                                                <td className="py-2 sm:py-3 px-1 sm:px-4 text-right font-semibold text-[#38bdf8] text-xs sm:text-sm">
                                                    {stat.bidCount}
                                                </td>
                                                <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                                                        <div className="w-8 sm:w-[60px] bg-[#0f172a] rounded-full h-1.5 sm:h-2 overflow-hidden">
                                                            <div 
                                                                className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] transition-all duration-500"
                                                                style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="font-semibold text-gray-300 text-xs sm:text-sm min-w-[35px] sm:min-w-[45px]">
                                                            {stat.percentage.toFixed(1)}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 border-[#38bdf8]/30 bg-[#1e293b]/30">
                                            <td className="py-2 sm:py-3 px-2 sm:px-4 font-bold text-white text-xs sm:text-sm">Total</td>
                                            <td className="py-2 sm:py-3 px-1 sm:px-4 text-right font-mono font-bold text-white text-xs sm:text-sm hidden sm:table-cell">
                                                ₱{totalBidPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                            </td>
                                            <td className="py-2 sm:py-3 px-1 sm:px-4 text-right font-bold text-[#38bdf8] text-xs sm:text-sm">
                                                {statusStatsWithPercentage.reduce((sum, stat) => sum + stat.bidCount, 0)}
                                            </td>
                                            <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-bold text-white text-xs sm:text-sm">
                                                100.0%
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/5 h-1/2 lg:h-full hidden md:block">
                    <Card className="bg-[#0f172a] border border-[#1e293b] shadow-xl rounded-lg lg:rounded-2xl overflow-hidden h-full flex flex-col">
                        <CardHeader className="pb-2 border-b border-[#1e293b] p-3 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                    <h3 className="text-sm sm:text-lg font-semibold text-white tracking-wide">
                                        Project Distribution
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-400">
                                        Bid Price Breakdown
                                    </p>
                                    <div className="mt-1 sm:mt-2 text-xs text-gray-400">
                                        <span className="text-[#38bdf8] font-semibold text-xs sm:text-sm">₱{totalBidPrice.toLocaleString()}</span> total value
                                    </div>
                                </div>
                                <div className="px-2 sm:px-3 py-1 text-xs font-medium text-[#38bdf8] bg-[#1e293b] rounded-md whitespace-nowrap">
                                    Live Data
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-3 sm:p-6 flex-1 flex flex-col">
                            <div className="w-full flex-1 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusStatsWithPercentage.map(stat => ({
                                                name: stat.status.charAt(0).toUpperCase() + stat.status.slice(1),
                                                value: stat.bidPrice,
                                                percentage: stat.percentage
                                            }))}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="70%"
                                            innerRadius="30%"
                                            paddingAngle={2}
                                        >
                                            {statusStatsWithPercentage.map((stat, index) => {
                                                const colors = {
                                                    ongoing: '#10b981',
                                                    loss: '#ef4444',
                                                    eoc: '#3b82f6'
                                                };
                                                const color = colors[stat.status.toLowerCase() as keyof typeof colors] || '#6b7280';
                                                return <Cell key={`cell-${index}`} fill={color} />;
                                            })}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value: number, name: string, props: any) => [
                                                `₱${value.toLocaleString()}`,
                                                name
                                            ]}
                                            labelFormatter={(label: string) => `${label}`}
                                            contentStyle={{
                                                backgroundColor: "#1e293b",
                                                borderRadius: "8px",
                                                border: "1px solid #334155",
                                                color: "#f8fafc",
                                                boxShadow: "0 4px 16px rgba(56,189,248,0.2)",
                                            }}
                                            labelStyle={{ color: "#38bdf8" }}
                                            itemStyle={{ color: "#f1f5f9" }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            
                            {/* Legend */}
                            <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
                                {statusStatsWithPercentage.map((stat, index) => {
                                    const colors = {
                                        ongoing: '#10b981',
                                        loss: '#ef4444',
                                        eoc: '#3b82f6'
                                    };
                                    const color = colors[stat.status.toLowerCase() as keyof typeof colors] || '#6b7280';
                                    return (
                                        <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                                            <div 
                                                className="w-2 sm:w-3 h-2 sm:h-3 rounded-full" 
                                                style={{ backgroundColor: color }}
                                            ></div>
                                            <span className="text-gray-300 flex-1 truncate">
                                                {stat.status.charAt(0).toUpperCase() + stat.status.slice(1)}
                                            </span>
                                            <span className="text-white font-semibold">
                                                {stat.percentage.toFixed(1)}%
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 flex-shrink-0 h-40 sm:h-60 lg:h-80">
                {/* Ongoing Projects Supplies & Equipment Chart */}
                <ChartBarInteractive 
                    data={suppliesEquipmentData}
                    title="Ongoing Projects - Supplies & Equipment"
                    description="Equipment costs vs bid prices for ongoing projects only"
                />

                {/* Bar Chart */}
                <Card className="flex-1">
                    <CardContent className="w-full h-full flex items-center justify-center p-2 sm:p-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="project" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(value: number) => `₱${value.toLocaleString()}`} />
                                <Bar dataKey="billing" fill="#10b981" name="Billed Amount" />
                                <Bar dataKey="collected" fill="#3b82f6" name="Collected Amount" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="flex-1 md:col-span-2 xl:col-span-1">
                    <CardContent className="w-full h-full flex items-center justify-center p-2 sm:p-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="70%"
                                    label={false}
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
