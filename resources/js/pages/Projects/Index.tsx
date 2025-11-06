
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserMinus, Wallet, Pencil, Trash2, Upload, Download, Eye, Briefcase, Calculator } from 'lucide-react';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';


const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/admin/projects' },
];

type Project = {
    id: number;
    project_number: string;
    project_name: string;
    year: number;
    fte: number;
    average_rate_per_employee: number;
    bid_price_one_year: number;
    half_year_bid_price: number;
    status: string;
    monthly_12: number;
    withholding_tax: number;
    vat: number;
    agency_fee: number;
    supplies: number;
    equipment: number;
    salary_expenses_year: number;
    thirteenth_month_estimated: number;
    silp_estimated: number;
    sss_contribution: number;
    philhealth_contribution: number;
    pagibig_contribution: number;
    ecc: number;
    actual_supplies_cost_year: number;
    actual_supplies_cost_jan_june: number;
    actual_equipment_cost_year: number;
    profit_margin_10_percent: number;
    total_supplies_equipment: number;
    vat_savings: number;
    cost_of_sales: number;
    total_service_income: number;
    admin_cost_8000: number;
    total: number;
    created_at: string;
    updated_at: string;
};

export default function Index() {

    const { projects: projectsRaw, project_count, completed_count, ongoing_count, total_bid_amount, total_service_income } = usePage().props;
    const projects: Project[] = Array.isArray(projectsRaw) ? projectsRaw : [];

    // Search state
    const [search, setSearch] = React.useState('');
    const filteredProjects = React.useMemo(() => {
        if (!search.trim()) return projects;
        const lower = search.toLowerCase();
        return projects.filter(p =>
            p.project_name.toLowerCase().includes(lower) ||
            p.project_number.toLowerCase().includes(lower) ||
            p.status.toLowerCase().includes(lower) ||
            p.year.toString().includes(lower)
        );
    }, [search, projects]);

    // Export all projects as Excel using template columns
    const handleExportAll = async () => {
        try {
            const response = await fetch('/admin/projects/export', {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
            });
            if (!response.ok) throw new Error('Export failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // Try to get filename from Content-Disposition header
            const disposition = response.headers.get('Content-Disposition');
            let fileName = 'Projects_Export.xlsx';
            if (disposition && disposition.indexOf('filename=') !== -1) {
                const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (match && match[1]) {
                    fileName = match[1].replace(/['"]/g, '');
                }
            }
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            alert('Failed to export data');
        }
    };

    // Import state
    const [importing, setImporting] = React.useState(false);
    const [importError, setImportError] = React.useState<string|null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        setImportError(null);
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImporting(true);
        setImportError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            // Add CSRF token if needed
            const csrf = (typeof window !== 'undefined' && (window as any).Laravel?.csrfToken) ||
                (typeof document !== 'undefined' && document.querySelector('meta[name=csrf-token]')?.getAttribute('content')) || '';
            formData.append('_token', csrf);
            const response = await fetch('/admin/projects/import', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Import failed');
            // Optionally, refresh the page or show a success message
            window.location.reload();
        } catch (err: any) {
            setImportError(err.message || 'Import failed');
        } finally {
            setImporting(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    // DataTable columns
    const columns: TableColumn<Project>[] = [
        {
            name: 'Project Number',
            selector: row => row.project_number,
            sortable: true,
            width: '130px',
        },
        {
            name: 'Project Name',
            selector: row => row.project_name,
            sortable: true,
            wrap: true,
            width: '200px',
        },
        {
            name: 'Year',
            selector: row => row.year.toString(),
            sortable: true,
            width: '80px',
        },
        {
            name: 'FTE',
            selector: row => row.fte && !isNaN(Number(row.fte)) ? Number(row.fte).toFixed(2) : '—',
            sortable: true,
            width: '80px',
        },
        {
            name: 'Bid Price (1 Year)',
            selector: row => row.bid_price_one_year && !isNaN(Number(row.bid_price_one_year)) ? `₱${Number(row.bid_price_one_year).toLocaleString()}` : '—',
            sortable: true,
            width: '150px',
        },
        {
            name: 'Status',
            cell: row => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    row.status === 'completed' ? 'bg-green-100 text-green-700' :
                    row.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'}`}>{row.status}</span>
            ),
            sortable: true,
            width: '100px',
        },
        {
            name: 'Total Service Income',
            selector: row => row.total_service_income && !isNaN(Number(row.total_service_income)) ? `₱${Number(row.total_service_income).toLocaleString()}` : '—',
            sortable: true,
            width: '160px',
        },
        {
            name: 'Total',
            selector: row => row.total && !isNaN(Number(row.total)) ? `₱${Number(row.total).toLocaleString()}` : '—',
            sortable: true,
            width: '120px',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/projects/${row.id}`}
                        className="px-3 py-1.5 rounded-md bg-green-500 text-white hover:bg-green-600 text-xs transition-all shadow-sm flex items-center justify-center"
                        title="View"
                    >
                        <Eye size={16} />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
                    {/* Total Projects */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium text-gray-500">Total Projects</CardTitle>
                                    <CardDescription className="text-xs text-gray-400">All projects</CardDescription>
                                </div>
                                <Briefcase className="w-5 h-5 text-blue-500" />
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

                    {/* Total Bid Amount */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium text-gray-500">Total Bid Amount</CardTitle>
                                    <CardDescription className="text-xs text-gray-400">All projects</CardDescription>
                                </div>
                                <Wallet className="w-5 h-5 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <span className="text-3xl font-bold text-gray-800">
                                    {total_bid_amount ? `₱${Number(total_bid_amount).toLocaleString()}` : '—'}
                                </span>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Total Service Income */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium text-gray-500">Total Service Income</CardTitle>
                                    <CardDescription className="text-xs text-gray-400">All projects</CardDescription>
                                </div>
                                <Calculator className="w-5 h-5 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <span className="text-3xl font-bold text-gray-800">
                                    {total_service_income ? `₱${Number(total_service_income).toLocaleString()}` : '—'}
                                </span>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Header Section with Grouped Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900">Projects</h2>
                        <p className="text-gray-500 text-sm mt-1">Monitor and manage all projects.</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <div className="relative group">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-all shadow-md"
                                title="Import"
                                onClick={handleImportClick}
                                disabled={importing}
                            >
                                <Upload size={18} /> {importing ? 'Importing...' : 'Import'}
                            </button>
                            <input
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity z-10">
                                <a
                                    href="/admin/projects/template/download"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                >
                                    Download Excel Import Template
                                </a>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg cursor-pointer"
                                    onClick={handleImportClick}
                                    disabled={importing}
                                >
                                    Import Excel File
                                </button>
                            </div>
                            {importError && (
                                <div className="absolute left-0 mt-2 w-56 bg-red-100 text-red-700 text-xs rounded-lg p-2 z-20 border border-red-300">
                                    {importError}
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer"
                            onClick={handleExportAll}
                            title="Export"
                        >
                            <Download size={18} /> Export
                        </button>
                        <Link
                            href={`/admin/projects/create`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md"
                        >
                            <span className="text-lg">＋</span> Add Project
                        </Link>
                    </div>
                </div>

                {/* Project DataTable with Search */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-2">
                        <input
                            type="text"
                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            placeholder="Search by project name, number, status, or year..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <DataTable
                        columns={columns}
                        data={filteredProjects}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        responsive
                        noDataComponent={<div className="px-6 py-8 text-center text-gray-400 text-sm">No projects found.</div>}
                    />
                </div>
                {/* Pagination removed, handled by DataTable */}
            </div>
        </AppLayout>
    );
}
