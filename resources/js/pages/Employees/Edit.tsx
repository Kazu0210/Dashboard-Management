import React, { useState, useEffect } from 'react';
import { router, usePage, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Edit() {
  const { employee = {}, types = [], statuses = [] } = usePage().props as any;

  const [form, setForm] = useState({
    first_name: employee.first_name || '',
    last_name: employee.last_name || '',
    email: employee.email || '',
    phone: employee.phone || '',
    position: employee.position || '',
    hired_at: employee.hired_at || '',
    salary: employee.salary || '',
    employment_type_id: employee.employment_type_id || employee.employment_type?.id || '',
    status: employee.status?.name || 'active',
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    setForm({
      first_name: employee.first_name || '',
      last_name: employee.last_name || '',
      email: employee.email || '',
      phone: employee.phone || '',
      position: employee.position || '',
      hired_at: employee.hired_at || '',
      salary: employee.salary || '',
      employment_type_id: employee.employment_type_id || employee.employment_type?.id || '',
      status: employee.status?.name || 'active',
    });
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/admin/employees/${employee.id}`, form, {
      onError: (err) => setErrors(err),
      onSuccess: () => router.visit('/admin/employees'),
    });
  };

  return (
    <>
      <Head title={`Edit ${employee.first_name}`} />
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input name="first_name" value={form.first_name} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input name="last_name" value={form.last_name} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            </div>
            <div>
              <label className="block mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
            </div>
            <div>
              <label className="block mb-1">Position</label>
              <input name="position" value={form.position} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              {errors.position && <div className="text-red-500 text-sm">{errors.position}</div>}
            </div>
            <div>
              <label className="block mb-1">Hired At</label>
              <input type="date" name="hired_at" value={form.hired_at} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              {errors.hired_at && <div className="text-red-500 text-sm">{errors.hired_at}</div>}
            </div>
            <div>
              <label className="block mb-1">Salary</label>
              <input type="number" step="0.01" name="salary" value={form.salary} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              {errors.salary && <div className="text-red-500 text-sm">{errors.salary}</div>}
            </div>
            <div>
              <label className="block mb-1">Employment Type</label>
              <select name="employment_type_id" value={form.employment_type_id} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200">
                <option value="">Select type</option>
                {types.map((t: any) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              {errors.employment_type_id && <div className="text-red-500 text-sm">{errors.employment_type_id}</div>}
            </div>
            <div>
              <label className="block mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full border-gray-200 border bg-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

Edit.layout = (page: any) => <AppLayout>{page}</AppLayout>;
