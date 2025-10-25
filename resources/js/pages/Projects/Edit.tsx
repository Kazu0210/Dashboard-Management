import AppLayout from '@/layouts/app-layout';
import { usePage, Link } from '@inertiajs/react';

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/admin/projects' },
  { title: 'Edit Project', href: '#' },
];

type Project = {
  id: number;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
  manager: string;
  budget: string;
  created_at: string;
  updated_at: string;
};


import { useState } from 'react';
import { router } from '@inertiajs/react';

const EditProject = () => {
  const { project } = usePage().props as { project: Project };
  const [form, setForm] = useState({
    name: project.name || '',
    status: project.status || '',
    start_date: project.start_date || '',
    end_date: project.end_date || '',
    manager: project.manager || '',
    budget: project.budget || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/admin/projects/${project.id}`, form);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4 bg-background min-h-screen">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-primary">Edit Project</h2>
          <Link
            href={`/admin/projects`}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Back to Projects
          </Link>
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
              value={form.start_date}
              onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">End Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={form.end_date}
              onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={form.budget}
              onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="submit" className="px-4 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90">Update Project</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditProject;
