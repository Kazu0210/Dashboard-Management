import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: 'Supply Expenses', href: '/admin/supply-expenses' },
        { title: `Show #${expense.id ?? ''}`, href: `/admin/supply-expenses/${expense.id}` },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Supply Expense ${expense.id}`} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 flex flex-col items-center">
                <div className="w-full max-w-3xl mx-auto">
                    <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl font-semibold">Supply Expense</CardTitle>
                            <div className="flex gap-2">
                                <Link href="/admin/supply-expenses" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-semibold">Back</Link>
                                <Link href={`/admin/supply-expenses/${expense.id}/edit`} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold">Edit</Link>
                            </div>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
