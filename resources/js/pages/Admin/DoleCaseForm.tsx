

import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'investigating', label: 'Investigating' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const DoleCaseForm = () => {
  const { doleCase, editMode } = usePage().props as any;
  const [form, setForm] = useState({
    case_title: '',
    filed_by: '',
    case_date: '',
    status: 'open',
    details: '',
    resolution_date: '',
    assigned_personnel: '',
    remarks: '',
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (doleCase) {
      setForm({
        case_title: doleCase.case_title || '',
        filed_by: doleCase.filed_by || '',
        case_date: doleCase.case_date || '',
        status: doleCase.status || 'open',
        details: doleCase.details || '',
        resolution_date: doleCase.resolution_date || '',
        assigned_personnel: doleCase.assigned_personnel || '',
        remarks: doleCase.remarks || '',
      });
    }
  }, [doleCase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && doleCase) {
      router.put(`/admin/dole-cases/${doleCase.id}`, form, {
        onError: (err) => setErrors(err),
      });
    } else {
      router.post('/admin/dole-cases', form, {
        onError: (err) => setErrors(err),
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl mt-10 p-8 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">{editMode ? 'Edit DOLE Case' : 'Add DOLE Case'}</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Case Information */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Case Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Case Title</label>
                    <input
                      type="text"
                      name="case_title"
                      value={form.case_title}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {errors.case_title && <div className="text-red-500 text-sm">{errors.case_title}</div>}
                  </div>
                  <div>
                    <label className="block mb-1">Filed By</label>
                    <input
                      type="text"
                      name="filed_by"
                      value={form.filed_by}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {errors.filed_by && <div className="text-red-500 text-sm">{errors.filed_by}</div>}
                  </div>
                  <div>
                    <label className="block mb-1">Case Date</label>
                    <input
                      type="date"
                      name="case_date"
                      value={form.case_date}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {errors.case_date && <div className="text-red-500 text-sm">{errors.case_date}</div>}
                  </div>
                  <div>
                    <label className="block mb-1">Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                  </div>
                </div>
              </div>

              {/* Details & Remarks */}
              <div>
                <h2 className="text-lg font-semibold mb-2 mt-4">Details & Remarks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block mb-1">Details</label>
                    <textarea
                      name="details"
                      value={form.details}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {errors.details && <div className="text-red-500 text-sm">{errors.details}</div>}
                  </div>
                  <div>
                    <label className="block mb-1">Remarks</label>
                    <textarea
                      name="remarks"
                      value={form.remarks}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {errors.remarks && <div className="text-red-500 text-sm">{errors.remarks}</div>}
                  </div>
                </div>
              </div>

              {/* Resolution */}
              <div>
                <h2 className="text-lg font-semibold mb-2 mt-4">Resolution</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Resolution Date</label>
                    <input
                      type="date"
                      name="resolution_date"
                      value={form.resolution_date}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {errors.resolution_date && <div className="text-red-500 text-sm">{errors.resolution_date}</div>}
                  </div>
                  <div>
                    <label className="block mb-1">Assigned Personnel</label>
                    <input
                      type="text"
                      name="assigned_personnel"
                      value={form.assigned_personnel}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {errors.assigned_personnel && <div className="text-red-500 text-sm">{errors.assigned_personnel}</div>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">
                  {editMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DoleCaseForm;
