import AppLayout from '@/layouts/app-layout';
import { useForm, Link } from '@inertiajs/react';
import React from 'react';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Clients', href: '/admin/clients' },
    { title: 'Edit Client', href: '#' },
];

type Client = {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at?: string;
    updated_at?: string;
};

const EditClient = ({ client }: { client: Client }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/clients/${client.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Edit Client</h2>
                        <p className="text-sm text-gray-500">Modify client details and contact information.</p>
                    </div>
                    <Link
                        href={`/admin/clients`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-all"
                    >
                        ← Back to Clients
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6"
                    >
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">Client Details</h3>
                            <p className="text-sm text-gray-500 mb-4">Update the client's basic information.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                            />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                />
                                {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                />
                                {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
                            >
                                Update Client
                            </button>
                        </div>
                    </form>

                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">Client Summary</h4>
                        <p className="text-sm text-gray-500">Quick information overview of this client.</p>

                        <div className="divide-y divide-gray-100">
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Client ID</p>
                                <p className="text-sm font-medium text-gray-800">{client.id}</p>
                            </div>
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Created At</p>
                                <p className="text-sm font-medium text-gray-800">{client.created_at || '-'}</p>
                            </div>
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Last Updated</p>
                                <p className="text-sm font-medium text-gray-800">{client.updated_at || '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditClient;
