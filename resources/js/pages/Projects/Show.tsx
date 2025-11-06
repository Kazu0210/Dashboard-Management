import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Pencil, ArrowLeft, Briefcase, Calculator, DollarSign, TrendingUp } from 'lucide-react';
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
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900">{project.project_name}</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Project Number: {project.project_number} • Year: {project.year}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all shadow-md"
                        >
                            <ArrowLeft size={18} /> Back to Projects
                        </Link>
                        <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md"
                        >
                            <Pencil size={18} /> Edit Project
                        </Link>
                    </div>
                </div>

                {/* Basic Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Basic Information</CardTitle>
                                <CardDescription className="text-gray-500">Project details and status</CardDescription>
                            </div>
                            <Briefcase className="w-5 h-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
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
                                <div className="col-span-full">
                                    <div className="mb-2 text-gray-500 text-sm">Status</div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        project.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        project.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                        {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Rates & Pricing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Rates & Pricing</CardTitle>
                                <CardDescription className="text-gray-500">Employee rates and project pricing</CardDescription>
                            </div>
                            <DollarSign className="w-5 h-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">FTE</div>
                                    <div className="font-medium text-lg">{project.fte && !isNaN(Number(project.fte)) ? Number(project.fte).toFixed(2) : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Average Rate per Employee</div>
                                    <div className="font-medium text-lg">{project.average_rate_per_employee && !isNaN(Number(project.average_rate_per_employee)) ? `₱${Number(project.average_rate_per_employee).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Bid Price - One Year</div>
                                    <div className="font-medium text-lg">{project.bid_price_one_year && !isNaN(Number(project.bid_price_one_year)) ? `₱${Number(project.bid_price_one_year).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Half Year Bid Price</div>
                                    <div className="font-medium text-lg">{project.half_year_bid_price && !isNaN(Number(project.half_year_bid_price)) ? `₱${Number(project.half_year_bid_price).toLocaleString()}` : '—'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Monthly & Taxes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                >
                    <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Monthly & Taxes</CardTitle>
                                <CardDescription className="text-gray-500">Tax calculations and monthly amounts</CardDescription>
                            </div>
                            <Calculator className="w-5 h-5 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Monthly (12)</div>
                                    <div className="font-medium text-lg">{project.monthly_12 && !isNaN(Number(project.monthly_12)) ? `₱${Number(project.monthly_12).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Withholding Tax</div>
                                    <div className="font-medium text-lg">{project.withholding_tax && !isNaN(Number(project.withholding_tax)) ? `₱${Number(project.withholding_tax).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">VAT</div>
                                    <div className="font-medium text-lg">{project.vat && !isNaN(Number(project.vat)) ? `₱${Number(project.vat).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Agency Fee</div>
                                    <div className="font-medium text-lg">{project.agency_fee && !isNaN(Number(project.agency_fee)) ? `₱${Number(project.agency_fee).toLocaleString()}` : '—'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Resources & Expenses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8"
                >
                    <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Resources & Expenses</CardTitle>
                                <CardDescription className="text-gray-500">Supplies, equipment and salary information</CardDescription>
                            </div>
                            <TrendingUp className="w-5 h-5 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Supplies</div>
                                    <div className="font-medium text-lg">{project.supplies && !isNaN(Number(project.supplies)) ? `₱${Number(project.supplies).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Equipment</div>
                                    <div className="font-medium text-lg">{project.equipment && !isNaN(Number(project.equipment)) ? `₱${Number(project.equipment).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Salary Expenses (Year)</div>
                                    <div className="font-medium text-lg">{project.salary_expenses_year && !isNaN(Number(project.salary_expenses_year)) ? `₱${Number(project.salary_expenses_year).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">13th Month Estimated</div>
                                    <div className="font-medium text-lg">{project.thirteenth_month_estimated && !isNaN(Number(project.thirteenth_month_estimated)) ? `₱${Number(project.thirteenth_month_estimated).toLocaleString()}` : '—'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contributions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8"
                >
                    <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Contributions</CardTitle>
                                <CardDescription className="text-gray-500">Government contributions and benefits</CardDescription>
                            </div>
                            <Calculator className="w-5 h-5 text-indigo-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">SILP Estimated</div>
                                    <div className="font-medium text-lg">{project.silp_estimated && !isNaN(Number(project.silp_estimated)) ? `₱${Number(project.silp_estimated).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">SSS Contribution</div>
                                    <div className="font-medium text-lg">{project.sss_contribution && !isNaN(Number(project.sss_contribution)) ? `₱${Number(project.sss_contribution).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Philhealth Contribution</div>
                                    <div className="font-medium text-lg">{project.philhealth_contribution && !isNaN(Number(project.philhealth_contribution)) ? `₱${Number(project.philhealth_contribution).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Pagibig Contribution</div>
                                    <div className="font-medium text-lg">{project.pagibig_contribution && !isNaN(Number(project.pagibig_contribution)) ? `₱${Number(project.pagibig_contribution).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">ECC</div>
                                    <div className="font-medium text-lg">{project.ecc && !isNaN(Number(project.ecc)) ? `₱${Number(project.ecc).toLocaleString()}` : '—'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Costs & Income */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Costs & Income</CardTitle>
                                <CardDescription className="text-gray-500">Final costs and total income calculation</CardDescription>
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Actual Supplies Cost (Year)</div>
                                    <div className="font-medium text-lg">{project.actual_supplies_cost_year && !isNaN(Number(project.actual_supplies_cost_year)) ? `₱${Number(project.actual_supplies_cost_year).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Actual Equipment Cost (Year)</div>
                                    <div className="font-medium text-lg">{project.actual_equipment_cost_year && !isNaN(Number(project.actual_equipment_cost_year)) ? `₱${Number(project.actual_equipment_cost_year).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Cost of Sales</div>
                                    <div className="font-medium text-lg">{project.cost_of_sales && !isNaN(Number(project.cost_of_sales)) ? `₱${Number(project.cost_of_sales).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Total Service Income</div>
                                    <div className="font-medium text-lg text-green-600 font-semibold">{project.total_service_income && !isNaN(Number(project.total_service_income)) ? `₱${Number(project.total_service_income).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Admin Cost (8000)</div>
                                    <div className="font-medium text-lg">{project.admin_cost_8000 && !isNaN(Number(project.admin_cost_8000)) ? `₱${Number(project.admin_cost_8000).toLocaleString()}` : '—'}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-gray-500 text-sm">Total</div>
                                    <div className="font-medium text-lg text-blue-600 font-bold">{project.total && !isNaN(Number(project.total)) ? `₱${Number(project.total).toLocaleString()}` : '—'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AppLayout>
    );
}