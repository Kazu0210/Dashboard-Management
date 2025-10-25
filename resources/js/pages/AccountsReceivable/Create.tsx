

import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

const CreateAccountsReceivable = () => {
    const { clients = [] } = usePage().props as { clients?: { id: number, name: string }[] };
    const { data, setData, post, processing, errors } = useForm({
        client_id: '',
        invoice_no: '',
        amount: '',
        balance: '',
        invoice_date: new Date().toISOString().slice(0, 10),
        due_date: '',
        status: 'unpaid',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/accounts-receivable');
    }

    return (
        <AppLayout>
            <Head title="Create Account Receivable" />
            <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Create Account Receivable</h2>
                            <p className="text-lg mt-1 text-gray-600">Fill out the form to add a new record.</p>
                        </div>
                        <Link href="/admin/accounts-receivable" className="text-sm text-gray-600 hover:underline">Back to list</Link>
                    </div>

                    <div className="mt-6">
                        <div className="bg-white rounded-lg p-6 shadow w-full">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">Client</label>
                                    <select
                                        id="client_id"
                                        name="client_id"
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    <label htmlFor="invoice_no" className="block text-sm font-medium text-gray-700">Invoice No</label>
                                    <input
                                        id="invoice_no"
                                        name="invoice_no"
                                        type="text"
                                        value={data.invoice_no}
                                        onChange={e => setData('invoice_no', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.invoice_no && <div className="text-red-600 text-sm mt-1">{errors.invoice_no}</div>}
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                    <input
                                        id="amount"
                                        name="amount"
                                        type="number"
                                        value={data.amount}
                                        onChange={e => setData('amount', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.amount && <div className="text-red-600 text-sm mt-1">{errors.amount}</div>}
                                </div>

                                <div>
                                    <label htmlFor="balance" className="block text-sm font-medium text-gray-700">Balance</label>
                                    <input
                                        id="balance"
                                        name="balance"
                                        type="number"
                                        value={data.balance}
                                        onChange={e => setData('balance', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.balance && <div className="text-red-600 text-sm mt-1">{errors.balance}</div>}
                                </div>

                                <div>
                                    <label htmlFor="invoice_date" className="block text-sm font-medium text-gray-700">Invoice Date</label>
                                    <input
                                        id="invoice_date"
                                        name="invoice_date"
                                        type="date"
                                        value={data.invoice_date}
                                        onChange={e => setData('invoice_date', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.invoice_date && <div className="text-red-600 text-sm mt-1">{errors.invoice_date}</div>}
                                </div>

                                <div>
                                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input
                                        id="due_date"
                                        name="due_date"
                                        type="date"
                                        value={data.due_date}
                                        onChange={e => setData('due_date', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.due_date && <div className="text-red-600 text-sm mt-1">{errors.due_date}</div>}
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    <Link
                                        href="/admin/accounts-receivable"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-60"
                                        disabled={processing}
                                    >
                                        {processing ? 'Creating...' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default CreateAccountsReceivable;
