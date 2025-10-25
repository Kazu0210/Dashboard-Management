

import AppLayout from '@/layouts/app-layout';
import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'investigating', label: 'Investigating' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'DOLE Cases', href: '/admin/dole-cases' },
  { title: 'Create / Edit', href: '#' },
];

const DoleCaseForm = () => {
  const { doleCase = null, editMode = false } = usePage().props as any;
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

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

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
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    if (editMode && doleCase) {
      router.put(`/admin/dole-cases/${doleCase.id}`, form, {
        onError: (err) => {
          setErrors(err);
          setProcessing(false);
        },
        onFinish: () => setProcessing(false),
      });
    } else {
      router.post('/admin/dole-cases', form, {
        onError: (err) => {
          setErrors(err);
          setProcessing(false);
        },
        onFinish: () => setProcessing(false),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="bg-card shadow rounded-xl p-6 md:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-1">{editMode ? 'Edit DOLE Case' : 'Create DOLE Case'}</h2>
              <p className="text-gray-600 text-sm">Fill in the case details and assign responsible personnel.</p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <p className="font-medium text-gray-700 text-sm">Quick Tips:</p>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                <li>Provide a concise case title.</li>
                <li>Confirm the case date matches official filing.</li>
                <li>Use 'Assigned Personnel' for accountability.</li>
              </ul>
            </div>

            <div className="pt-4">
              <a
                href="/admin/dole-cases"
                className="w-full inline-block text-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Back to DOLE Cases
              </a>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="md:col-span-2 bg-card shadow rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Case Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Case Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Case Title</label>
                    <input
                      type="text"
                      name="case_title"
                      value={form.case_title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                      required
                    />
                    {errors.case_title && <div className="text-red-500 text-sm">{errors.case_title}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Filed By</label>
                    <input
                      type="text"
                      name="filed_by"
                      value={form.filed_by}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                    />
                    {errors.filed_by && <div className="text-red-500 text-sm">{errors.filed_by}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Case Date</label>
                    <input
                      type="date"
                      name="case_date"
                      value={form.case_date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                    />
                    {errors.case_date && <div className="text-red-500 text-sm">{errors.case_date}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
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
                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Details & Remarks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Details</label>
                    <textarea
                      name="details"
                      value={form.details}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                      rows={5}
                    />
                    {errors.details && <div className="text-red-500 text-sm">{errors.details}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Remarks</label>
                    <textarea
                      name="remarks"
                      value={form.remarks}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                      rows={4}
                    />
                    {errors.remarks && <div className="text-red-500 text-sm">{errors.remarks}</div>}
                  </div>
                </div>
              </div>

              {/* Resolution */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Resolution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Resolution Date</label>
                    <input
                      type="date"
                      name="resolution_date"
                      value={form.resolution_date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                    />
                    {errors.resolution_date && <div className="text-red-500 text-sm">{errors.resolution_date}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Assigned Personnel</label>
                    <input
                      type="text"
                      name="assigned_personnel"
                      value={form.assigned_personnel}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                    />
                    {errors.assigned_personnel && <div className="text-red-500 text-sm">{errors.assigned_personnel}</div>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <a href="/admin/dole-cases" className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</a>
                <button
                  type="submit"
                  disabled={processing}
                  className={`px-5 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90 transition ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {processing ? (editMode ? 'Updating...' : 'Submitting...') : editMode ? 'Update Case' : 'Create Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DoleCaseForm;
