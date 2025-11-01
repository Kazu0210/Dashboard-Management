import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';
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

const ValueLabelInside = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width - 8}
      y={y + 18}
      fontSize={12}
      fill="#fff"
      textAnchor="end"
      fontWeight={500}
    >
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
          <h2 className="text-3xl font-semibold text-gray-900 mb-1">IV. FINANCIAL SUMMARY (2024 Overview)</h2>
          <p className="text-gray-500 text-sm">Overview of financial performance for the year 2024.</p>
        </div>
        <Card className="shadow-lg bg-white/90 backdrop-blur rounded-2xl border border-gray-100">
        <CardHeader>
            <CardTitle>Financial Overview (Vertical Chart)</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={420}>
            <BarChart
                data={summary}
                margin={{ top: 30, right: 30, left: 10, bottom: 40 }}
                barCategoryGap={24}
            >
                <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.7} />
                </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                <XAxis dataKey="category" fontSize={12} angle={-20} dy={10} />
                <YAxis tickFormatter={formatPeso} fontSize={12} />
                <Tooltip formatter={formatPeso} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 13 }} />

                <Bar
                dataKey="current_month"
                name="Current Month"
                fill="url(#blueGradient)"
                radius={[8, 8, 0, 0]}
                barSize={28}
                >
                <LabelList
                  dataKey="current_month"
                  position="top"
                  formatter={(label: ReactNode) =>
                    typeof label === 'number' ? formatPeso(label) : label
                  }
                  fontSize={11}
                />
                </Bar>

                <Bar
                dataKey="year_to_date"
                name="Year-to-Date"
                fill="url(#greenGradient)"
                radius={[8, 8, 0, 0]}
                barSize={28}
                >
                <LabelList
                  dataKey="year_to_date"
                  position="top"
                  formatter={(label: ReactNode) =>
                    typeof label === 'number' ? formatPeso(label) : label
                  }
                  fontSize={11}
                />
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
