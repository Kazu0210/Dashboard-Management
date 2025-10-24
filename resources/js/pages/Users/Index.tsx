import AppLayout from '@/layouts/app-layout';

const UsersPage = () => {
	return (
			<AppLayout>
				<div className="space-y-6 p-4 bg-background min-h-screen text-black">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-3xl font-bold text-black">Users</h2>
							<p className="text-lg mt-1 text-black">Manage users and access here</p>
						</div>
					</div>

					<div className="bg-card rounded-lg p-6 shadow">
						<p className="text-sm text-black">No data yet — add components or lists here.</p>
					</div>
				</div>
			</AppLayout>
	);
};

export default UsersPage;
