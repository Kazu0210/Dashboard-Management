import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Link } from '@inertiajs/react';

const ShowClient = ({ client }: { client: any }) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
                        <h1 className="text-2xl font-bold mb-6">Client Details</h1>
                        <div className="space-y-2">
                            <div><strong>Name:</strong> {client.name}</div>
                            <div><strong>Email:</strong> {client.email}</div>
                            <div><strong>Phone:</strong> {client.phone}</div>
                            <div><strong>Address:</strong> {client.address}</div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Link href="/admin/clients" className="btn btn-secondary">Back</Link>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default ShowClient;
