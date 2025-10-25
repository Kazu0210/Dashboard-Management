import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/admin/projects" },
];

import { usePage } from '@inertiajs/react';

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

const Projects = () => {
  const { projects: projectsRaw } = usePage().props;
  const projects: Project[] = Array.isArray(projectsRaw) ? projectsRaw : [];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4 bg-background min-h-screen">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-primary">Projects</h2>
          <Link
            href={`/admin/projects/create`}
            className="px-4 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90"
          >
            Create New Project
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project: Project) => (
                  <tr key={project.id}>
                    <td className="px-4 py-3">{project.name}</td>
                    <td className="px-4 py-3">{project.status}</td>
                    <td className="px-4 py-3">{project.start_date}</td>
                    <td className="px-4 py-3">{project.end_date}</td>
                    <td className="px-4 py-3">{project.manager}</td>
                    <td className="px-4 py-3">{project.budget}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="px-2 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <form
                          method="POST"
                          action={`/admin/projects/${project.id}`}
                          onSubmit={e => {
                            if (!confirm('Are you sure you want to delete this project?')) e.preventDefault();
                          }}
                          style={{ display: 'inline' }}
                        >
                          <input type="hidden" name="_method" value="DELETE" />
                          <button
                            type="submit"
                            className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-gray-400" colSpan={9}>
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Projects;
