import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contracts',
        href: '#',
    },
];

export default function ContractsIndex() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Head title="Contracts" />
                    <div className="w-full max-w-6xl mt-8 p-6 bg-white rounded shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-semibold">Contracts</h1>
                            <Link href="/admin/contracts/create" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                New Contract
                            </Link>
                        </div>

                        <p className="text-muted-foreground">This is a placeholder Inertia page for Contracts. Build UI here.</p>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
