
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'DOLE Cases', href: '/admin/dole-cases' },
];

const DoleCaseList = () => {
  const { doleCases: doleCasesRaw } = usePage().props as any;
  const doleCases = Array.isArray(doleCasesRaw) ? doleCasesRaw : [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">DOLE Cases</h2>
            <p className="text-sm text-gray-500">Manage filed DOLE cases and their current statuses.</p>
          </div>
          <Link
            href="/admin/dole-cases/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            ＋ Create New Case
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-5 py-3 text-left">Case Title</th>
                  <th className="px-5 py-3 text-left">Filed By</th>
                  <th className="px-5 py-3 text-left">Case Date</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doleCases.length > 0 ? (
                  doleCases.map((c: any) => (
                    <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-800">{c.case_title}</td>
                      <td className="px-5 py-3 text-gray-600">{c.filed_by}</td>
                      <td className="px-5 py-3 text-gray-600">{c.case_date}</td>
                      <td className="px-5 py-3 text-gray-600">{c.status}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/dole-cases/${c.id}/edit`}
                            className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs transition-all"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/admin/dole-cases/${c.id}`}
                            className="px-3 py-1.5 rounded-md bg-green-500 text-white hover:bg-green-600 text-xs transition-all"
                          >
                            View
                          </Link>
                          <form
                            method="POST"
                            action={`/admin/dole-cases/${c.id}/destroy`}
                            onSubmit={(e) => {
                              if (!confirm('Are you sure you want to delete this case?')) e.preventDefault();
                            }}
                          >
                            <input
                              type="hidden"
                              name="_token"
                              value={
                                (typeof window !== 'undefined' && (window as any).Laravel && (window as any).Laravel.csrfToken) ||
                                (typeof document !== 'undefined' && document.querySelector('meta[name=csrf-token]')?.getAttribute('content')) ||
                                ''
                              }
                            />
                            <input type="hidden" name="_method" value="DELETE" />
                            <button
                              type="submit"
                              className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs transition-all"
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
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400 text-sm">
                      No DOLE cases found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DoleCaseList;
