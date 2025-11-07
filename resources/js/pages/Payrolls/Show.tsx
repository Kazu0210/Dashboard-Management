import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import React from 'react';

export default function Show() {
  const { payroll } = usePage().props as any;

  if (!payroll) {
    return <div className="p-8 text-center text-gray-500">Payroll record not found.</div>;
  }

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Home', href: '/' },
        { title: 'Payrolls', href: '/admin/payrolls' },
        { title: 'Payroll Details', href: '#' },
      ]}
    >
      <Head title="Payroll Details" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900">Payroll Details</h2>
            <p className="text-gray-500 text-sm mt-1">View all information for this payroll record.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-8">
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Employee</div>
              <div className="text-lg font-medium text-gray-800">{payroll.employee_name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Pay Period</div>
              <div className="text-lg font-medium text-gray-800">{payroll.pay_period_start} – {payroll.pay_period_end}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Basic Salary</div>
              <div className="text-lg font-semibold text-green-700">₱{Number(payroll.basic_salary).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Allowances</div>
              <div className="text-lg font-medium text-gray-800">{payroll.allowances ? `₱${Number(payroll.allowances).toLocaleString()}` : '—'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Deductions</div>
              <div className="text-lg font-medium text-red-600">{payroll.deductions ? `₱${Number(payroll.deductions).toLocaleString()}` : '—'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Net Pay</div>
              <div className="text-xl font-bold text-blue-700">₱{Number(payroll.net_pay).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Status</div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${payroll.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{payroll.status}</span>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Paid At</div>
              <div className="text-lg font-medium text-gray-800">{payroll.paid_at ? payroll.paid_at : '—'}</div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/admin/payrolls" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
              Back
            </Link>
            <Link href={`/admin/payrolls/${payroll.id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Edit
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}