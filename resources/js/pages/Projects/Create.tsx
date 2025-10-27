import AppLayout from '@/layouts/app-layout';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Collections", href: "/admin/collections" },
  { title: "Create Collection", href: "#" },
];

type Project = {
  id: number;
  name: string;
};

const CreateCollection = () => {
  const { projects } = usePage<{ projects: Project[] }>().props;

  const [form, setForm] = useState({
    project_id: '',
    billing_period: '',
    billed_amount: '',
    collected: '',
    balance: '',
    status: 'Pending',
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    router.post('/admin/collections/create', form, {
      onError: (err) => {
        setErrors(err);
        setProcessing(false);
      },
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="bg-card shadow rounded-xl p-6 md:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-1">Create Collection</h2>
              <p className="text-gray-600 text-sm">
                Fill in the details to record a new collection entry.
              </p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <p className="font-medium text-gray-700 text-sm">Quick Tips:</p>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                <li>Select the correct project from the list.</li>
                <li>Ensure billing period and amounts are accurate.</li>
                <li>Status helps track the payment progress.</li>
              </ul>
            </div>

            <div className="pt-4">
              <a
                href="/admin/collections"
                className="w-full inline-block text-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Back to Collections
              </a>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 bg-card shadow rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Collection Details */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">
                  Collection Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Dropdown */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Project
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.project_id}
                      onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))}
                      required
                    >
                      <option value="">Select Project</option>
                      {projects?.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                    {errors.project_id && (
                      <p className="text-red-500 text-xs mt-1">{errors.project_id}</p>
                    )}
                  </div>

                  {/* Billing Period */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Billing Period
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. October 2025"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.billing_period}
                      onChange={e => setForm(f => ({ ...f, billing_period: e.target.value }))}
                      required
                    />
                    {errors.billing_period && (
                      <p className="text-red-500 text-xs mt-1">{errors.billing_period}</p>
                    )}
                  </div>

                  {/* Billed Amount */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Billed Amount (₱)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.billed_amount}
                      onChange={e => setForm(f => ({ ...f, billed_amount: e.target.value }))}
                      required
                    />
                    {errors.billed_amount && (
                      <p className="text-red-500 text-xs mt-1">{errors.billed_amount}</p>
                    )}
                  </div>

                  {/* Collected */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Collected (₱)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.collected}
                      onChange={e => setForm(f => ({ ...f, collected: e.target.value }))}
                      required
                    />
                    {errors.collected && (
                      <p className="text-red-500 text-xs mt-1">{errors.collected}</p>
                    )}
                  </div>

                  {/* Balance */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Balance (₱)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.balance}
                      onChange={e => setForm(f => ({ ...f, balance: e.target.value }))}
                      required
                    />
                    {errors.balance && (
                      <p className="text-red-500 text-xs mt-1">{errors.balance}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.status}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Partial">Partial</option>
                      <option value="Paid">Paid</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <a
                  href="/admin/collections"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  disabled={processing}
                  className={`px-5 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90 transition ${
                    processing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {processing ? 'Saving...' : 'Save Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateCollection;
