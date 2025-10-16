import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

const AccountsReceivablePage = () => {
    const { records = [] } = usePage().props as { records?: any[] };
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Accounts Receivable</h1>
                        <Link
                            href="/admin/accounts-receivable/create"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            + New Record
                        </Link>
                    </div>
                    <div className="bg-white rounded shadow p-4">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Invoice No</th>
                                    <th className="px-4 py-2">Client ID</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Balance</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records && records.length > 0 ? (
                                    records.map((rec) => (
                                        <tr key={rec.id} className="border-t">
                                            <td className="px-4 py-2">{rec.invoice_no}</td>
                                            <td className="px-4 py-2">{rec.client_id}</td>
                                            <td className="px-4 py-2">{rec.amount}</td>
                                            <td className="px-4 py-2">{rec.balance}</td>
                                            <td className="px-4 py-2">{rec.status}</td>
                                            <td className="px-4 py-2 space-x-2">
                                                <Link href={`/admin/accounts-receivable/${rec.id}`} className="text-blue-600 hover:underline">View</Link>
                                                <Link href={`/admin/accounts-receivable/${rec.id}/edit`} className="text-yellow-600 hover:underline">Edit</Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this record?')) {
                                                            router.delete(`/accounts-receivable/${rec.id}`);
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
                                        <td colSpan={6} className="text-center py-4">No records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default AccountsReceivablePage;
