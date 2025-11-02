import AppLayout from '@/layouts/app-layout';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Select from 'react-select';

const breadcrumbs = [
	{ title: 'Home', href: '/' },
	{ title: 'Payrolls', href: '/admin/payrolls' },
	{ title: 'Edit Payroll', href: '#' },
];

const Edit = () => {
	const { payroll, employees = [] } = usePage().props as any;
	const [form, setForm] = useState({
		employee_id: payroll.employee_id || '',
		pay_period_start: payroll.pay_period_start || '',
		pay_period_end: payroll.pay_period_end || '',
		basic_salary: payroll.basic_salary || '',
		allowances: payroll.allowances || '',
		deductions: payroll.deductions || '',
		net_pay: payroll.net_pay || '',
		status: payroll.status || 'pending',
		paid_at: payroll.paid_at || '',
	});
	const [processing, setProcessing] = useState(false);
	const [errors, setErrors] = useState<Record<string, any>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm(f => ({ ...f, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setProcessing(true);
		setErrors({});
		router.put(`/admin/payrolls/${payroll.id}`, form, {
			onError: (err) => {
				setErrors(err);
				setProcessing(false);
			},
			onFinish: () => setProcessing(false),
			onSuccess: () => router.visit('/admin/payrolls'),
		});
	};

	const employeeOptions = employees.map((emp: any) => ({
		value: emp.id,
		label: `${emp.first_name} ${emp.last_name}`
	}));

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="min-h-screen bg-background p-6">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Left Panel */}
					<div className="bg-card shadow rounded-xl p-6 md:col-span-1 space-y-6">
						<div>
							<h2 className="text-2xl font-bold text-primary mb-1">Edit Payroll</h2>
							<p className="text-gray-600 text-sm">Update the details for this payroll record.</p>
						</div>
						<div className="border-t pt-4 space-y-2">
							<p className="font-medium text-gray-700 text-sm">Quick Tips:</p>
							<ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
								<li>Select the correct employee and pay period.</li>
								<li>Ensure salary and net pay are accurate.</li>
								<li>Use status to track payment progress.</li>
							</ul>
						</div>
						<div className="pt-4">
							<a
								href="/admin/payrolls"
								className="w-full inline-block text-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
							>
								Back to Payrolls
							</a>
						</div>
					</div>
					{/* Right Panel */}
					<div className="md:col-span-2 bg-card shadow rounded-xl p-8">
						<form onSubmit={handleSubmit} className="space-y-8">
							<div>
								<h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Payroll Information</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Employee</label>
										<Select
											name="employee_id"
											options={employeeOptions}
											value={employeeOptions.find((opt: any) => opt.value === form.employee_id) || null}
											onChange={option => {
												const selected = employees.find((emp: any) => emp.id === (option ? option.value : ''));
												setForm(f => ({
													...f,
													employee_id: option ? option.value : '',
													basic_salary: selected && selected.monthly_salary ? selected.monthly_salary : ''
												}));
											}}
											isClearable
											placeholder="Select employee..."
											classNamePrefix="react-select"
										/>
										{errors.employee_id && <div className="text-red-500 text-sm">{errors.employee_id}</div>}
									</div>
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Pay Period Start</label>
										<input
											name="pay_period_start"
											type="date"
											className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
											value={form.pay_period_start}
											onChange={handleChange}
											required
										/>
										{errors.pay_period_start && <div className="text-red-500 text-sm">{errors.pay_period_start}</div>}
									</div>
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Pay Period End</label>
										<input
											name="pay_period_end"
											type="date"
											className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
											value={form.pay_period_end}
											onChange={handleChange}
											required
										/>
										{errors.pay_period_end && <div className="text-red-500 text-sm">{errors.pay_period_end}</div>}
									</div>
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Basic Salary</label>
										<input
											name="basic_salary"
											type="number"
											step="0.01"
											className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
											value={form.basic_salary}
											onChange={handleChange}
											required
										/>
										{errors.basic_salary && <div className="text-red-500 text-sm">{errors.basic_salary}</div>}
									</div>
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Allowances</label>
										<input
											name="allowances"
											type="number"
											step="0.01"
											className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
											value={form.allowances}
											onChange={handleChange}
										/>
										{errors.allowances && <div className="text-red-500 text-sm">{errors.allowances}</div>}
									</div>
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Deductions</label>
										<input
											name="deductions"
											type="number"
											step="0.01"
											className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
											value={form.deductions}
											onChange={handleChange}
										/>
										{errors.deductions && <div className="text-red-500 text-sm">{errors.deductions}</div>}
									</div>
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Net Pay</label>
										<input
											name="net_pay"
											type="number"
											step="0.01"
											className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
											value={form.net_pay}
											onChange={handleChange}
											required
										/>
										{errors.net_pay && <div className="text-red-500 text-sm">{errors.net_pay}</div>}
									</div>
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
										<select
											name="status"
											className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
											value={form.status}
											onChange={handleChange}
										>
											<option value="pending">Pending</option>
											<option value="paid">Paid</option>
										</select>
										{errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
									</div>
									<div>
										<label className="block text-sm font-medium mb-1 text-gray-700">Paid At</label>
										<input
											name="paid_at"
											type="datetime-local"
											className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
											value={form.paid_at}
											onChange={handleChange}
										/>
										{errors.paid_at && <div className="text-red-500 text-sm">{errors.paid_at}</div>}
									</div>
								</div>
							</div>
							<div className="flex justify-end gap-3 pt-4 border-t">
								<a href="/admin/payrolls" className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</a>
								<button
									type="submit"
									disabled={processing}
									className={`px-5 py-2 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90 transition ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
								>
									{processing ? 'Saving...' : 'Update Payroll'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default Edit;
