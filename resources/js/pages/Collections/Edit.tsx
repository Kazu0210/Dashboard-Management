import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import React from 'react';

const EditCollection = ({ collection }: any) => {
	const { projects = [] } = usePage().props as { projects?: { id: number, name: string }[] };

	const { data, setData, put, processing, errors } = useForm({
		date: collection?.date || new Date().toISOString().slice(0, 10),
		project_id: collection?.project_id ? String(collection.project_id) : '',
		billing_period: collection?.billing_period || '',
		billed_amount: collection?.billed_amount ? String(collection.billed_amount) : '',
		collected: collection?.collected ? String(collection.collected) : '',
		balance: collection?.balance ? String(collection.balance) : '',
		status: collection?.status || '',
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		put(`/admin/collections/${collection.id}`);
	}

	return (
		<AppLayout>
			<Head title="Edit Collection" />
			<div className="space-y-6 p-4 bg-gray-50 min-h-screen">
				<div className="max-w-4xl mx-auto">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-3xl font-bold text-gray-900">Edit Collection</h2>
							<p className="text-lg mt-1 text-gray-600">Modify the collection record below.</p>
						</div>
						<Link href="/admin/collections" className="text-sm text-gray-600 hover:underline">Back to list</Link>
					</div>

					<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="md:col-span-2 bg-white rounded-lg p-6 shadow w-full">
							<form onSubmit={handleSubmit} className="space-y-5">

								{/* Date */}
								<div>
									<label className="block text-sm font-medium text-gray-700">Date</label>
									<input
										type="date"
										value={data.date}
										onChange={e => setData('date', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
										required disabled={processing}
									/>
									{errors.date && <div className="text-red-600 text-sm mt-1">{errors.date}</div>}
								</div>

								{/* Project */}
								<div>
									<label className="block text-sm font-medium text-gray-700">Project</label>
									<select
										value={data.project_id}
										onChange={e => setData('project_id', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
										required disabled={processing}
									>
										<option value="">Select a project</option>
										{projects.map((project: any) => (
											<option key={project.id} value={project.id}>{project.name}</option>
										))}
									</select>
									{errors.project_id && <div className="text-red-600 text-sm mt-1">{errors.project_id}</div>}
								</div>

								{/* Billing Period */}
								<div>
									<label className="block text-sm font-medium text-gray-700">Billing Period</label>
									<input
										type="text"
										value={data.billing_period}
										onChange={e => setData('billing_period', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
										placeholder="Jan 2025"
										required disabled={processing}
									/>
									{errors.billing_period && <div className="text-red-600 text-sm mt-1">{errors.billing_period}</div>}
								</div>

								{/* Billed Amount */}
								<div>
									<label className="block text-sm font-medium text-gray-700">Billed Amount</label>
									<input
										type="number"
										step="0.01"
										value={data.billed_amount}
										onChange={e => setData('billed_amount', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
										required disabled={processing}
									/>
									{errors.billed_amount && <div className="text-red-600 text-sm mt-1">{errors.billed_amount}</div>}
								</div>

								{/* Collected */}
								<div>
									<label className="block text-sm font-medium text-gray-700">Collected</label>
									<input
										type="number"
										step="0.01"
										value={data.collected}
										onChange={e => setData('collected', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
										required disabled={processing}
									/>
									{errors.collected && <div className="text-red-600 text-sm mt-1">{errors.collected}</div>}
								</div>

								{/* Balance */}
								<div>
									<label className="block text-sm font-medium text-gray-700">Balance</label>
									<input
										type="number"
										step="0.01"
										value={data.balance}
										onChange={e => setData('balance', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
										required disabled={processing}
									/>
									{errors.balance && <div className="text-red-600 text-sm mt-1">{errors.balance}</div>}
								</div>

								{/* Status */}
								<div>
									<label className="block text-sm font-medium text-gray-700">Status</label>
									<select
										value={data.status}
										onChange={e => setData('status', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
										required disabled={processing}
									>
										<option value="">Select status</option>
										<option value="Billed">Billed</option>
										<option value="Partially Paid">Partially Paid</option>
										<option value="Paid">Paid</option>
										<option value="Pending">Pending</option>
									</select>
									{errors.status && <div className="text-red-600 text-sm mt-1">{errors.status}</div>}
								</div>

								<div className="flex justify-end gap-2 mt-2">
									<Link href="/admin/collections"
										className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
									>
										Cancel
									</Link>

									<button type="submit"
										className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-60"
										disabled={processing}
									>
										{processing ? 'Saving...' : 'Save Changes'}
									</button>
								</div>

							</form>
						</div>

						{/* Sidebar */}
						<aside className="md:col-span-1">
							<div className="bg-white rounded-lg p-4 shadow">
								<h3 className="text-lg font-medium text-gray-900">Collection Info</h3>
								<p className="text-sm text-gray-600 mt-2">Metadata for this collection.</p>

								<div className="mt-4 text-sm text-gray-700">
									<div className="py-3">
										<p className="text-xs text-gray-500">Date Created</p>
										<p className="font-medium">
											{collection.date ? (new Date(collection.date)).toLocaleDateString() : '-'}
										</p>
									</div>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default EditCollection;
