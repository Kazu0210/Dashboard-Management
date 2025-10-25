
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

const EditAccountsReceivable = ({ record, clients = [] }: { record: any, clients?: { id: number, name: string }[] }) => {
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
            <div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900">Edit Account Receivable</h2>
                        <p className="text-lg mt-1 text-neutral-700">Update the record below.</p>
                    </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 shadow max-w-2xl mx-auto w-full">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label htmlFor="client_id">Client</Label>
                            <select
                                id="client_id"
                                name="client_id"
                                className="mt-1 w-full border rounded-md px-3 py-2"
                                value={data.client_id}
                                onChange={e => setData('client_id', e.target.value)}
                                required
                                disabled={processing}
                            >
                                <option value="">Select a client</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                            {errors.client_id && <div className="text-red-600 text-sm mt-1">{errors.client_id}</div>}
                        </div>
                        <div>
                            <Label htmlFor="invoice_no">Invoice No</Label>
                            <Input
                                id="invoice_no"
                                name="invoice_no"
                                type="text"
                                value={data.invoice_no}
                                onChange={e => setData('invoice_no', e.target.value)}
                                className="mt-1"
                                required
                                disabled={processing}
                            />
                            {errors.invoice_no && <div className="text-red-600 text-sm mt-1">{errors.invoice_no}</div>}
                        </div>
                        <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                                className="mt-1"
                                required
                                disabled={processing}
                            />
                            {errors.amount && <div className="text-red-600 text-sm mt-1">{errors.amount}</div>}
                        </div>
                        <div>
                            <Label htmlFor="balance">Balance</Label>
                            <Input
                                id="balance"
                                name="balance"
                                type="number"
                                value={data.balance}
                                onChange={e => setData('balance', e.target.value)}
                                className="mt-1"
                                required
                                disabled={processing}
                            />
                            {errors.balance && <div className="text-red-600 text-sm mt-1">{errors.balance}</div>}
                        </div>
                        <div>
                            <Label htmlFor="invoice_date">Invoice Date</Label>
                            <Input
                                id="invoice_date"
                                name="invoice_date"
                                type="date"
                                value={data.invoice_date}
                                onChange={e => setData('invoice_date', e.target.value)}
                                className="mt-1"
                                required
                                disabled={processing}
                            />
                            {errors.invoice_date && <div className="text-red-600 text-sm mt-1">{errors.invoice_date}</div>}
                        </div>
                        <div>
                            <Label htmlFor="due_date">Due Date</Label>
                            <Input
                                id="due_date"
                                name="due_date"
                                type="date"
                                value={data.due_date}
                                onChange={e => setData('due_date', e.target.value)}
                                className="mt-1"
                                required
                                disabled={processing}
                            />
                            {errors.due_date && <div className="text-red-600 text-sm mt-1">{errors.due_date}</div>}
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                name="status"
                                className="mt-1 w-full border rounded-md px-3 py-2"
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                required
                                disabled={processing}
                            >
                                <option value="unpaid">Unpaid</option>
                                <option value="partial">Partial</option>
                                <option value="paid">Paid</option>
                            </select>
                            {errors.status && <div className="text-red-600 text-sm mt-1">{errors.status}</div>}
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button asChild variant="outline" className="bg-muted text-foreground">
                                <Link href="/admin/accounts-receivable">Cancel</Link>
                            </Button>
                            <Button type="submit" variant="default" className="bg-green-500 hover:bg-green-600 text-white" disabled={processing}>
                                {processing ? 'Updating...' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditAccountsReceivable;
