import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserMinus, Wallet } from 'lucide-react';

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

export default function EmployeesTemplate() {
  const { employees: employeesRaw, employee_count, new_hired_count, resigned_count, average_salary } = usePage().props;
  const employees: Employee[] = Array.isArray(employeesRaw) ? employeesRaw : [];

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

        {/* Employee Table */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b text-gray-600 font-medium">
                <tr>
                  {['Name', 'Email', 'Phone', 'Type', 'Status', 'Salary', 'Attendance', 'Hired', 'Resigned', 'Active', 'Actions'].map((header) => (
                    <th key={header} className="px-5 py-3 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-gray-800">
                        {emp.first_name} {emp.last_name}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{emp.email ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.phone ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.employment_type?.name ?? '—'}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            emp.status?.name === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {emp.status?.name ?? '—'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {emp.monthly_salary ? `₱${Number(emp.monthly_salary).toLocaleString()}` : '—'}
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {emp.attendance_rate != null ? `${emp.attendance_rate}%` : '—'}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{emp.date_hired ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.date_resigned ?? '—'}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            emp.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {emp.is_active ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-5 py-3 flex gap-2">
                        <Link
                          href={`/admin/employees/${emp.id}/edit`}
                          className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all shadow-sm"
                        >
                          Edit
                        </Link>
                        <form
                          method="POST"
                          action={`/admin/employees/${emp.id}`}
                          onSubmit={(e) => {
                            if (!confirm('Are you sure you want to delete this employee?')) e.preventDefault();
                          }}
                        >
                          <input
                            type="hidden"
                            name="_token"
                            value={
                              (typeof window !== 'undefined' && (window as any).Laravel?.csrfToken) ||
                              (typeof document !== 'undefined' &&
                                document.querySelector('meta[name=csrf-token]')?.getAttribute('content')) ||
                              ''
                            }
                          />
                          <input type="hidden" name="_method" value="DELETE" />
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs transition-all shadow-sm"
                          >
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="px-6 py-8 text-center text-gray-400 text-sm">
                      No employees found.
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
}
