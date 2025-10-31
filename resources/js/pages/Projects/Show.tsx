import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React from 'react';

export default function Show() {
    const { project } = usePage().props as any;

    if (!project) {
        return <div className="p-8 text-center text-gray-500">Project not found.</div>;
    }

    return (
        <AppLayout breadcrumbs={[
            { title: 'Home', href: '/' },
            { title: 'Projects', href: '/admin/projects' },
            { title: project.project_name, href: `/admin/projects/${project.id}` },
        ]}>
            <Head title={`Project: ${project.project_name}`} />
            <div className="max-w-3xl mx-auto py-10">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            {project.project_name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Client</div>
                                <div className="font-medium text-lg">{project.client}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Location</div>
                                <div className="font-medium text-lg">{project.location}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Contract Amount</div>
                                <div className="font-medium text-lg">₱{Number(project.contract_amount).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Duration</div>
                                <div className="font-medium text-lg">{project.duration}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Status</div>
                                <div className="font-medium text-lg">{project.status}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Personnel</div>
                                <div className="font-medium text-lg">{project.personnel}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Billing Status</div>
                                <div className="font-medium text-lg">{project.billing_status}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Collected</div>
                                <div className="font-medium text-lg">₱{Number(project.collected).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Net Income</div>
                                <div className="font-medium text-lg">₱{Number(project.net_income).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Created At</div>
                                <div className="font-medium text-lg">{project.created_at ? new Date(project.created_at).toLocaleString() : ''}</div>
                            </div>
                            <div>
                                <div className="mb-2 text-gray-500 text-sm">Updated At</div>
                                <div className="font-medium text-lg">{project.updated_at ? new Date(project.updated_at).toLocaleString() : ''}</div>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-3">
                            <Link href="/admin/projects" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium">Back to Projects</Link>
                            <Link href={`/admin/projects/${project.id}/edit`} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium">Edit Project</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
