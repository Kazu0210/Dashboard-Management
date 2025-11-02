import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import React from 'react';

export default function Show() {
  const { payroll } = usePage().props as any;

  if (!payroll) {
    return <div className="p-8 text-center text-gray-500">Payroll record not found.</div>;
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Home', href: '/' },
      { title: 'Payrolls', href: '/admin/payrolls' },
      { title: 'Payroll Details', href: '#' },
    ]}>
      <Head title="Payroll Details" />
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Payroll Details</h2>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Employee:</span>
            <span className="ml-2">{payroll.employee_name}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Pay Period:</span>
            <span className="ml-2">{payroll.pay_period_start} - {payroll.pay_period_end}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Basic Salary:</span>
            <span className="ml-2">₱{Number(payroll.basic_salary).toLocaleString()}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Allowances:</span>
            <span className="ml-2">{payroll.allowances ? `₱${Number(payroll.allowances).toLocaleString()}` : '—'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Deductions:</span>
            <span className="ml-2">{payroll.deductions ? `₱${Number(payroll.deductions).toLocaleString()}` : '—'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Net Pay:</span>
            <span className="ml-2">₱{Number(payroll.net_pay).toLocaleString()}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Status:</span>
            <span className="ml-2 capitalize">{payroll.status}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Paid At:</span>
            <span className="ml-2">{payroll.paid_at ? payroll.paid_at : '—'}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <Link href="/admin/payrolls" className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Back to Payrolls</Link>
          <Link href={`/admin/payrolls/${payroll.id}/edit`} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Edit Payroll</Link>
        </div>
      </div>
    </AppLayout>
  );
}
