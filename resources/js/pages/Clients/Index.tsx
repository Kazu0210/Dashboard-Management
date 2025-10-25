import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Clients', href: '/admin/clients' },
];

type Client = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at?: string;
    updated_at?: string;
};

const ClientsIndex = () => {
    const { clients: clientsRaw } = usePage().props;
    const clients: Client[] = Array.isArray(clientsRaw) ? clientsRaw : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Clients</h2>
                        <p className="text-sm text-gray-500">Manage your clients and their contact information.</p>
                    </div>
                    <Link
                        href={`/admin/clients/create`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
                    >
                        <span>＋</span> Create New Client
                    </Link>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-5 py-3 text-left">Name</th>
                                    <th className="px-5 py-3 text-left">Email</th>
                                    <th className="px-5 py-3 text-left">Phone</th>
                                    <th className="px-5 py-3 text-left">Address</th>
                                    <th className="px-5 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.length > 0 ? (
                                    clients.map((client) => (
                                        <tr key={client.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3 font-medium text-gray-800">{client.name}</td>
                                            <td className="px-5 py-3 text-gray-600">{client.email || '-'}</td>
                                            <td className="px-5 py-3 text-gray-600">{client.phone || '-'}</td>
                                            <td className="px-5 py-3 text-gray-600">{client.address || '-'}</td>
                                            <td className="px-5 py-3">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/admin/clients/${client.id}/edit`}
                                                        className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <form
                                                        method="POST"
                                                        action={`/admin/clients/${client.id}`}
                                                        onSubmit={(e) => {
                                                            if (!confirm('Are you sure you want to delete this client?')) e.preventDefault();
                                                        }}
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="_token"
                                                            value={
                                                                (typeof window !== 'undefined' && (window as any).Laravel && (window as any).Laravel.csrfToken) ||
                                                                (typeof document !== 'undefined' &&
                                                                    document.querySelector('meta[name=csrf-token]')
                                                                        ?.getAttribute('content')) ||
                                                                ''
                                                            }
                                                        />
                                                        <input type="hidden" name="_method" value="DELETE" />
                                                        <button
                                                            type="submit"
                                                            className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs transition-all"
                                                        >
                                                            Delete
                                                        </button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-400 text-sm">
                                            No clients found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ClientsIndex;
