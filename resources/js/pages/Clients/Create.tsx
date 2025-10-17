import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

const CreateClient = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/clients');
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
                        <h1 className="text-2xl font-bold mb-6">Create Client</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium">Name</label>
                                <input type="text" className="input" value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Email</label>
                                <input type="email" className="input" value={data.email} onChange={e => setData('email', e.target.value)} />
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Phone</label>
                                <input type="text" className="input" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                                {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Address</label>
                                <input type="text" className="input" value={data.address} onChange={e => setData('address', e.target.value)} />
                                {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Link href="/admin/clients" className="btn btn-secondary">Cancel</Link>
                                <button type="submit" className="btn btn-primary" disabled={processing}>Create</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default CreateClient;
