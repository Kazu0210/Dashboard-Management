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
    name: string;
    status: string;
    start_date: string;
    end_date: string;
    manager: string;
    budget: string;
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
        hour12: false
    });
}

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
        name: project.name || '',
        status: project.status || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        manager: project.manager || '',
        budget: project.budget || '',
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
                        <h2 className="text-2xl font-semibold text-gray-800">Edit Project</h2>
                        <p className="text-sm text-gray-500">Modify project details and update information.</p>
                    </div>
                    <Link
                        href={`/admin/projects`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-all"
                    >
                        ← Back to Projects
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Section */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6"
                    >
                        {/* Section Title */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">Project Details</h3>
                            <p className="text-sm text-gray-500 mb-4">Basic information about this project.</p>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                required
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                value={form.status}
                                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                required
                            >
                                <option value="">Select status</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="on-hold">On Hold</option>
                            </select>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                    value={form.start_date}
                                    onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                    value={form.end_date}
                                    onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                                    required
                                />
                            </div>
                        </div>

                        {/* Manager */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Manager</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                value={form.manager}
                                onChange={e => setForm(f => ({ ...f, manager: e.target.value }))}
                                required
                            />
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₱)</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                                value={form.budget}
                                onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                                required
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
                            >
                                Update Project
                            </button>
                        </div>
                    </form>

                    {/* Sidebar Summary */}
                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">Project Summary</h4>
                        <p className="text-sm text-gray-500">
                            Quick information overview of this project.
                        </p>

                        <div className="divide-y divide-gray-100">
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Project ID</p>
                                <p className="text-sm font-medium text-gray-800">{project.id}</p>
                            </div>
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Created At</p>
                                <p className="text-sm font-medium text-gray-800">{formatDateTime(project.created_at)}</p>
                            </div>
                            <div className="py-3">
                                <p className="text-xs text-gray-500">Last Updated</p>
                                <p className="text-sm font-medium text-gray-800">{formatDateTime(project.updated_at)}</p>
                            </div>

                            <div className="py-3">
                                <p className="text-xs text-gray-500">Current Status</p>
                                <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        form.status === 'Completed'
                                            ? 'bg-green-100 text-green-700'
                                            : form.status === 'Ongoing'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-yellow-100 text-yellow-700'
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

export default EditProject;
