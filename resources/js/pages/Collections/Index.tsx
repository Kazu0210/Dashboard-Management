import AppLayout from '@/layouts/app-layout';

import { Link, usePage } from '@inertiajs/react';

const breadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Collections", href: "/admin/collections" },
];

const CollectionIndex = () => {
  const { collections = [] } = usePage().props as { collections?: any[] };

  function deleteCollection(id: number) {
    if (!confirm('Delete this collection? This action cannot be undone.')) return;

    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    fetch(`/admin/collections/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-TOKEN': token,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: new URLSearchParams({ _method: 'DELETE' }).toString(),
    }).then((res) => {
      if (res.ok) {
        // reload the page to refresh the list
        window.location.reload();
      } else {
        alert('Failed to delete the collection.');
      }
    }).catch(() => alert('Failed to delete the collection.'));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Collections</h2>
            <p className="text-sm text-gray-600 mt-1">Manage and review collection records. Use the controls to add collections.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/admin/collections/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create New
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-sm text-gray-700">
                  <th className="py-2 px-3">Project</th>
                  <th className="py-2 px-3">Collector</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Notes</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {collections.length === 0 ? (
                  <tr>
                    <td className="py-4 px-3 text-sm text-gray-600" colSpan={6}>
                      No collections to display.
                    </td>
                  </tr>
                ) : (
                  collections.map((c: any) => (
                    <tr key={c.id} className="border-t">
                      <td className="py-3 px-3 text-sm text-gray-700">{c.project ? c.project.name : c.project_id}</td>
                      <td className="py-3 px-3 text-sm text-gray-700">{c.collector}</td>
                      <td className="py-3 px-3 text-sm text-gray-700">{c.amount}</td>
                      <td className="py-3 px-3 text-sm text-gray-700">{c.date ? (new Date(c.date)).toLocaleDateString() : ''}</td>
                      <td className="py-3 px-3 text-sm text-gray-600">{c.notes ?? ''}</td>
                      <td className="py-3 px-3 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/collections/${c.id}/edit`} className="text-sm text-blue-600 hover:underline">Edit</Link>
                          <button type="button" onClick={() => deleteCollection(c.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CollectionIndex;
