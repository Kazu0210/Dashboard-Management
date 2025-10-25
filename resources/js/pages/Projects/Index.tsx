import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';

const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/admin/projects" },
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

const Projects = () => {
    const { projects: projectsRaw } = usePage().props;
    const projects: Project[] = Array.isArray(projectsRaw) ? projectsRaw : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
                        <p className="text-sm text-gray-500">
                            Manage and track ongoing company projects.
                        </p>
                    </div>
                    <Link
                        href={`/admin/projects/create`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
                    >
                        <span>＋</span> Create New Project
                    </Link>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-5 py-3 text-left">Project Name</th>
                                    <th className="px-5 py-3 text-left">Status</th>
                                    <th className="px-5 py-3 text-left">Start Date</th>
                                    <th className="px-5 py-3 text-left">End Date</th>
                                    <th className="px-5 py-3 text-left">Manager</th>
                                    <th className="px-5 py-3 text-left">Budget</th>
                                    <th className="px-5 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length > 0 ? (
                                    projects.map((project) => (
                                        <tr
                                            key={project.id}
                                            className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-5 py-3 font-medium text-gray-800">{project.name}</td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        project.status === "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : project.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-gray-600">{project.start_date}</td>
                                            <td className="px-5 py-3 text-gray-600">{project.end_date}</td>
                                            <td className="px-5 py-3 text-gray-600">{project.manager}</td>
                                            <td className="px-5 py-3 text-gray-600">₱{project.budget}</td>
                                            <td className="px-5 py-3">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/admin/projects/${project.id}/edit`}
                                                        className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <form
                                                        method="POST"
                                                        action={`/admin/projects/${project.id}`}
                                                        onSubmit={(e) => {
                                                            if (
                                                                !confirm(
                                                                    'Are you sure you want to delete this project?'
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
                                            No projects found.
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

export default Projects;
