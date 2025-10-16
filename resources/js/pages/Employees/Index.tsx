import React from 'react'
import { Head, Link, usePage, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

type Props = {
  employees?: Array<any>
  types?: Array<any>
  statuses?: Array<any>
}

export default function Index() {
  const { employees = [], types = [], statuses = [] } = usePage().props as Props

  return (
    <>
      <Head title="Employees" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <Link href="/admin/employees/create" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          New Employee
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {employees.length === 0 && (
            <li className="px-6 py-4 text-gray-500">No employees yet.</li>
          )}

          {employees.map((emp: any) => (
            <li key={emp.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{emp.first_name} {emp.last_name}</div>
                <div className="text-sm text-gray-500">{emp.email}</div>
                <div className="text-sm text-gray-500">{emp.phone}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{emp.employment_type?.name ?? '—'}</div>
                <div className="text-sm text-gray-600">{emp.status?.name ?? '—'}</div>
                <div className="mt-2 flex gap-2 justify-end items-center">
                  <Link href={`/admin/employees/${emp.id}`} className="text-blue-600 hover:underline">View</Link>
                  <Link href={`/admin/employees/${emp.id}/edit`} className="text-indigo-600 hover:underline">Edit</Link>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (confirm('Are you sure you want to delete this employee?')) {
                        router.post(`/admin/employees/${emp.id}`, { _method: 'delete' });
                      }
                    }}
                    style={{ display: 'inline' }}
                  >
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

Index.layout = (page: any) => <AppLayout>{page}</AppLayout>
