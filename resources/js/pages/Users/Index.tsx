
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';

type User = {
	id: number;
	name: string;
	email: string;
};

const UsersPage = () => {
	const { users } = usePage<{ users: User[] }>().props;
	return (
		<AppLayout>
			<div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-3xl font-bold text-neutral-900">Users</h2>
						<p className="text-lg mt-1 text-neutral-700">Manage users and access here</p>
					</div>
					<div>
						<Button asChild variant="default" className="bg-green-500 hover:bg-green-600 text-white">
							<Link href="/admin/users/create" prefetch>
								<UserPlus />
								<span>Create User</span>
							</Link>
						</Button>
					</div>
				</div>

				<div className="bg-green-50 rounded-lg p-6 shadow">
								{users && users.length > 0 ? (
									<table className="min-w-full text-sm">
										<thead>
											<tr>
												<th className="text-left py-2 px-3 font-semibold text-green-900">Name</th>
												<th className="text-left py-2 px-3 font-semibold text-green-900">Email</th>
												<th className="text-left py-2 px-3 font-semibold text-green-900">Actions</th>
											</tr>
										</thead>
										<tbody>
											{users.map((user) => (
												<tr key={user.id} className="border-t border-green-100">
													<td className="py-2 px-3">{user.name}</td>
													<td className="py-2 px-3">{user.email}</td>
													<td className="py-2 px-3">
														<div className="flex gap-2">
															<button className="text-green-700 hover:underline" title="Edit" disabled>Edit</button>
															<button className="text-red-600 hover:underline" title="Delete" disabled>Delete</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
					) : (
						<p className="text-sm text-green-900">No users found.</p>
					)}
				</div>
			</div>
		</AppLayout>
	);
};

export default UsersPage;
