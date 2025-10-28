import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserMinus, Wallet, Pencil, Trash2, Upload, Download } from 'lucide-react';

import React from 'react';

import DataTable, { TableColumn } from 'react-data-table-component';

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'Employees', href: '/admin/employees' },
];

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  employment_type?: { name: string } | null;
  status?: { name: string } | null;
  monthly_salary?: number | string | null;
  attendance_rate?: number | null;
  date_hired?: string | null;
  date_resigned?: string | null;
  is_active?: boolean;
};


export default function Index() {
  const { employees: employeesRaw, employee_count, new_hired_count, resigned_count, average_salary } = usePage().props;
  const employees: Employee[] = Array.isArray(employeesRaw) ? employeesRaw : [];

  // Search state
  const [search, setSearch] = React.useState('');
  const filteredEmployees = React.useMemo(() => {
    if (!search.trim()) return employees;
    const lower = search.toLowerCase();
    return employees.filter(emp =>
      (`${emp.first_name} ${emp.last_name}`.toLowerCase().includes(lower) ||
        (emp.email && emp.email.toLowerCase().includes(lower)) ||
        (emp.phone && emp.phone.toLowerCase().includes(lower)))
    );
  }, [search, employees]);


  // DataTable columns
  const columns: TableColumn<Employee>[] = [
    {
      name: 'Name',
      selector: row => `${row.first_name} ${row.last_name}`,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Email',
      selector: row => row.email ?? '—',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone ?? '—',
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row.employment_type?.name ?? '—',
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status?.name === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {row.status?.name ?? '—'}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Salary',
      selector: row => row.monthly_salary ? `₱${Number(row.monthly_salary).toLocaleString()}` : '—',
      sortable: true,
    },
    {
      name: 'Attendance',
      selector: row => row.attendance_rate != null ? `${row.attendance_rate}%` : '—',
      sortable: true,
    },
    {
      name: 'Hired',
      selector: row => row.date_hired ?? '—',
      sortable: true,
    },
    {
      name: 'Resigned',
      selector: row => row.date_resigned ?? '—',
      sortable: true,
    },
    {
      name: 'Active',
      cell: row => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {row.is_active ? 'Yes' : 'No'}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-2">
          <Link
            href={`/admin/employees/${row.id}/edit`}
            className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all shadow-sm flex items-center justify-center"
            title="Edit"
          >
            <Pencil size={16} />
          </Link>
          <form
            method="POST"
            action={`/admin/employees/${row.id}`}
            onSubmit={e => {
              if (!confirm('Are you sure you want to delete this employee?')) e.preventDefault();
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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Employees" />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
          {/* Total Employees */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-500">Total Employees</CardTitle>
                  <CardDescription className="text-xs text-gray-400">Company-wide</CardDescription>
                </div>
                <Users className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold text-gray-800">{String(employee_count)}</span>
              </CardContent>
            </Card>
          </motion.div>

          {/* New Hires */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-500">New Hires</CardTitle>
                  <CardDescription className="text-xs text-gray-400">This Month</CardDescription>
                </div>
                <UserPlus className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold text-gray-800">{String(new_hired_count)}</span>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resigned */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-500">Resigned / Replaced</CardTitle>
                  <CardDescription className="text-xs text-gray-400">Staff turnover</CardDescription>
                </div>
                <UserMinus className="w-5 h-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold text-gray-800">{String(resigned_count)}</span>
              </CardContent>
            </Card>
          </motion.div>

          {/* Average Salary */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-500">Average Salary</CardTitle>
                  <CardDescription className="text-xs text-gray-400">Monthly</CardDescription>
                </div>
                <Wallet className="w-5 h-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-gray-800">
                  {average_salary ? `₱${Number(average_salary).toLocaleString()}` : '—'}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Employees</h2>
            <p className="text-gray-500 text-sm mt-1">Manage and monitor all employee records.</p>
          </div>
          <Link
            href={`/admin/employees/create`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md"
          >
            <span className="text-lg">＋</span> Add Employee
          </Link>
        </div>

        {/* Employee DataTable with Search */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-2">
            <input
              type="text"
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Search employees..."
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
            data={filteredEmployees}
            pagination
            highlightOnHover
            pointerOnHover
            noDataComponent={<div className="px-6 py-8 text-center text-gray-400 text-sm">No employees found.</div>}
          />
        </div>
        {/* Pagination removed, handled by DataTable */}
      </div>
    </AppLayout>
  );
}
