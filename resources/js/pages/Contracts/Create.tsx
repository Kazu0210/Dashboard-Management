import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Head, router, usePage } from '@inertiajs/react';

export default function Create() {
    const { errors = {} } = usePage().props as any;

    const [form, setForm] = useState({
        contract_number: '',
        project_name: '',
        client: '',
        contract_price: '',
        start_date: '',
        end_date: '',
        status: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post('/admin/contracts', form, {
            onError: () => {
                // errors are available in page props
            },
            onSuccess: () => router.visit('/admin/contracts'),
        });
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Head title="Create Contract" />
                    <div className="w-full max-w-2xl mt-8 p-6 bg-white rounded shadow">
                        <h1 className="text-2xl font-semibold mb-4">Create Contract</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1">Contract Number</label>
                                <input name="contract_number" value={form.contract_number} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                {errors.contract_number && <div className="text-red-500 text-sm">{errors.contract_number}</div>}
                            </div>

                            <div>
                                <label className="block mb-1">Project Name</label>
                                <input name="project_name" value={form.project_name} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                {errors.project_name && <div className="text-red-500 text-sm">{errors.project_name}</div>}
                            </div>

                            <div>
                                <label className="block mb-1">Client</label>
                                <input name="client" value={form.client} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                {errors.client && <div className="text-red-500 text-sm">{errors.client}</div>}
                            </div>

                            <div>
                                <label className="block mb-1">Contract Price</label>
                                <input type="number" step="0.01" name="contract_price" value={form.contract_price} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                {errors.contract_price && <div className="text-red-500 text-sm">{errors.contract_price}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1">Start Date</label>
                                    <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                    {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1">End Date</label>
                                    <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" />
                                    {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1">Status</label>
                                <select name="status" value={form.status} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded">
                                    <option value="">Select status</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                            </div>

                            <div>
                                <label className="block mb-1">Notes</label>
                                <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border-gray-200 border px-3 py-2 rounded" rows={4} />
                                {errors.notes && <div className="text-red-500 text-sm">{errors.notes}</div>}
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
