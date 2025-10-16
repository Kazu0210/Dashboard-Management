import React from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

const EditAccountsReceivable = ({ record }: { record: any }) => {
    const { data, setData, put, processing, errors } = useForm({
        client_id: record.client_id || '',
        invoice_no: record.invoice_no || '',
        amount: record.amount || '',
        balance: record.balance || '',
        invoice_date: record.invoice_date || '',
        due_date: record.due_date || '',
        status: record.status || 'unpaid',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/accounts-receivable/${record.id}`);
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
                        <h1 className="text-2xl font-bold mb-6">Edit Account Receivable</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium">Client ID</label>
                                <input type="text" className="input" value={data.client_id} onChange={e => setData('client_id', e.target.value)} />
                                {errors.client_id && <div className="text-red-500 text-sm">{errors.client_id}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Invoice No</label>
                                <input type="text" className="input" value={data.invoice_no} onChange={e => setData('invoice_no', e.target.value)} />
                                {errors.invoice_no && <div className="text-red-500 text-sm">{errors.invoice_no}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Amount</label>
                                <input type="number" className="input" value={data.amount} onChange={e => setData('amount', e.target.value)} />
                                {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Balance</label>
                                <input type="number" className="input" value={data.balance} onChange={e => setData('balance', e.target.value)} />
                                {errors.balance && <div className="text-red-500 text-sm">{errors.balance}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Invoice Date</label>
                                <input type="date" className="input" value={data.invoice_date} onChange={e => setData('invoice_date', e.target.value)} />
                                {errors.invoice_date && <div className="text-red-500 text-sm">{errors.invoice_date}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Due Date</label>
                                <input type="date" className="input" value={data.due_date} onChange={e => setData('due_date', e.target.value)} />
                                {errors.due_date && <div className="text-red-500 text-sm">{errors.due_date}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Status</label>
                                <select className="input" value={data.status} onChange={e => setData('status', e.target.value)}>
                                    <option value="unpaid">Unpaid</option>
                                    <option value="partial">Partial</option>
                                    <option value="paid">Paid</option>
                                </select>
                                {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Link href="/accounts-receivable" className="btn btn-secondary">Cancel</Link>
                                <button type="submit" className="btn btn-primary" disabled={processing}>Update</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default EditAccountsReceivable;
