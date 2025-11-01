import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import type { ReactNode } from 'react';

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'Financial Summary', href: '/financial-summary' },
];

type SummaryRow = {
  category: string;
  current_month: number;
  year_to_date: number;
};

function formatPeso(value: number) {
  return `₱${value.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
}

// Custom label for Bar values
const ValueLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text x={x + 8} y={y + 12} fontSize={12} fill="#374151">
      {formatPeso(value)}
    </text>
  );
};

export default function Index() {
  const summary = (usePage().props as any).summary ?? [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Financial Summary" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-1">FINANCIAL SUMMARY (2024 Overview)</h2>
          <p className="text-gray-500 text-sm">Overview of financial performance for the year 2024.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Month Bar Chart */}
          <Card className="shadow-md bg-white/80 backdrop-blur rounded-2xl">
            <CardHeader>
              <CardTitle>Current Month</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={summary} layout="vertical" margin={{ left: 24, right: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={formatPeso} fontSize={12} />
                  <YAxis dataKey="category" type="category" width={160} fontSize={12} />
                  <Tooltip formatter={formatPeso} />
                  <Bar dataKey="current_month" fill="#2563eb">
                    <LabelList dataKey="current_month" position="right" content={ValueLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* Year-to-Date Bar Chart */}
          <Card className="shadow-md bg-white/80 backdrop-blur rounded-2xl">
            <CardHeader>
              <CardTitle>Year-to-Date</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={summary} layout="vertical" margin={{ left: 24, right: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={formatPeso} fontSize={12} />
                  <YAxis dataKey="category" type="category" width={160} fontSize={12} />
                  <Tooltip formatter={formatPeso} />
                  <Bar dataKey="year_to_date" fill="#059669">
                    <LabelList dataKey="year_to_date" position="right" content={ValueLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
