
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const CreateUserPage = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Submit form via Inertia or API
		// Inertia.post('/admin/users', form);
	};

	return (
		<AppLayout>
			<div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-3xl font-bold text-green-900">Create User</h2>
						<p className="text-lg mt-1 text-green-700">Fill out the form to add a new user.</p>
					</div>
				</div>

				<div className="bg-green-50 rounded-lg p-6 shadow">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								name="name"
								type="text"
								value={form.name}
								onChange={handleChange}
								className="mt-1"
								required
							/>
						</div>
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={form.email}
								onChange={handleChange}
								className="mt-1"
								required
							/>
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={form.password}
								onChange={handleChange}
								className="mt-1"
								required
							/>
						</div>
						<div>
							<Label htmlFor="password_confirmation">Confirm Password</Label>
							<Input
								id="password_confirmation"
								name="password_confirmation"
								type="password"
								value={form.password_confirmation}
								onChange={handleChange}
								className="mt-1"
								required
							/>
						</div>
						<div className="pt-2">
							<Button type="submit" variant="default" className="bg-green-500 hover:bg-green-600 text-white w-full">
								Create User
							</Button>
						</div>
					</form>
				</div>
			</div>
		</AppLayout>
	);
};

export default CreateUserPage;
