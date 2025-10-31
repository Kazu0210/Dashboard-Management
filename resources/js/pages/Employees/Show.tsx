
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

export default function Show() {
  const { employee } = usePage().props as any;

  if (!employee) {
    return <div className="p-6">Employee not found.</div>;
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Home', href: '/' },
      { title: 'Employees', href: '/admin/employees' },
      { title: `${employee.first_name} ${employee.last_name}`, href: `/admin/employees/${employee.id}` },
    ]}>
      <Head title={`Employee: ${employee.first_name} ${employee.last_name}`} />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">{employee.first_name} {employee.last_name}</h2>
            <p className="text-gray-500 text-sm mt-1">Employee Details</p>
          </div>
          <div className="flex gap-2 sm:justify-end w-full sm:w-auto">
            <Link
              href={`/admin/employees/${employee.id}/edit`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
              <Pencil size={16} /> Edit
            </Link>
            <Link
              href="/admin/employees"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all shadow-sm border border-gray-300"
            >
              Back
            </Link>
          </div>
        </div>

        {/* Employee Details Card */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl shadow-xl border border-gray-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-0 sm:p-1">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-8 pb-4">
              {/* Avatar with initials */}
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                {employee.first_name?.[0]}{employee.last_name?.[0]}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{employee.first_name} {employee.last_name}</h3>
                    <div className="text-gray-500 text-sm">{employee.employment_type?.name ?? '—'} • {employee.status?.name ?? '—'}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="text-gray-400 text-xs mt-1">Full details of the employee</div>
              </div>
            </div>
            <div className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-4">
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="font-medium text-base">{employee.email ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="font-medium text-base">{employee.phone ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Monthly Salary</div>
                  <div className="font-medium text-base">{employee.monthly_salary ? `₱${Number(employee.monthly_salary).toLocaleString()}` : '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Attendance Rate</div>
                  <div className="font-medium text-base">{employee.attendance_rate != null ? `${employee.attendance_rate}%` : '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Date Hired</div>
                  <div className="font-medium text-base">{employee.date_hired ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Date Resigned</div>
                  <div className="font-medium text-base">{employee.date_resigned ?? '—'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
