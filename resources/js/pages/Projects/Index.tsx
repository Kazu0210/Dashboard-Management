
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserMinus, Wallet, Pencil, Trash2, Upload, Download } from 'lucide-react';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';


const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/admin/projects' },
];

type Project = {
    id: number;
    project_name: string;
    client: string;
    location: string;
    contract_amount: number;
    duration: string;
    status: string;
    personnel: number;
    billing_status: string;
    collected: number;
    net_income: number;
    created_at: string;
    updated_at: string;
};

export default function Index() {
    const { projects: projectsRaw, project_count, completed_count, ongoing_count, total_billed, total_collected } = usePage().props;
    const projects: Project[] = Array.isArray(projectsRaw) ? projectsRaw : [];

    // Search state
    const [search, setSearch] = React.useState('');
    const filteredProjects = React.useMemo(() => {
        if (!search.trim()) return projects;
        const lower = search.toLowerCase();
        return projects.filter(p =>
            p.project_name.toLowerCase().includes(lower) ||
            p.client.toLowerCase().includes(lower) ||
            p.location.toLowerCase().includes(lower) ||
            p.status.toLowerCase().includes(lower)
        );
    }, [search, projects]);

    // DataTable columns
    const columns: TableColumn<Project>[] = [
        {
            name: 'Project',
            selector: row => row.project_name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Client',
            selector: row => row.client,
            sortable: true,
        },
        {
            name: 'Contract Amount',
            selector: row => `₱${Number(row.contract_amount).toLocaleString()}`,
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    row.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'}`}>{row.status}</span>
            ),
            sortable: true,
        },
        {
            name: 'Billing Status',
            selector: row => row.billing_status,
            sortable: true,
        },
        {
            name: 'Collected',
            selector: row => `₱${Number(row.collected).toLocaleString()}`,
            sortable: true,
        },
        {
            name: 'Net Income',
            selector: row => `₱${Number(row.net_income).toLocaleString()}`,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/projects/${row.id}`}
                        className="px-3 py-1.5 rounded-md bg-gray-500 text-white hover:bg-gray-600 text-xs transition-all shadow-sm flex items-center justify-center"
                        title="View"
                    >
                        View
                    </Link>
                    <Link
                        href={`/admin/projects/${row.id}/edit`}
                        className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all shadow-sm flex items-center justify-center"
                        title="Edit"
                    >
                        <Pencil size={16} />
                    </Link>
                    <form
                        method="POST"
                        action={`/admin/projects/${row.id}`}
                        onSubmit={e => {
                            if (!confirm('Are you sure you want to delete this project?')) e.preventDefault();
                        }}
                    >
                        <input
                            type="hidden"
                            name="_token"
                            value={
                                (typeof window !== 'undefined' && (window as any).Laravel?.csrfToken) ||
                                (typeof document !== 'undefined' && document.querySelector('meta[name=csrf-token]')?.getAttribute('content')) ||
                                ''
                            }
                        />
                        <input type="hidden" name="_method" value="DELETE" />
                        <button
                            type="submit"
                            className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs transition-all shadow-sm flex items-center justify-center"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </form>
                </div>
            ),
            ignoreRowClick: true,
        },
    ];

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
            <Head title="Projects" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
                    {/* Total Projects */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium text-gray-500">Total Projects</CardTitle>
                                    <CardDescription className="text-xs text-gray-400">All projects</CardDescription>
                                </div>
                                <Users className="w-5 h-5 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <span className="text-4xl font-bold text-gray-800">{String(project_count)}</span>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Completed */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
                                    <CardDescription className="text-xs text-gray-400">Finished projects</CardDescription>
                                </div>
                                <UserPlus className="w-5 h-5 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <span className="text-4xl font-bold text-gray-800">{String(completed_count)}</span>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Ongoing */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium text-gray-500">Ongoing</CardTitle>
                                    <CardDescription className="text-xs text-gray-400">Active projects</CardDescription>
                                </div>
                                <UserMinus className="w-5 h-5 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <span className="text-4xl font-bold text-gray-800">{String(ongoing_count)}</span>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Total Billed */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium text-gray-500">Total Billed</CardTitle>
                                    <CardDescription className="text-xs text-gray-400">All time</CardDescription>
                                </div>
                                <Wallet className="w-5 h-5 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <span className="text-3xl font-bold text-gray-800">
                                    {total_billed ? `₱${Number(total_billed).toLocaleString()}` : '—'}
                                </span>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900">Projects</h2>
                        <p className="text-gray-500 text-sm mt-1">Monitor and manage all projects.</p>
                    </div>
                    <Link
                        href={`/admin/projects/create`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md"
                    >
                        <span className="text-lg">＋</span> Add Project
                    </Link>
                </div>

                {/* Project DataTable with Search */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-2">
                        <input
                            type="text"
                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            placeholder="Search projects..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer"
                                disabled
                                title="Import"
                            >
                                <Upload size={18} /> Import
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer"
                                disabled
                                title="Export"
                            >
                                <Download size={18} /> Export
                            </button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={filteredProjects}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        noDataComponent={<div className="px-6 py-8 text-center text-gray-400 text-sm">No projects found.</div>}
                    />
                </div>
                {/* Pagination removed, handled by DataTable */}
            </div>
        </AppLayout>
    );
}
