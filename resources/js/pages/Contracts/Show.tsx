import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show() {
    const { contract = null } = usePage().props as any;

    if (!contract) return null;

    const formatDateOnly = (v: any) => {
        if (!v) return '—';
        if (typeof v === 'string') {
            if (v.includes('T')) return v.split('T')[0];
            if (v.includes(' ')) return v.split(' ')[0];
            return v;
        }
        return String(v);
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Head title={`Contract ${contract.contract_number}`} />
                    <div className="w-full max-w-2xl mt-8 p-6 bg-white rounded shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-semibold">Contract {contract.contract_number}</h1>
                            <div className="flex gap-2">
                                <Link href="/admin/contracts" className="inline-flex items-center gap-2 border border-gray-200 px-3 py-2 rounded">Back</Link>
                                <Link href={`/admin/contracts/${contract.id}/edit`} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded">Edit</Link>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Project Name</dt>
                                <dd className="mt-1 text-sm text-gray-900">{contract.project_name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Client</dt>
                                <dd className="mt-1 text-sm text-gray-900">{contract.client}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Contract Price</dt>
                                <dd className="mt-1 text-sm text-gray-900">{contract.contract_price}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                <dd className="mt-1 text-sm text-gray-900">{contract.status ?? '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                                <dd className="mt-1 text-sm text-gray-900">{formatDateOnly(contract.start_date)}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">End Date</dt>
                                <dd className="mt-1 text-sm text-gray-900">{formatDateOnly(contract.end_date)}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                                <dd className="mt-1 text-sm text-gray-900">{contract.notes ?? '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Created By</dt>
                                <dd className="mt-1 text-sm text-gray-900">{contract.creator?.name ?? contract.created_by}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
