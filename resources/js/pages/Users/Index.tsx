import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';

const UsersPage = () => {
	return (
			<AppLayout>
		<div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
		  <div className="flex items-center justify-between">
		    <div>
		      <h2 className="text-3xl font-bold text-green-900">Users</h2>
		      <p className="text-lg mt-1 text-green-700">Manage users and access here</p>
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
		    <p className="text-sm text-green-900">No data yet — add components or lists here.</p>
		  </div>
		</div>
			</AppLayout>
	);
};

export default UsersPage;
