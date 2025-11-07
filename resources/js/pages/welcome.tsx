import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChartBarLabelCustom } from '@/components/ChartBarLabelCustom';
import { Head, Link, usePage } from '@inertiajs/react';

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
    name: string;
}

export default function Welcome() {
    const { project_status: project_statusRaw, project_count, projects: projectsRaw } = usePage().props;
    const project_status: ProjectStat[] = Array.isArray(project_statusRaw) ? project_statusRaw : [];
    const projects: any[] = Array.isArray(projectsRaw) ? projectsRaw : [];

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

    // Transform projects data for FTE allocation chart
    const chartData = projects
        .filter(project => project.fte && project.fte > 0) // Only include projects with FTE data
        .sort((a, b) => Number(b.fte) - Number(a.fte)) // Sort by FTE descending (highest first)
        .slice(0, 8) // Limit to top 8 projects for better visualization
        .map(project => ({
            month: project.project_name || `Project ${project.project_number}`, // Using month field as project name
            desktop: Number(project.fte) || 0 // FTE value
        }));

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6 md:p-10">
            {/* FTE Allocation Chart Section */}
            <div className="mb-8">
                <ChartBarLabelCustom 
                    chartData={chartData}
                    title="FTE Allocation per Project"
                    description="Current Active Projects - Q4 2024"
                    footerTrend={{
                        text: "Resource utilization up by",
                        percentage: "15.2%",
                        isUp: true
                    }}
                    footerDescription="Showing Full-Time Equivalent staff allocation across active projects"
                />
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
