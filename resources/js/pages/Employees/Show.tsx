import React from 'react';
import { usePage, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Show() {
  const { employee } = usePage().props as any;

  if (!employee) {
    return <div className="p-6">Employee not found.</div>;
  }

  return (
    <>
      <Head title={`Employee: ${employee.first_name}`} />
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{employee.first_name} {employee.last_name}</h1>
            <div className="text-sm text-gray-500">{employee.position}</div>
          </div>
          <div className="space-x-2">
            <Link href={`/admin/employees/${employee.id}/edit`} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm">Edit</Link>
            <Link href="/admin/employees" className="text-sm text-gray-600 hover:underline">Back</Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{employee.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className="font-medium">{employee.phone}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Employment Type</div>
            <div className="font-medium">{employee.employment_type?.name ?? '—'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Status</div>
            <div className="font-medium">{employee.status?.name ?? '—'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Hired At</div>
            <div className="font-medium">{employee.hired_at ?? '—'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Salary</div>
            <div className="font-medium">{employee.salary ?? '—'}</div>
          </div>
        </div>
      </div>
    </>
  );
}

Show.layout = (page: any) => <AppLayout>{page}</AppLayout>;
