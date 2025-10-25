import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import React from 'react';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Clients', href: '/admin/clients' },
    { title: 'Create Client', href: '#' },
];

const CreateClient = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/clients', {
            onFinish: () => {},
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Panel */}
                    <div className="bg-card shadow rounded-xl p-6 md:col-span-1 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-1">Create Client</h2>
                            <p className="text-gray-600 text-sm">Add a new client and their contact details.</p>
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <p className="font-medium text-gray-700 text-sm">Quick Tips:</p>
                            <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                                <li>Provide a full name for the client.</li>
                                <li>Add a contact email and phone number.</li>
                                <li>Include address details to help with billing or visits.</li>
                            </ul>
                        </div>

                        <div className="pt-4">
                            <a
                                href="/admin/clients"
                                className="w-full inline-block text-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                            >
                                Back to Clients
                            </a>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="md:col-span-2 bg-card shadow rounded-xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Client Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                        />
                                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                        />
                                        {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                        />
                                        {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <a href="/admin/clients" className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-5 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90 transition ${
                                        processing ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {processing ? 'Creating...' : 'Create Client'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CreateClient;
