
import React from 'react';

type SummaryRow = {
    category: string;
    current_month: number;
    year_to_date: number;
};

const summary: SummaryRow[] = [
    { category: 'Total Contract Value', current_month: 65400000, year_to_date: 65400000 },
    { category: 'Total Payroll', current_month: 3250000, year_to_date: 36220000 },
    { category: 'Total Supplies', current_month: 450000, year_to_date: 4410000 },
    { category: 'Total Admin Expenses', current_month: 540000, year_to_date: 5720000 },
    { category: 'Total Collected', current_month: 6150000, year_to_date: 67900000 },
    { category: 'Accounts Receivable', current_month: 5000000, year_to_date: 5000000 },
    { category: 'Gross Income', current_month: 12000000, year_to_date: 12000000 },
    { category: 'Net Income', current_month: 9100000, year_to_date: 9100000 },
];

function formatPeso(value: number) {
    return `₱${value.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
}

const FinancialSummary: React.FC = () => {
    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">💵 IV. FINANCIAL SUMMARY (2024 Overview)</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Category</th>
                            <th className="px-4 py-2 border-b">Current Month</th>
                            <th className="px-4 py-2 border-b">Year-to-Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summary.map((row) => (
                            <tr key={row.category}>
                                <td className="px-4 py-2 border-b">{row.category}</td>
                                <td className="px-4 py-2 border-b">{formatPeso(row.current_month)}</td>
                                <td className="px-4 py-2 border-b">{formatPeso(row.year_to_date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinancialSummary;
