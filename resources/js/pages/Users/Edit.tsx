import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

const EditUserPage = () => {
  const { user } = usePage<{ user: User }>().props;
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
    password_confirmation: '',
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    router.put(`/admin/users/${user.id}/update`, form, {
      onError: (err) => {
        setErrors(err);
        setProcessing(false);
      },
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Edit User</h2>
            <p className="text-lg mt-1 text-neutral-700">Update the user information below.</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-6 shadow max-w-2xl mx-auto w-full">
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
                disabled={processing}
              />
              {errors.name && (
                <div className="text-red-600 text-sm mt-1">{errors.name.join ? errors.name.join(' ') : errors.name}</div>
              )}
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
                disabled={processing}
              />
              {errors.email && (
                <div className="text-red-600 text-sm mt-1">{errors.email.join ? errors.email.join(' ') : errors.email}</div>
              )}
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
                disabled={processing}
              />
              {errors.password && (
                <div className="text-red-600 text-sm mt-1">{errors.password.join ? errors.password.join(' ') : errors.password}</div>
              )}
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
                disabled={processing}
              />
              {errors.password_confirmation && (
                <div className="text-red-600 text-sm mt-1">{errors.password_confirmation.join ? errors.password_confirmation.join(' ') : errors.password_confirmation}</div>
              )}
            </div>
            <div className="pt-2">
              <Button type="submit" variant="default" className="bg-green-500 hover:bg-green-600 text-white w-full" disabled={processing}>
                {processing ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditUserPage;
