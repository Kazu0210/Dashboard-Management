import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Link, usePage } from '@inertiajs/react';

const ShowAccountsReceivable = ({ record }: { record: any }) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
                        <h1 className="text-2xl font-bold mb-6">Account Receivable Details</h1>
                        <div className="space-y-2">
                            <div><strong>Invoice No:</strong> {record.invoice_no}</div>
                            <div><strong>Client ID:</strong> {record.client_id}</div>
                            <div><strong>Amount:</strong> {record.amount}</div>
                            <div><strong>Balance:</strong> {record.balance}</div>
                            <div><strong>Invoice Date:</strong> {record.invoice_date}</div>
                            <div><strong>Due Date:</strong> {record.due_date}</div>
                            <div><strong>Status:</strong> {record.status}</div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Link href="/admin/accounts-receivable" className="btn btn-secondary">Back</Link>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default ShowAccountsReceivable;
