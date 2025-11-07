import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Head, router, usePage, Link } from '@inertiajs/react';

export default function Create() {
    const { errors = {} } = usePage().props as any;
    const [form, setForm] = useState({
        category: '',
        description: '',
        amount: '',
        expense_date: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const [submitting, setSubmitting] = useState(false);
    const [clientErrors, setClientErrors] = useState<any>({});
    const validateClient = () => {
        const errs: any = {};
        if (!form.category || form.category.trim() === '') errs.category = 'Category is required.';
        if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Amount must be greater than 0.';
        return errs;
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validateClient();
        setClientErrors(errs);
        if (Object.keys(errs).length > 0) return;
        setSubmitting(true);
        router.post('/admin/supply-expenses', form, {
            onError: () => setSubmitting(false),
            onSuccess: () => router.visit('/admin/supply-expenses'),
        });
    };
    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: 'Supply Expenses', href: '/admin/supply-expenses' },
        { title: 'Create', href: '/admin/supply-expenses/create' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Supply Expense" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 flex flex-col items-center">
                <div className="w-full max-w-2xl mx-auto">
                    <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Create Supply Expense</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-1">Category</label>
                                    <input name="category" value={form.category} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                    {clientErrors.category && <div className="text-red-500 text-sm">{clientErrors.category}</div>}
                                    {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1">Description</label>
                                    <textarea name="description" value={form.description} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" rows={3} />
                                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1">Amount</label>
                                    <input type="number" step="0.01" name="amount" value={form.amount} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                    {clientErrors.amount && <div className="text-red-500 text-sm">{clientErrors.amount}</div>}
                                    {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1">Expense Date</label>
                                    <input type="date" name="expense_date" value={form.expense_date} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                    {errors.expense_date && <div className="text-red-500 text-sm">{errors.expense_date}</div>}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Link href="/admin/supply-expenses" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-semibold">Cancel</Link>
                                    <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold disabled:opacity-50">
                                        {submitting ? 'Creating…' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
