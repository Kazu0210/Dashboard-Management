
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';

const AccountsReceivablePage = () => {
    const { records = [] } = usePage().props as { records?: any[] };
    return (
        <AppLayout>
            <Head title="Accounts Receivable" />
            <div className="space-y-6 p-4 bg-background min-h-screen">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-primary">Accounts Receivable</h2>
                    <Link
                        href="/admin/accounts-receivable/create"
                        className="inline-flex items-center px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors"
                    >
                        + New Record
                    </Link>
                </div>
                <div className="rounded-xl shadow bg-card p-0 overflow-x-auto border border-border w-full max-w-none">
                    <table className="w-full table-auto text-left">
                        <thead className="bg-primary text-primary-foreground">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Invoice No</th>
                                <th className="px-6 py-3 font-semibold">Client ID</th>
                                <th className="px-6 py-3 font-semibold">Amount</th>
                                <th className="px-6 py-3 font-semibold">Balance</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records && records.length > 0 ? (
                                records.map((rec) => (
                                    <tr key={rec.id} className="border-t border-border hover:bg-muted transition-colors">
                                        <td className="px-6 py-3">{rec.invoice_no}</td>
                                        <td className="px-6 py-3">{rec.client_id}</td>
                                        <td className="px-6 py-3">{rec.amount}</td>
                                        <td className="px-6 py-3">{rec.balance}</td>
                                        <td className="px-6 py-3">
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${rec.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{rec.status}</span>
                                        </td>
                                        <td className="px-6 py-3 space-x-2">
                                            <Link href={`/admin/accounts-receivable/${rec.id}`} className="text-primary hover:underline">View</Link>
                                            <Link href={`/admin/accounts-receivable/${rec.id}/edit`} className="text-secondary hover:underline">Edit</Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this record?')) {
                                                        router.delete(`/admin/accounts-receivable/${rec.id}`);
                                                    }
                                                }}
                                                className="text-red-600 hover:underline ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-muted-foreground">No records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default AccountsReceivablePage;
