import React, { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

type Project = {
  id: string;
  name: string;
  status: 'ongoing' | 'completed' | 'on-hold';
  start_date: string;
  end_date?: string;
  manager?: string;
  budget?: number;
};

const STORAGE_KEY = 'pm_projects_v1';

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export default function ProjectMonitoring() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | Project['status']>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setProjects(JSON.parse(raw));
      } catch {
        setProjects([]);
      }
    } else {
      // Seed sample data if no saved projects
      const seed: Project[] = [
        {
          id: uid(),
          name: 'Website Redesign',
          status: 'ongoing',
          start_date: '2025-08-01',
          manager: 'Alice',
          budget: 50000,
        },
        {
          id: uid(),
          name: 'ERP Implementation',
          status: 'on-hold',
          start_date: '2025-05-10',
          manager: 'Bob',
          budget: 120000,
        },
        {
          id: uid(),
          name: 'Mobile App',
          status: 'ongoing',
          start_date: '2025-09-01',
          manager: 'Carlos',
          budget: 80000,
        },
      ];
      setProjects(seed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const stats = useMemo(() => {
    const ongoing = projects.filter((p) => p.status === 'ongoing').length;
    const completed = projects.filter((p) => p.status === 'completed').length;
    const onHold = projects.filter((p) => p.status === 'on-hold').length;
    return { ongoing, completed, onHold, total: projects.length };
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filter !== 'all' && p.status !== filter) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [projects, filter, query]);

  const addProject = () => {
    const name = prompt('Enter project name');
    if (!name) return;
    const p: Project = {
      id: uid(),
      name,
      status: 'ongoing',
      start_date: new Date().toISOString().slice(0, 10),
    };
    setProjects((prev) => [p, ...prev]);
  };

  const removeProject = (id: string) => {
    if (!confirm('Delete this project?')) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1">
          <Head title="Project Monitoring" />
          <main className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-semibold">Project Monitoring</h2>
                <button
                  onClick={addProject}
                  className="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
                >
                  Add Project
                </button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                  <div className="text-sm text-gray-500">Total Projects</div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <div className="text-sm text-gray-500">Ongoing</div>
                  <div className="text-2xl font-bold">{stats.ongoing}</div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <div className="text-sm text-gray-500">Completed</div>
                  <div className="text-2xl font-bold">{stats.completed}</div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <div className="text-sm text-gray-500">On-hold</div>
                  <div className="text-2xl font-bold">{stats.onHold}</div>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white p-6 rounded shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as any)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="all">All</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On-hold</option>
                    </select>
                    <input
                      placeholder="Search projects..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="border rounded px-2 py-1 text-sm w-full md:w-64"
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    Showing {filtered.length} of {projects.length}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Manager</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Start Date</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filtered.map((p) => (
                        <tr key={p.id}>
                          <td className="px-4 py-2 text-sm">{p.name}</td>
                          <td className="px-4 py-2 text-sm">{p.manager || '-'}</td>
                          <td className="px-4 py-2 text-sm">{p.start_date}</td>
                          <td
                            className={`px-4 py-2 text-sm font-medium ${
                              p.status === 'ongoing'
                                ? 'text-blue-600'
                                : p.status === 'completed'
                                ? 'text-green-600'
                                : 'text-yellow-600'
                            }`}
                          >
                            {p.status}
                          </td>
                          <td className="px-4 py-2 text-sm text-right">
                            <button
                              onClick={() => removeProject(p.id)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-gray-500 text-sm">
                            No projects found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
