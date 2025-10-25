import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import React from 'react';

const EditCollection = ({ collection }: any) => {
	const { projects = [] } = usePage().props as { projects?: { id: number, name: string }[] };

	const { data, setData, put, processing, errors } = useForm({
		date: collection?.date || new Date().toISOString().slice(0, 10),
		project_id: collection?.project_id ? String(collection.project_id) : '',
		collector: collection?.collector || '',
		amount: collection?.amount ? String(collection.amount) : '',
		notes: collection?.notes || '',
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
								<div>
									<label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
									<input
										id="date"
										name="date"
										type="date"
										value={data.date}
										onChange={e => setData('date', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
										disabled={processing}
									/>
									{errors.date && <div className="text-red-600 text-sm mt-1">{errors.date}</div>}
								</div>

								<div>
									<label htmlFor="project_id" className="block text-sm font-medium text-gray-700">Project</label>
									<select
										id="project_id"
										name="project_id"
										className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										value={data.project_id}
										onChange={e => setData('project_id', e.target.value)}
										required
										disabled={processing}
									>
										<option value="">Select a project</option>
										{projects.map((project: any) => (
											<option key={project.id} value={project.id}>{project.name}</option>
										))}
									</select>
									{errors.project_id && <div className="text-red-600 text-sm mt-1">{errors.project_id}</div>}
								</div>

								<div>
									<label htmlFor="collector" className="block text-sm font-medium text-gray-700">Collector</label>
									<input
										id="collector"
										name="collector"
										type="text"
										value={data.collector}
										onChange={e => setData('collector', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
										disabled={processing}
									/>
									{errors.collector && <div className="text-red-600 text-sm mt-1">{errors.collector}</div>}
								</div>

								<div>
									<label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
									<input
										id="amount"
										name="amount"
										type="number"
										step="0.01"
										value={data.amount}
										onChange={e => setData('amount', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
										disabled={processing}
									/>
									{errors.amount && <div className="text-red-600 text-sm mt-1">{errors.amount}</div>}
								</div>

								<div>
									<label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
									<input
										id="notes"
										name="notes"
										type="text"
										value={data.notes}
										onChange={e => setData('notes', e.target.value)}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										disabled={processing}
									/>
									{errors.notes && <div className="text-red-600 text-sm mt-1">{errors.notes}</div>}
								</div>

								<div className="flex justify-end gap-2 mt-2">
									<Link
										href="/admin/collections"
										className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
									>
										Cancel
									</Link>
									<button
										type="submit"
										className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-60"
										disabled={processing}
									>
										{processing ? 'Saving...' : 'Save Changes'}
									</button>
								</div>
							</form>
						</div>

						<aside className="md:col-span-1">
							<div className="bg-white rounded-lg p-4 shadow">
								<h3 className="text-lg font-medium text-gray-900">Collection Info</h3>
								<p className="text-sm text-gray-600 mt-2">Metadata for this collection.</p>

								<div className="mt-4 divide-y divide-gray-100 text-sm text-gray-700">
									<div className="py-3">
										<p className="text-xs text-gray-500">ID</p>
										<p className="font-medium">{collection.id}</p>
									</div>
									<div className="py-3">
										<p className="text-xs text-gray-500">Created</p>
										<p className="font-medium">{collection.created_at || '-'}</p>
									</div>
									<div className="py-3">
										<p className="text-xs text-gray-500">Updated</p>
										<p className="font-medium">{collection.updated_at || '-'}</p>
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
