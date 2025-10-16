import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contracts',
        href: '#',
    },
];

export default function ContractsIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contracts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Contracts</h1>
                <p className="text-muted-foreground">This is a placeholder Inertia page for Contracts. Build UI here.</p>
            </div>
        </AppLayout>
    );
}
