import AppLayout from '@/layouts/app-layout';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'Employees', href: '/admin/employees' },
  { title: 'Create Employee', href: '#' },
];

const Create = () => {
  const { types = [] } = usePage().props as any;

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    hired_at: '',
    salary: '',
    employment_type_id: '',
    status: 'active',
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    router.post('/admin/employees', form, {
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
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="bg-card shadow rounded-xl p-6 md:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-1">Create Employee</h2>
              <p className="text-gray-600 text-sm">Fill in the details to add a new employee to the system.</p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <p className="font-medium text-gray-700 text-sm">Quick Tips:</p>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                <li>Provide a valid email for notifications.</li>
                <li>Set accurate hire date and employment type.</li>
                <li>Use consistent position titles for reporting.</li>
              </ul>
            </div>

            <div className="pt-4">
              <a
                href="/admin/employees"
                className="w-full inline-block text-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Back to Employees
              </a>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 bg-card shadow rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Employee Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">First Name</label>
                    <input
                      name="first_name"
                      type="text"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                    />
                    {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Last Name</label>
                    <input
                      name="last_name"
                      type="text"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                    />
                    {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                    <input
                      name="phone"
                      type="text"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Position</label>
                    <input
                      name="position"
                      type="text"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.position}
                      onChange={handleChange}
                    />
                    {errors.position && <div className="text-red-500 text-sm">{errors.position}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Hired At</label>
                    <input
                      name="hired_at"
                      type="date"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.hired_at}
                      onChange={handleChange}
                    />
                    {errors.hired_at && <div className="text-red-500 text-sm">{errors.hired_at}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Salary</label>
                    <input
                      name="salary"
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.salary}
                      onChange={handleChange}
                    />
                    {errors.salary && <div className="text-red-500 text-sm">{errors.salary}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Employment Type</label>
                    <select
                      name="employment_type_id"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.employment_type_id}
                      onChange={handleChange}
                    >
                      <option value="">Select type</option>
                      {types.map((t: any) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                    {errors.employment_type_id && <div className="text-red-500 text-sm">{errors.employment_type_id}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                    <select
                      name="status"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <a href="/admin/employees" className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</a>
                <button
                  type="submit"
                  disabled={processing}
                  className={`px-5 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90 transition ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {processing ? 'Creating...' : 'Create Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
