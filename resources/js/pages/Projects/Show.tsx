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
            <div className="max-w-6xl mx-auto py-10">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            {project.project_name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* Basic Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Project Number</div>
                                        <div className="font-medium text-lg">{project.project_number || '—'}</div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <div className="mb-2 text-gray-500 text-sm">Project Name</div>
                                        <div className="font-medium text-lg">{project.project_name || '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Year</div>
                                        <div className="font-medium text-lg">{project.year || '—'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Rates & Pricing */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rates & Pricing</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">FTE</div>
                                        <div className="font-medium text-lg">{project.fte ? project.fte.toFixed(2) : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Average Rate per Employee</div>
                                        <div className="font-medium text-lg">{project.average_rate_per_employee ? `₱${Number(project.average_rate_per_employee).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Bid Price - One Year</div>
                                        <div className="font-medium text-lg">{project.bid_price_one_year ? `₱${Number(project.bid_price_one_year).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Half Year Bid Price</div>
                                        <div className="font-medium text-lg">{project.half_year_bid_price ? `₱${Number(project.half_year_bid_price).toLocaleString()}` : '—'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Status</div>
                                        <div className="font-medium text-lg">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                project.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                project.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-600'}`}>
                                                {project.status || 'Unknown'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Monthly & Taxes */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly & Taxes</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Monthly (12)</div>
                                        <div className="font-medium text-lg">{project.monthly_12 ? `₱${Number(project.monthly_12).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Withholding Tax</div>
                                        <div className="font-medium text-lg">{project.withholding_tax ? `₱${Number(project.withholding_tax).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">VAT</div>
                                        <div className="font-medium text-lg">{project.vat ? `₱${Number(project.vat).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Agency Fee</div>
                                        <div className="font-medium text-lg">{project.agency_fee ? `₱${Number(project.agency_fee).toLocaleString()}` : '—'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Resources */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources & Expenses</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Supplies</div>
                                        <div className="font-medium text-lg">{project.supplies ? `₱${Number(project.supplies).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Equipment</div>
                                        <div className="font-medium text-lg">{project.equipment ? `₱${Number(project.equipment).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Salary Expenses (Year)</div>
                                        <div className="font-medium text-lg">{project.salary_expenses_year ? `₱${Number(project.salary_expenses_year).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">13th Month Estimated</div>
                                        <div className="font-medium text-lg">{project.thirteenth_month_estimated ? `₱${Number(project.thirteenth_month_estimated).toLocaleString()}` : '—'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Contributions */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">SILP Estimated</div>
                                        <div className="font-medium text-lg">{project.silp_estimated ? `₱${Number(project.silp_estimated).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">SSS Contribution</div>
                                        <div className="font-medium text-lg">{project.sss_contribution ? `₱${Number(project.sss_contribution).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Philhealth Contribution</div>
                                        <div className="font-medium text-lg">{project.philhealth_contribution ? `₱${Number(project.philhealth_contribution).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Pagibig Contribution</div>
                                        <div className="font-medium text-lg">{project.pagibig_contribution ? `₱${Number(project.pagibig_contribution).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">ECC</div>
                                        <div className="font-medium text-lg">{project.ecc ? `₱${Number(project.ecc).toLocaleString()}` : '—'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Costs & Income */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Costs & Income</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Actual Supplies Cost (Year)</div>
                                        <div className="font-medium text-lg">{project.actual_supplies_cost_year ? `₱${Number(project.actual_supplies_cost_year).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Actual Equipment Cost (Year)</div>
                                        <div className="font-medium text-lg">{project.actual_equipment_cost_year ? `₱${Number(project.actual_equipment_cost_year).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Cost of Sales</div>
                                        <div className="font-medium text-lg">{project.cost_of_sales ? `₱${Number(project.cost_of_sales).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Total Service Income</div>
                                        <div className="font-medium text-lg text-green-600 font-semibold">{project.total_service_income ? `₱${Number(project.total_service_income).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Admin Cost (8000)</div>
                                        <div className="font-medium text-lg">{project.admin_cost_8000 ? `₱${Number(project.admin_cost_8000).toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Total</div>
                                        <div className="font-medium text-lg text-blue-600 font-bold">{project.total ? `₱${Number(project.total).toLocaleString()}` : '—'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timestamps</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Created At</div>
                                        <div className="font-medium text-lg">{project.created_at ? new Date(project.created_at).toLocaleString() : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-gray-500 text-sm">Updated At</div>
                                        <div className="font-medium text-lg">{project.updated_at ? new Date(project.updated_at).toLocaleString() : '—'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t flex gap-3">
                            <Link href="/admin/projects" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium">Back to Projects</Link>
                            <Link href={`/admin/projects/${project.id}/edit`} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium">Edit Project</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
