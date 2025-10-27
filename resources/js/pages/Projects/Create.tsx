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
    project_name: '',
    client: '',
    location: '',
    contract_amount: '',
    duration: '',
    status: '',
    personnel: '',
    payroll: '',
    supplies: '',
    billing_status: '',
    collected: '',
    net_income: '',
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
      <div className="min-h-screen bg-gray-50 py-10 px-2">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Project</h2>
            <p className="text-gray-400 text-base">Register a new project and monitor its progress easily.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-0 border border-gray-100 overflow-hidden">
            {/* Project Info Section */}
            <div className="px-8 pt-8 pb-6 bg-gray-50 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Project Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Project Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white" value={form.project_name} onChange={e => setForm(f => ({ ...f, project_name: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Client</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Location</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Contract Amount (₱)</label>
                  <input type="number" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white" value={form.contract_amount} onChange={e => setForm(f => ({ ...f, contract_amount: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Duration</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} required />
                </div>
              </div>
            </div>
            {/* Financial & Personnel Section */}
            <div className="px-8 pt-8 pb-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Financial & Personnel Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Personnel</label>
                  <input type="number" min="0" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-gray-50" value={form.personnel} onChange={e => setForm(f => ({ ...f, personnel: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Payroll (₱)</label>
                  <input type="number" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-gray-50" value={form.payroll} onChange={e => setForm(f => ({ ...f, payroll: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Supplies (₱)</label>
                  <input type="number" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-gray-50" value={form.supplies} onChange={e => setForm(f => ({ ...f, supplies: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Billing Status</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-gray-50" value={form.billing_status} onChange={e => setForm(f => ({ ...f, billing_status: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Collected (₱)</label>
                  <input type="number" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-gray-50" value={form.collected} onChange={e => setForm(f => ({ ...f, collected: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Net Income (₱)</label>
                  <input type="number" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-200 bg-gray-50" value={form.net_income} onChange={e => setForm(f => ({ ...f, net_income: e.target.value }))} required />
                </div>
              </div>
            </div>
            {/* Action Bar */}
            <div className="flex justify-end gap-3 px-8 py-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <a href="/admin/projects" className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium">Cancel</a>
              <button type="submit" disabled={processing} className={`px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}>{processing ? 'Creating...' : 'Create Project'}</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateProject;
