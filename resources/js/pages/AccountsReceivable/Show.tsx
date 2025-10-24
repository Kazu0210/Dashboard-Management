
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

const ShowAccountsReceivable = ({ record }: { record: any }) => {
    return (
        <AppLayout>
            <Head title="Account Receivable Details" />
            <div className="space-y-6 p-4 bg-background min-h-screen">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-primary mb-1">Account Receivable Details</h2>
                </div>
                <div className="max-w-xl w-full mx-auto">
                    <div className="space-y-2 text-base">
                        <div><span className="font-semibold">Invoice No:</span> {record.invoice_no}</div>
                        <div><span className="font-semibold">Client ID:</span> {record.client_id}</div>
                        <div><span className="font-semibold">Amount:</span> {record.amount}</div>
                        <div><span className="font-semibold">Balance:</span> {record.balance}</div>
                        <div><span className="font-semibold">Invoice Date:</span> {record.invoice_date}</div>
                        <div><span className="font-semibold">Due Date:</span> {record.due_date}</div>
                        <div><span className="font-semibold">Status:</span> {record.status}</div>
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
