
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    // Mock data for charts
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Actual Collection',
                data: [12000, 15000, 10000, 18000, 14000, 17000],
                backgroundColor: '#4B5563',
            },
        ],
    };
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Net Income',
                data: [5000, 7000, 4000, 9000, 6000, 8000],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37,99,235,0.1)',
                tension: 0.4,
            },
        ],
    };
    const pieData = {
        labels: ['Payroll', 'Supplies', 'Other'],
        datasets: [
            {
                label: 'Expenses',
                data: [8000, 3000, 2000],
                backgroundColor: ['#f59e42', '#10b981', '#6366f1'],
            },
        ],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="aspect-video">
                        <CardHeader>
                            <CardTitle>Actual Collection (Bar)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                        </CardContent>
                    </Card>
                    <Card className="aspect-video">
                        <CardHeader>
                            <CardTitle>Net Income (Line)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                        </CardContent>
                    </Card>
                    <Card className="aspect-video">
                        <CardHeader>
                            <CardTitle>Expense Breakdown (Pie)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
                        </CardContent>
                    </Card>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min mt-4">
                    {/* Add more charts or summary cards here as needed */}
                </div>
            </div>
        </AppLayout>
    );
}
