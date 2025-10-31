import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';

const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/admin/projects" },
];

type Collection = {
    id: number;
    project: string;
    billing_period: string;
    billed_amount: string;
    collected: string;
    balance: string;
    status: string;
    created_at: string;
    updated_at: string;
};

const Collections = () => {
    const { collections: collectionsRaw } = usePage().props;
    const collections: Collection[] = Array.isArray(collectionsRaw) ? collectionsRaw : [];

    const exportCollection = async (id: number) => {
        try {
            const response = await fetch(`/api/projects/${id}/export`);
            if (!response.ok) throw new Error('Export failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `project-${id}-export.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export data');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">Project Monitoring</h2>
                            <p className="text-base text-gray-500 mt-1">
                                View, monitor, and manage all projects in one place. Stay updated on status, finances, and progress.
                            </p>
                        </div>
                        <Link
                            href={`/admin/projects/create`}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-base font-semibold hover:bg-blue-700 transition-all shadow-sm"
                        >
                            <span className="text-lg">＋</span> New Project
                        </Link>
                    </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-5 py-3 text-left">Project</th>
                                    <th className="px-5 py-3 text-left">Billing Period</th>
                                    <th className="px-5 py-3 text-left">Billed Amount</th>
                                    <th className="px-5 py-3 text-left">Collected</th>
                                    <th className="px-5 py-3 text-left">Balance</th>
                                    <th className="px-5 py-3 text-left">Status</th>
                                    <th className="px-5 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {collections.length > 0 ? (
                                    collections.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-5 py-3 font-medium text-gray-800">
                                                {item.project}
                                            </td>
                                            <td className="px-5 py-3 text-gray-600">{item.billing_period}</td>
                                            <td className="px-5 py-3 text-gray-600">₱{item.billed_amount}</td>
                                            <td className="px-5 py-3 text-gray-600">₱{item.collected}</td>
                                            <td className="px-5 py-3 text-gray-600">₱{item.balance}</td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        item.status === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : item.status === "Partial"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-600"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/admin/collections/${item.id}/edit`}
                                                        className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => exportCollection(item.id)}
                                                        className="px-3 py-1.5 rounded-md bg-gray-500 text-white hover:bg-gray-600 text-xs transition-all"
                                                    >
                                                        Export
                                                    </button>
                                                    <form
                                                        method="POST"
                                                        action={`/admin/collections/${item.id}`}
                                                        onSubmit={(e) => {
                                                            if (
                                                                !confirm(
                                                                    'Are you sure you want to delete this record?'
                                                                )
                                                            )
                                                                e.preventDefault();
                                                        }}
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="_token"
                                                            value={
                                                                (typeof window !== 'undefined' &&
                                                                    (window as any).Laravel &&
                                                                    (window as any).Laravel.csrfToken) ||
                                                                (typeof document !== 'undefined' &&
                                                                    document
                                                                        .querySelector('meta[name=csrf-token]')
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
                                        <td
                                            colSpan={7}
                                            className="px-6 py-8 text-center text-gray-400 text-sm"
                                        >
                                            No collection records found.
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

export default Collections;
