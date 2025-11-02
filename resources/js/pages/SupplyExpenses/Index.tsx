import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import { Upload, Download, Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';

export default function SupplyExpensesIndex() {
    const { expenses = { data: [] } } = usePage().props as any;
    const [importing, setImporting] = React.useState(false);
    const [importError, setImportError] = React.useState<string|null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [search, setSearch] = React.useState('');

    const formatDateOnly = (v: any) => {
        if (!v) return '—';
        if (typeof v === 'string') {
            if (v.includes('T')) return v.split('T')[0];
            if (v.includes(' ')) return v.split(' ')[0];
            return v;
        }
        return String(v);
    };

    const handleImportClick = () => {
        setImportError(null);
        fileInputRef.current?.click();
    };

    const handleExportAll = async () => {
        try {
            const response = await fetch('/admin/supply-expenses/export', { method: 'GET' });
            if (!response.ok) throw new Error('Export failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'supply-expenses-export.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            alert('Failed to export supply expenses');
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImporting(true);
        setImportError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const csrf = (typeof window !== 'undefined' && (window as any).Laravel?.csrfToken) ||
                (typeof document !== 'undefined' && document.querySelector('meta[name=csrf-token]')?.getAttribute('content')) || '';
            formData.append('_token', csrf);
            const response = await fetch('/admin/supply-expenses/import', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Import failed');
            window.location.reload();
        } catch (err: any) {
            setImportError(err.message || 'Import failed');
        } finally {
            setImporting(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const exportCollection = async (id: number) => {
        try {
            const response = await fetch(`/api/supply-expenses/${id}/export`);
            if (!response.ok) throw new Error('Export failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `supply-expense-${id}-export.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            alert('Failed to export data');
        }
    };

    const filteredExpenses = React.useMemo(() => {
        if (!search.trim()) return expenses.data;
        const lower = search.toLowerCase();
        return expenses.data.filter((e: any) =>
            (e.category && e.category.toLowerCase().includes(lower)) ||
            (e.description && e.description.toLowerCase().includes(lower)) ||
            (e.creator && e.creator.name && e.creator.name.toLowerCase().includes(lower))
        );
    }, [search, expenses.data]);

    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: 'Supply Expenses', href: '/admin/supply-expenses' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Supply Expenses" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900">Supply Expenses</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage and monitor all supply expenses.</p>
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
                                    href="/admin/supply-expenses/template/download"
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
                            href={`/admin/supply-expenses/create`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md"
                        >
                            <span className="text-lg">＋</span> Add Supply Expense
                        </Link>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-2">
                        <input
                            type="text"
                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            placeholder="Search supply expenses..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredExpenses.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-gray-500 text-center">No supply expenses found.</td>
                                    </tr>
                                )}
                                {filteredExpenses.map((e: any) => (
                                    <tr key={e.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{e.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.description ?? '—'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateOnly(e.expense_date)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.creator ? e.creator.name : '—'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex gap-2 justify-center">
                                                <Link
                                                    href={`/admin/supply-expenses/${e.id}`}
                                                    className="px-3 py-1.5 rounded-md bg-green-500 text-white hover:bg-green-600 text-xs transition-all shadow-sm flex items-center justify-center"
                                                    title="View"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <Link
                                                    href={`/admin/supply-expenses/${e.id}/edit`}
                                                    className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all shadow-sm flex items-center justify-center"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </Link>
                                                                        {/* Export button removed as requested */}
                                                <form
                                                    method="POST"
                                                    action={`/admin/supply-expenses/${e.id}`}
                                                    onSubmit={evt => {
                                                        if (!confirm('Are you sure you want to delete this supply expense?')) evt.preventDefault();
                                                    }}
                                                    className="inline"
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

