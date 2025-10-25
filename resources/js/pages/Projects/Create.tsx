import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/admin/projects" },
  { title: "Create Project", href: "#" },
];

const CreateProject = () => {
  const [form, setForm] = useState({
    name: '',
    status: 'ongoing',
    startDate: '',
    endDate: '',
    manager: '',
    budget: '',
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    router.post('/admin/projects/create', form, {
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
              <h2 className="text-2xl font-bold text-primary mb-1">Create Project</h2>
              <p className="text-gray-600 text-sm">
                Fill in the details to register a new project in the system.
              </p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <p className="font-medium text-gray-700 text-sm">Quick Tips:</p>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                <li>Use a clear and short project name.</li>
                <li>Make sure to set accurate start and end dates.</li>
                <li>Assign a valid project manager.</li>
              </ul>
            </div>

            <div className="pt-4">
              <a
                href="/admin/projects"
                className="w-full inline-block text-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Back to Projects
              </a>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 bg-card shadow rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">
                  Project Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>

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
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">
                  Timeline Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.startDate}
                      onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.endDate}
                      onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">
                  Management & Budget
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Manager
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.manager}
                      onChange={e => setForm(f => ({ ...f, manager: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Budget (₱)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                      value={form.budget}
                      onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <a
                  href="/admin/projects"
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
                  {processing ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateProject;
