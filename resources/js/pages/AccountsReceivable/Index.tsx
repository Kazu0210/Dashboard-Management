

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Link, usePage, router } from '@inertiajs/react';
import { FilePlus2 } from 'lucide-react';


const AccountsReceivablePage = () => {
    const { records = [] } = usePage().props as { records?: any[] };
    return (
        <AppLayout>
            <div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900">Accounts Receivable</h2>
                        <p className="text-lg mt-1 text-neutral-700">Manage accounts receivable records here</p>
                    </div>
                    <div>
                        <Button asChild variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                            <Link href="/admin/accounts-receivable/create" prefetch>
                                <FilePlus2 />
                                <span>New Record</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 shadow">
                    {records && records.length > 0 ? (
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 px-3 font-semibold text-green-900">Invoice No</th>
                                    <th className="text-left py-2 px-3 font-semibold text-green-900">Client ID</th>
                                    <th className="text-left py-2 px-3 font-semibold text-green-900">Amount</th>
                                    <th className="text-left py-2 px-3 font-semibold text-green-900">Balance</th>
                                    <th className="text-left py-2 px-3 font-semibold text-green-900">Status</th>
                                    <th className="text-left py-2 px-3 font-semibold text-green-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((rec) => (
                                    <tr key={rec.id} className="border-t border-green-100">
                                        <td className="py-2 px-3">{rec.invoice_no}</td>
                                        <td className="py-2 px-3">{rec.client_id}</td>
                                        <td className="py-2 px-3">{rec.amount}</td>
                                        <td className="py-2 px-3">{rec.balance}</td>
                                        <td className="py-2 px-3">
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${rec.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{rec.status}</span>
                                        </td>
                                        <td className="py-2 px-3">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/admin/accounts-receivable/${rec.id}`}
                                                    className="text-green-700 hover:underline"
                                                    title="View"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/accounts-receivable/${rec.id}/edit`}
                                                    className="text-yellow-600 hover:underline"
                                                    title="Edit"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:underline"
                                                    title="Delete"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this record?')) {
                                                            router.delete(`/admin/accounts-receivable/${rec.id}`);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-sm text-green-900">No records found.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default AccountsReceivablePage;
