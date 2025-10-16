import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contracts',
        href: '#',
    },
];

export default function ContractsIndex() {
    const { contracts = { data: [] } } = usePage().props as any;
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
                    <Head title="Contracts" />
                    <div className="w-full max-w-6xl mt-8 p-6 bg-white rounded shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-semibold">Contracts</h1>
                            <Link href="/admin/contracts/create" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                New Contract
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract #</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                                        <th className="px-6 py-3" />
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {contracts.data.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-4 text-gray-500">No contracts yet.</td>
                                        </tr>
                                    )}

                                    {contracts.data.map((c: any) => (
                                        <tr key={c.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.contract_number}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.project_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.client}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.contract_price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateOnly(c.start_date)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateOnly(c.end_date)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.status ?? '—'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.created_by ?? '—'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={`/admin/contracts/${c.id}`} className="text-indigo-600 hover:underline">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* TODO: pagination controls (contracts.links) */}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
