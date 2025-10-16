import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Head, router, usePage } from '@inertiajs/react';

export default function Edit() {
    const { expense = {}, errors = {} } = usePage().props as any;

    const [form, setForm] = useState({
        category: '',
        description: '',
        amount: '',
        expense_date: '',
    });

    useEffect(() => {
        if (expense) {
            setForm({
                category: expense.category ?? '',
                description: expense.description ?? '',
                amount: expense.amount ?? '',
                expense_date: expense.expense_date ? expense.expense_date.split('T')[0] : '',
            });
        }
    }, [expense]);

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

        router.put(`/admin/supply-expenses/${expense.id}`, form, {
            onError: () => setSubmitting(false),
            onSuccess: () => router.visit('/admin/supply-expenses'),
        });
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Head title="Edit Supply Expense" />
                    <div className="w-full max-w-2xl mt-8 p-6 bg-white rounded shadow">
                        <h1 className="text-2xl font-semibold mb-4">Edit Supply Expense</h1>

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

                            <div className="flex justify-end">
                                <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold disabled:opacity-50">{submitting ? 'Saving…' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
