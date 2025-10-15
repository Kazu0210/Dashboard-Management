import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const DoleCaseList = () => {
  const { doleCases } = usePage().props as any;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">DOLE Cases</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Case Title</th>
            <th className="border px-4 py-2">Filed By</th>
            <th className="border px-4 py-2">Case Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doleCases.map((c: any) => (
            <tr key={c.id}>
              <td className="border px-4 py-2">{c.case_title}</td>
              <td className="border px-4 py-2">{c.filed_by}</td>
              <td className="border px-4 py-2">{c.case_date}</td>
              <td className="border px-4 py-2">{c.status}</td>
              <td className="border px-4 py-2">
                <Link href={`/admin/dole-cases/${c.id}/edit`} className="text-blue-600 hover:underline mr-2">Edit</Link>
                <Link href={`/admin/dole-cases/${c.id}`} className="text-green-600 hover:underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Link href="/admin/dole-cases/create" className="bg-blue-600 text-white px-4 py-2 rounded">Add New Case</Link>
      </div>
    </div>
  );
};

export default DoleCaseList;
