import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

const ClientsIndex = () => {
    const { clients = [] } = usePage().props as { clients?: any[] };
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Clients</h1>
                        <Link
                            href="/admin/clients/create"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            + New Client
                        </Link>
                    </div>
                    <div className="bg-white rounded shadow p-4">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Phone</th>
                                    <th className="px-4 py-2">Address</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients && clients.length > 0 ? (
                                    clients.map((client) => (
                                        <tr key={client.id} className="border-t">
                                            <td className="px-4 py-2">{client.name}</td>
                                            <td className="px-4 py-2">{client.email}</td>
                                            <td className="px-4 py-2">{client.phone}</td>
                                            <td className="px-4 py-2">{client.address}</td>
                                            <td className="px-4 py-2 space-x-2">
                                                <Link href={`/admin/clients/${client.id}`} className="text-blue-600 hover:underline">View</Link>
                                                <Link href={`/admin/clients/${client.id}/edit`} className="text-yellow-600 hover:underline">Edit</Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this client?')) {
                                                            router.delete(`/admin/clients/${client.id}`);
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
                                        <td colSpan={5} className="text-center py-4">No clients found.</td>
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

export default ClientsIndex;
