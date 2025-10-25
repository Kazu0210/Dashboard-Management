
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';


const ShowAccountsReceivable = ({ record }: { record: any }) => {
    return (
        <AppLayout>
            <Head title="Account Receivable Details" />
            <div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900">Account Receivable Details</h2>
                        <p className="text-lg mt-1 text-neutral-700">View details for this record</p>
                    </div>
                </div>
                <div className="bg-green-50 rounded-lg p-6 shadow max-w-2xl mx-auto w-full">
                    <div className="space-y-4 text-base">
                        <div><span className="font-semibold">Invoice No:</span> {record.invoice_no}</div>
                        <div><span className="font-semibold">Client:</span> {record.client_name || record.client_id}</div>
                        <div><span className="font-semibold">Amount:</span> {record.amount}</div>
                        <div><span className="font-semibold">Balance:</span> {record.balance}</div>
                        <div><span className="font-semibold">Invoice Date:</span> {record.invoice_date}</div>
                        <div><span className="font-semibold">Due Date:</span> {record.due_date}</div>
                        <div><span className="font-semibold">Status:</span> <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${record.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{record.status}</span></div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Link href="/admin/accounts-receivable" className="inline-flex items-center px-4 py-2 rounded bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors">Back</Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowAccountsReceivable;
