
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';


const ShowAccountsReceivable = ({ record }: { record: any }) => {
    return (
        <AppLayout>
            <Head title="Account Receivable Details" />
            <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Account Receivable Details</h2>
                            <p className="text-lg mt-1 text-gray-600">View details for this record</p>
                        </div>
                        <Link href="/admin/accounts-receivable" className="text-sm text-gray-600 hover:underline">Back to list</Link>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-white rounded-lg p-6 shadow w-full">
                            <div className="space-y-4 text-sm text-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500">Invoice No</p>
                                    <p className="font-medium">{record.invoice_no}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Client</p>
                                    <p className="font-medium">{record.client_name ?? record.client_id}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Amount</p>
                                    <p className="font-medium">{record.amount}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Balance</p>
                                    <p className="font-medium">{record.balance}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Invoice Date</p>
                                    <p className="font-medium">{record.invoice_date}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Due Date</p>
                                    <p className="font-medium">{record.due_date}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Status</p>
                                    <p className="font-medium">{record.status}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <Link
                                    href={`/admin/accounts-receivable/${record.id}/edit`}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href="/admin/accounts-receivable"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Back
                                </Link>
                            </div>
                        </div>

                        <aside className="md:col-span-1">
                            <div className="bg-white rounded-lg p-4 shadow">
                                <h3 className="text-lg font-medium text-gray-900">Record Info</h3>
                                <p className="text-sm text-gray-600 mt-2">Metadata for this record.</p>

                                <div className="mt-4 text-sm text-gray-700">
                                    <div className="py-3">
                                        <p className="text-xs text-gray-500">Created At</p>
                                        <p className="font-medium">{record.created_at ? (new Date(record.created_at)).toLocaleString() : '-'}</p>
                                    </div>
                                    <div className="py-3">
                                        <p className="text-xs text-gray-500">Updated At</p>
                                        <p className="font-medium">{record.updated_at ? (new Date(record.updated_at)).toLocaleString() : '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowAccountsReceivable;
