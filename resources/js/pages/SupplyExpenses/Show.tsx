import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Show() {
    const { expense = {} } = usePage().props as any;

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
                    <Head title={`Supply Expense ${expense.id}`} />
                    <div className="w-full max-w-3xl mt-8 p-6 bg-white rounded shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-semibold">Supply Expense</h1>
                            <div>
                                <Link href="/admin/supply-expenses" className="text-indigo-600 hover:underline mr-4">Back</Link>
                                <Link href={`/admin/supply-expenses/${expense.id}/edit`} className="text-indigo-600 hover:underline">Edit</Link>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Category</dt>
                                <dd className="mt-1 text-sm text-gray-900">{expense.category ?? '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Description</dt>
                                <dd className="mt-1 text-sm text-gray-900">{expense.description ?? '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                                <dd className="mt-1 text-sm text-gray-900">{expense.amount}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Expense Date</dt>
                                <dd className="mt-1 text-sm text-gray-900">{formatDateOnly(expense.expense_date)}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Created By</dt>
                                <dd className="mt-1 text-sm text-gray-900">{expense.creator ? expense.creator.name : expense.created_by}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
