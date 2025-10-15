
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'investigating', label: 'Investigating' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const DoleCaseForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/admin/dole-cases', form, {
      onError: (err) => setErrors(err),
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add DOLE Case</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block mb-1">Details</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.details && <div className="text-red-500 text-sm">{errors.details}</div>}
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block mb-1">Remarks</label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.remarks && <div className="text-red-500 text-sm">{errors.remarks}</div>}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default DoleCaseForm;
