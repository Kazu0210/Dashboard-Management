import AppLayout from '@/layouts/app-layout';
import { usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/admin/projects' },
    { title: 'Edit Project', href: '#' },
];

type Project = {
    id: number;
    project_name: string;
    client: string;
    location: string;
    contract_amount: string;
    duration: string;
    status: string;
    personnel: number;
    payroll: string;
    supplies: string;
    billing_status: string;
    collected: string;
    net_income: string;
    created_at: string;
    updated_at: string;
};

const EditProject = () => {
    const props = usePage().props as { project?: Project };
    const project = props.project;

    if (!project) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-gray-500 text-lg">Loading project data...</div>
                </div>
            </AppLayout>
        );
    }

    const [form, setForm] = useState({
        project_name: project.project_name || '',
        client: project.client || '',
        location: project.location || '',
        contract_amount: project.contract_amount || '',
        duration: project.duration || '',
        status: project.status || '',
        personnel: project.personnel || 0,
        payroll: project.payroll || '',
        supplies: project.supplies || '',
        billing_status: project.billing_status || '',
        collected: project.collected || '',
        net_income: project.net_income || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/admin/projects/${project.id}`, form);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-900">Edit Project</h2>
                        <p className="text-sm text-gray-500">
                            Update project information and financial details.
                        </p>
                    </div>
                    <Link
                        href={`/admin/projects`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-all"
                    >
                        ← Back to Projects
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.project_name}
                                onChange={e => setForm(f => ({ ...f, project_name: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.client}
                                onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.location}
                                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Amount (₱)</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.contract_amount}
                                onChange={e => setForm(f => ({ ...f, contract_amount: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.duration}
                                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.status}
                                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Personnel</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.personnel}
                                onChange={e => setForm(f => ({ ...f, personnel: Number(e.target.value) }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payroll (₱)</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.payroll}
                                onChange={e => setForm(f => ({ ...f, payroll: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Supplies (₱)</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.supplies}
                                onChange={e => setForm(f => ({ ...f, supplies: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Status</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.billing_status}
                                onChange={e => setForm(f => ({ ...f, billing_status: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Collected (₱)</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.collected}
                                onChange={e => setForm(f => ({ ...f, collected: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Net Income (₱)</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                value={form.net_income}
                                onChange={e => setForm(f => ({ ...f, net_income: e.target.value }))}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
                        >
                            Update Project
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditProject;
