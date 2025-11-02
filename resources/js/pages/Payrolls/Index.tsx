import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Wallet, Pencil, Trash2, Upload, Download, Eye } from 'lucide-react';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'Payrolls', href: '/admin/payrolls' },
];

type Payroll = {
  id: number;
  employee_name: string;
  pay_period_start: string;
  pay_period_end: string;
  basic_salary: number;
  allowances?: number | null;
  deductions?: number | null;
  net_pay: number;
  status: string;
  paid_at?: string | null;
};

export default function Index() {
  const [importing, setImporting] = React.useState(false);
  const [importError, setImportError] = React.useState<string|null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    setImportError(null);
    fileInputRef.current?.click();
  };

  const handleExportAll = async () => {
    try {
      const response = await fetch('/admin/payrolls/export', { method: 'GET' });
      if (!response.ok) throw new Error('Export failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payrolls-export.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export payrolls');
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
      const response = await fetch('/admin/payrolls/import', {
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

  const { payrolls: payrollsRaw, total_payroll, average_net_pay } = usePage().props;
  const payrolls: Payroll[] = Array.isArray(payrollsRaw) ? payrollsRaw : [];

  const [search, setSearch] = React.useState('');
  const filteredPayrolls = React.useMemo(() => {
    if (!search.trim()) return payrolls;
    const lower = search.toLowerCase();
    return payrolls.filter(payroll =>
      payroll.employee_name.toLowerCase().includes(lower)
    );
  }, [search, payrolls]);

  const columns: TableColumn<Payroll>[] = [
    { name: 'Employee', selector: row => row.employee_name, sortable: true },
    { name: 'Period', selector: row => `${row.pay_period_start} - ${row.pay_period_end}`, sortable: true },
    { name: 'Net Pay', selector: row => `₱${row.net_pay.toLocaleString()}`, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-2">
          <Link href={`/admin/payrolls/${row.id}`} className="px-3 py-1.5 rounded-md bg-green-500 text-white hover:bg-green-600 text-xs transition-all shadow-sm flex items-center justify-center" title="View">
            <Eye size={16} />
          </Link>
          <Link href={`/admin/payrolls/${row.id}/edit`} className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all shadow-sm flex items-center justify-center" title="Edit">
            <Pencil size={16} />
          </Link>
          <form method="POST" action={`/admin/payrolls/${row.id}`} onSubmit={e => { if (!confirm('Are you sure you want to delete this payroll record?')) e.preventDefault(); }}>
            <input type="hidden" name="_token" value={ (typeof window !== 'undefined' && (window as any).Laravel?.csrfToken) || (typeof document !== 'undefined' && document.querySelector('meta[name=csrf-token]')?.getAttribute('content')) || '' } />
            <input type="hidden" name="_method" value="DELETE" />
            <button type="submit" className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs transition-all shadow-sm flex items-center justify-center" title="Delete">
              <Trash2 size={16} />
            </button>
          </form>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Payrolls" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {/* Total Payroll */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-500">Total Payroll</CardTitle>
                  <CardDescription className="text-xs text-gray-400">All Employees</CardDescription>
                </div>
                <Wallet className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold text-gray-800">{total_payroll ? `₱${Number(total_payroll).toLocaleString()}` : '—'}</span>
              </CardContent>
            </Card>
          </motion.div>
          {/* Average Net Pay */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-500">Average Net Pay</CardTitle>
                  <CardDescription className="text-xs text-gray-400">Per Payroll</CardDescription>
                </div>
                <Wallet className="w-5 h-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-gray-800">{average_net_pay ? `₱${Number(average_net_pay).toLocaleString()}` : '—'}</span>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        {/* Header Section with Grouped Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Payrolls</h2>
            <p className="text-gray-500 text-sm mt-1">Manage and monitor all payroll records.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative group">
              <button type="button" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-all shadow-md" title="Import" onClick={handleImportClick} disabled={importing}>
                <Upload size={18} /> {importing ? 'Importing...' : 'Import'}
              </button>
              <input type="file" accept=".xlsx,.xls,.csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity z-10">
                <a href="/admin/payrolls/template/download" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg">Download Excel Import Template</a>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg cursor-pointer" onClick={handleImportClick} disabled={importing}>Import Excel File</button>
              </div>
              {importError && (
                <div className="absolute left-0 mt-2 w-56 bg-red-100 text-red-700 text-xs rounded-lg p-2 z-20 border border-red-300">{importError}</div>
              )}
            </div>
            <button type="button" className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer" onClick={handleExportAll} title="Export">
              <Download size={18} /> Export
            </button>
            <Link href={`/admin/payrolls/create`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md">
              <span className="text-lg">＋</span> Add Payroll
            </Link>
          </div>
        </div>
        {/* Payroll DataTable with Search */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-2">
            <input type="text" className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" placeholder="Search payrolls..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <DataTable columns={columns} data={filteredPayrolls} pagination highlightOnHover pointerOnHover noDataComponent={<div className="px-6 py-8 text-center text-gray-400 text-sm">No payrolls found.</div>} />
        </div>
      </div>
    </AppLayout>
  );
}
