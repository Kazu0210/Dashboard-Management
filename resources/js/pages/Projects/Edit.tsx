import AppLayout from '@/layouts/app-layout';
import { usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Collections', href: '/admin/collections' },
    { title: 'Edit Collection', href: '#' },
];

type Project = {
    id: number;
    name: string;
};

type Collection = {
    id: number;
    project_id: number;
    billing: string;
    period: string;
    billed_amount: string;
    collected: string;
    balance: string;
    status: string;
    created_at: string;
    updated_at: string;
};

function formatDateTime(iso: string) {
    if (!iso) return '';
    const date = new Date(iso);
    if (isNaN(date.getTime())) return iso;
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}

const EditCollection = () => {
    const props = usePage().props as { collection?: Collection; projects?: Project[] };
    const collection = props.collection;
    const projects = props.projects || [];

    if (!collection) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-gray-500 text-lg">Loading collection data...</div>
                </div>
            </AppLayout>
        );
    }

    const [form, setForm] = useState({
        project_id: collection.project_id || '',
        billing: collection.billing || '',
        period: collection.period || '',
        billed_amount: collection.billed_amount || '',
        collected: collection.collected || '',
        balance: collection.balance || '',
        status: collection.status || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/admin/collections/${collection.id}`, form);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Edit Collection</h2>
                        <p className="text-sm text-gray-500">
                            Update billing and payment information for this collection.
                        </p>
                    </div>
                    <Link
                        href={`/admin/collections`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-all"
                    >
                        ← Back to Collections
                    </Link>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6"
                    >
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">Collection Details</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Modify billing and payment information.
                            </p>
                        </div>

                        {/* Project */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                            <select
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.project_id}
                                onChange={(e) => setForm(f => ({ ...f, project_id: e.target.value }))}
                                required
                            >
                                <option value="">Select project</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Billing */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.billing}
                                onChange={(e) => setForm(f => ({ ...f, billing: e.target.value }))}
                                required
                            />
                        </div>

                        {/* Period */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                            <input
                                type="text"
                                placeholder="e.g. Jan - Mar 2025"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.period}
                                onChange={(e) => setForm(f => ({ ...f, period: e.target.value }))}
                                required
                            />
                        </div>

                        {/* Amounts */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Billed Amount (₱)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.billed_amount}
                                    onChange={(e) => setForm(f => ({ ...f, billed_amount: e.target.value }))}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Collected (₱)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.collected}
                                    onChange={(e) => setForm(f => ({ ...f, collected: e.target.value }))}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Balance (₱)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.balance}
                                    onChange={(e) => setForm(f => ({ ...f, balance: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.status}
                                onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                                required
                            >
                                <option value="">Select status</option>
                                <option value="pending">Pending</option>
                                <option value="partial">Partial</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
                            >
                                Update Collection
                            </button>
                        </div>
                    </form>

                    {/* Sidebar */}
                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">Collection Summary</h4>
                        <p className="text-sm text-gray-500">Overview of this record.</p>

                        <div className="divide-y divide-gray-100">
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Collection ID</p>
                                <p className="text-sm font-medium text-gray-800">{collection.id}</p>
                            </div>
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Created At</p>
                                <p className="text-sm font-medium text-gray-800">{formatDateTime(collection.created_at)}</p>
                            </div>
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Last Updated</p>
                                <p className="text-sm font-medium text-gray-800">{formatDateTime(collection.updated_at)}</p>
                            </div>
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Status</p>
                                <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        form.status === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : form.status === 'partial'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {form.status || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditCollection;
