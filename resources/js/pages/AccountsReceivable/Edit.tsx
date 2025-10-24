
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';

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
        put(`/admin/accounts-receivable/${record.id}`);
    }

    return (
        <AppLayout>
            <Head title="Edit Account Receivable" />
            <div className="space-y-6 p-4 bg-background min-h-screen">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-primary mb-1">Edit Account Receivable</h2>
                </div>
                <div className="max-w-xl w-full mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Client ID</label>
                            <input type="text" className="input w-full border rounded px-3 py-2" value={data.client_id} onChange={e => setData('client_id', e.target.value)} />
                            {errors.client_id && <div className="text-red-500 text-sm mt-1">{errors.client_id}</div>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Invoice No</label>
                            <input type="text" className="input w-full border rounded px-3 py-2" value={data.invoice_no} onChange={e => setData('invoice_no', e.target.value)} />
                            {errors.invoice_no && <div className="text-red-500 text-sm mt-1">{errors.invoice_no}</div>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Amount</label>
                            <input type="number" className="input w-full border rounded px-3 py-2" value={data.amount} onChange={e => setData('amount', e.target.value)} />
                            {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Balance</label>
                            <input type="number" className="input w-full border rounded px-3 py-2" value={data.balance} onChange={e => setData('balance', e.target.value)} />
                            {errors.balance && <div className="text-red-500 text-sm mt-1">{errors.balance}</div>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Invoice Date</label>
                            <input type="date" className="input w-full border rounded px-3 py-2" value={data.invoice_date} onChange={e => setData('invoice_date', e.target.value)} />
                            {errors.invoice_date && <div className="text-red-500 text-sm mt-1">{errors.invoice_date}</div>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Due Date</label>
                            <input type="date" className="input w-full border rounded px-3 py-2" value={data.due_date} onChange={e => setData('due_date', e.target.value)} />
                            {errors.due_date && <div className="text-red-500 text-sm mt-1">{errors.due_date}</div>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Status</label>
                            <select className="input w-full border rounded px-3 py-2" value={data.status} onChange={e => setData('status', e.target.value)}>
                                <option value="unpaid">Unpaid</option>
                                <option value="partial">Partial</option>
                                <option value="paid">Paid</option>
                            </select>
                            {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Link href="/admin/accounts-receivable" className="inline-flex items-center px-4 py-2 rounded bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors">Cancel</Link>
                            <button type="submit" className="inline-flex items-center px-4 py-2 rounded bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors" disabled={processing}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditAccountsReceivable;
