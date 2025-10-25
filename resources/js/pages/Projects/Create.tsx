import { Breadcrumb } from '@/components/ui/breadcrumb';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/admin/projects" },
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
      <div className="space-y-6 p-4 bg-background min-h-screen">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-primary">Create New Project</h2>
          <p className="text-lg text-secondary mt-1">Fill out the form to add a new project.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow p-6 max-w-xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Project Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
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
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Start Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={form.startDate}
              onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">End Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={form.endDate}
              onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Manager</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={form.manager}
              onChange={e => setForm(f => ({ ...f, manager: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Budget</label>
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
          <div className="flex justify-end gap-2">
            <a href="/projects" className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</a>
            <button type="submit" className="px-4 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90">Create Project</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreateProject;
