import AppLayout from '@/layouts/app-layout';
import { usePage, Link, router, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'Employees', href: '/admin/employees' },
  { title: 'Edit Employee', href: '#' },
];

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
    hour12: false,
  });
}

export default function Edit() {
  const { employee = null, types = [], statuses = [] } = usePage().props as any;

  if (!employee) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500 text-lg">Loading employee data...</div>
        </div>
      </AppLayout>
    );
  }

  const [form, setForm] = useState({
    first_name: employee.first_name || '',
    last_name: employee.last_name || '',
    email: employee.email || '',
    phone: employee.phone || '',
    employment_type_id: employee.employment_type_id || employee.employment_type?.id || '',
    status_id: employee.status_id || employee.status?.id || '',
    monthly_salary: employee.monthly_salary || '',
    attendance_rate: employee.attendance_rate || '',
    date_hired: employee.date_hired || '',
    date_resigned: employee.date_resigned || '',
    is_active: employee.is_active ?? true,
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  useEffect(() => {
    setForm({
      first_name: employee.first_name || '',
      last_name: employee.last_name || '',
      email: employee.email || '',
      phone: employee.phone || '',
      employment_type_id: employee.employment_type_id || employee.employment_type?.id || '',
      status_id: employee.status_id || employee.status?.id || '',
      monthly_salary: employee.monthly_salary || '',
      attendance_rate: employee.attendance_rate || '',
      date_hired: employee.date_hired || '',
      date_resigned: employee.date_resigned || '',
      is_active: employee.is_active ?? true,
    });
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    router.put(`/admin/employees/${employee.id}`, form, {
      onError: (err) => {
        setErrors(err);
        setProcessing(false);
      },
      onFinish: () => setProcessing(false),
      onSuccess: () => router.visit('/admin/employees'),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${employee.first_name}`} />

      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Edit Employee</h2>
            <p className="text-sm text-gray-500">Modify employee details and update information.</p>
          </div>
          <Link
            href={`/admin/employees`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-all"
          >
            ← Back to Employees
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Employee Details</h3>
              <p className="text-sm text-gray-500 mb-4">Basic information about this employee.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                />
                {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                />
                {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                />
                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                />
                {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Salary</label>
                <input
                  name="monthly_salary"
                  type="number"
                  step="0.01"
                  value={form.monthly_salary}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                />
                {errors.monthly_salary && <div className="text-red-500 text-sm">{errors.monthly_salary}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Rate (%)</label>
                <input
                  name="attendance_rate"
                  type="number"
                  step="0.01"
                  value={form.attendance_rate}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                />
                {errors.attendance_rate && <div className="text-red-500 text-sm">{errors.attendance_rate}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Hired</label>
                <input
                  name="date_hired"
                  type="date"
                  value={form.date_hired}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                />
                {errors.date_hired && <div className="text-red-500 text-sm">{errors.date_hired}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Resigned</label>
                <input
                  name="date_resigned"
                  type="date"
                  value={form.date_resigned}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                />
                {errors.date_resigned && <div className="text-red-500 text-sm">{errors.date_resigned}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <select
                  name="employment_type_id"
                  value={form.employment_type_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                >
                  <option value="">Select type</option>
                  {types.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                {errors.employment_type_id && <div className="text-red-500 text-sm">{errors.employment_type_id}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status_id"
                  value={form.status_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 px-3 py-2 transition-all"
                >
                  <option value="">Select status</option>
                  {/* You may want to map statuses from props here */}
                </select>
                {errors.status_id && <div className="text-red-500 text-sm">{errors.status_id}</div>}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                />
                <label className="text-sm font-medium text-gray-700">Active</label>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={processing}
                className={`px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-all ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {processing ? 'Updating...' : 'Update Employee'}
              </button>
            </div>
          </form>

          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Employee Summary</h4>
            <p className="text-sm text-gray-500">Quick information overview of this employee.</p>

            <div className="divide-y divide-gray-100">
              <div className="py-3">
                <p className="text-xs text-gray-500">Employee ID</p>
                <p className="text-sm font-medium text-gray-800">{employee.id}</p>
              </div>
              <div className="py-3">
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm font-medium text-gray-800">{formatDateTime(employee.created_at)}</p>
              </div>
              <div className="py-3">
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-800">{formatDateTime(employee.updated_at)}</p>
              </div>

              <div className="py-3">
                <p className="text-xs text-gray-500">Active</p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    form.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {form.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
