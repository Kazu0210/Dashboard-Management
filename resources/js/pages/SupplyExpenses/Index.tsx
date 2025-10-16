import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Head } from '@inertiajs/react';

export default function SupplyExpensesIndex() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Head title="Supply Expenses" />
                    <div className="w-full max-w-6xl mt-8 p-6 bg-white rounded shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-semibold">Supply Expenses</h1>
                        </div>

                        <div className="text-gray-500">No supply expenses yet.</div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
