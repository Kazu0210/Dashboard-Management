import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

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

export default function Index() {
  const summary = (usePage().props as { summary?: SummaryRow[] }).summary ?? [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Financial Summary" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-1">IV. FINANCIAL SUMMARY (2024 Overview)</h2>
          <p className="text-gray-500 text-sm">Overview of financial performance for the year 2024.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Month</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year-to-Date</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row) => (
                <tr key={row.category} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 border-b text-gray-700 font-medium">{row.category}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{formatPeso(row.current_month)}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{formatPeso(row.year_to_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
