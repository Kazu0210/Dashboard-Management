import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function SupplyExpensesIndex() {
    const { expenses = { data: [] } } = usePage().props as any;

    const formatDateOnly = (v: any) => {
        if (!v) return '—';
        if (typeof v === 'string') {
            if (v.includes('T')) return v.split('T')[0];
            if (v.includes(' ')) return v.split(' ')[0];
            return v;
        }
        return String(v);
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Head title="Supply Expenses" />
                    <div className="w-full max-w-6xl mt-8 p-6 bg-white rounded shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-semibold">Supply Expenses</h1>
                            <Link href="/admin/supply-expenses/create" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                New Supply Expense
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                                        <th className="px-6 py-3" />
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {expenses.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-gray-500">No supply expenses yet.</td>
                                        </tr>
                                    )}

                                    {expenses.data.map((e: any) => (
                                        <tr key={e.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{e.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.description ?? '—'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateOnly(e.expense_date)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.creator ? e.creator.name : '—'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={`/admin/supply-expenses/${e.id}`} className="text-indigo-600 hover:underline mr-4">View</Link>
                                                <Link href={`/admin/supply-expenses/${e.id}/edit`} className="text-indigo-600 hover:underline mr-4">Edit</Link>
                                                <button type="button" onClick={() => {
                                                    if (!confirm('Are you sure you want to delete this supply expense? This action cannot be undone.')) return;

                                                    router.delete(`/admin/supply-expenses/${e.id}`, {
                                                        onSuccess: () => router.visit('/admin/supply-expenses'),
                                                    });
                                                }} className="text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}

