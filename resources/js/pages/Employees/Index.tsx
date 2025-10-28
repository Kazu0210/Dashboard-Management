import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';

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
  const { employees: employeesRaw } = usePage().props;
  const { employee_count } = usePage().props;
  const employees: Employee[] = Array.isArray(employeesRaw) ? employeesRaw : [];


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Employees" />

      <div className="min-h-screen bg-gray-50 p-6">
        {/* Employee Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Employees</CardTitle>
              <CardDescription>Company-wide deployment</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">{String(employee_count)}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Deployment Rate</CardTitle>
              <CardDescription>360 active, 20 on-leave</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">95%</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New Hires This Month</CardTitle>
              <CardDescription>Added for new projects</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">15</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resigned / Replaced</CardTitle>
              <CardDescription>Regular staff turnover</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">10</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attendance Compliance</CardTitle>
              <CardDescription>Based on monthly DTRs</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">97%</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Monthly Salary</CardTitle>
              <CardDescription>Varies per site</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">₱12,000</span>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Employees</h2>
            <p className="text-sm text-gray-500">Manage employee records and employment details.</p>
          </div>
          <Link
            href={`/admin/employees/create`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            <span>＋</span> Create New Employee
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Email</th>
                  <th className="px-5 py-3 text-left">Phone</th>
                  <th className="px-5 py-3 text-left">Type</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Monthly Salary</th>
                  <th className="px-5 py-3 text-left">Attendance Rate</th>
                  <th className="px-5 py-3 text-left">Date Hired</th>
                  <th className="px-5 py-3 text-left">Date Resigned</th>
                  <th className="px-5 py-3 text-left">Active</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-800">{emp.first_name} {emp.last_name}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.email ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.phone ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.employment_type?.name ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.status?.name ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.monthly_salary ? `₱${Number(emp.monthly_salary).toLocaleString()}` : '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.attendance_rate != null ? `${emp.attendance_rate}%` : '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.date_hired ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.date_resigned ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{emp.is_active ? 'Yes' : 'No'}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/employees/${emp.id}/edit`}
                            className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all"
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
                                (typeof window !== 'undefined' && (window as any).Laravel && (window as any).Laravel.csrfToken) ||
                                (typeof document !== 'undefined' && document.querySelector('meta[name=csrf-token]')?.getAttribute('content')) ||
                                ''
                              }
                            />
                            <input type="hidden" name="_method" value="DELETE" />
                            <button type="submit" className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs transition-all">
                              Delete
                            </button>
                          </form>
                        </div>
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
