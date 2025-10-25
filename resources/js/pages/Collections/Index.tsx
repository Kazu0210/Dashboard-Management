import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

const breadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Collections", href: "/admin/collections" },
];

const CollectionIndex = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4 bg-background min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-primary">Collection</h2>
            <p className="text-lg text-secondary mt-1">This is the collection page.</p>
          </div>
          <Link href='/admin/collections/create' className="ml-4">Create New Collection</Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default CollectionIndex;
