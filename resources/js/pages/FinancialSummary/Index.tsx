import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';
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

  const currentYear = new Date().getFullYear();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Financial Summary" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-1">FINANCIAL SUMMARY ({currentYear} Overview)</h2>
          <p className="text-gray-500 text-sm">Overview of financial performance for the year {currentYear}.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {summary.map((row: SummaryRow) => (
            <Card key={row.category} className="shadow-lg bg-white/90 backdrop-blur rounded-2xl border border-gray-100">
              <CardHeader>
                <CardTitle>{row.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Current Month</span>
                    <span className="font-semibold text-blue-600 text-lg">{formatPeso(row.current_month)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Year-to-Date</span>
                    <span className="font-semibold text-green-600 text-lg">{formatPeso(row.year_to_date)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
