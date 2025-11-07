import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Briefcase, Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/admin/projects' },
    { title: 'Edit Project', href: '#' },
];

type Project = {
    id: number;
    project_number: string;
    project_name: string;
    year: number;
    fte: number;
    average_rate_per_employee: number;
    bid_price_one_year: number;
    half_year_bid_price: number;
    status: string;
    monthly_12: number;
    withholding_tax: number;
    vat: number;
    agency_fee: number;
    supplies: number;
    equipment: number;
    salary_expenses_year: number;
    thirteenth_month_estimated: number;
    silp_estimated: number;
    sss_contribution: number;
    philhealth_contribution: number;
    pagibig_contribution: number;
    ecc: number;
    actual_supplies_cost_year: number;
    actual_supplies_cost_jan_june: number;
    actual_equipment_cost_year: number;
    profit_margin_10_percent: number;
    total_supplies_equipment: number;
    vat_savings: number;
    cost_of_sales: number;
    total_service_income: number;
    admin_cost_8000: number;
    total: number;
    created_at: string;
    updated_at: string;
};

type ProjectStatus = {
    id: number;
    name: string;
};

const EditProject = () => {
    const props = usePage().props as { project?: Project; projectStatuses?: ProjectStatus[] };
    const project = props.project;
    const projectStatuses = props.projectStatuses || [];

    if (!project) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-gray-500 text-lg">Loading project data...</div>
                </div>
            </AppLayout>
        );
    }

    const [form, setForm] = useState({
        project_number: project.project_number || '',
        project_name: project.project_name || '',
        year: project.year || new Date().getFullYear(),
        fte: project.fte || '',
        average_rate_per_employee: project.average_rate_per_employee || '',
        bid_price_one_year: project.bid_price_one_year || '',
        half_year_bid_price: project.half_year_bid_price || '',
        status: project.status || 'ongoing',
        monthly_12: project.monthly_12 || '',
        withholding_tax: project.withholding_tax || '',
        vat: project.vat || '',
        agency_fee: project.agency_fee || '',
        supplies: project.supplies || '',
        equipment: project.equipment || '',
        salary_expenses_year: project.salary_expenses_year || '',
        thirteenth_month_estimated: project.thirteenth_month_estimated || '',
        silp_estimated: project.silp_estimated || '',
        sss_contribution: project.sss_contribution || '',
        philhealth_contribution: project.philhealth_contribution || '',
        pagibig_contribution: project.pagibig_contribution || '',
        ecc: project.ecc || '',
        actual_supplies_cost_year: project.actual_supplies_cost_year || '',
        actual_supplies_cost_jan_june: project.actual_supplies_cost_jan_june || '',
        actual_equipment_cost_year: project.actual_equipment_cost_year || '',
        profit_margin_10_percent: project.profit_margin_10_percent || '',
        total_supplies_equipment: project.total_supplies_equipment || '',
        vat_savings: project.vat_savings || '',
        cost_of_sales: project.cost_of_sales || '',
        total_service_income: project.total_service_income || '',
        admin_cost_8000: project.admin_cost_8000 || '',
        total: project.total || '',
    });

    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        router.put(`/admin/projects/${project.id}`, form, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Project: ${project.project_name}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900">Edit Project</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Update project information and financial details for {project.project_name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all shadow-md"
                        >
                            <ArrowLeft size={18} /> Back to Projects
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border-none shadow-md bg-white/80 backdrop-blur rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-semibold text-gray-900">Basic Information</CardTitle>
                                    <CardDescription className="text-gray-500">Project details and identification</CardDescription>
                                </div>
                                <Briefcase className="w-5 h-5 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Number</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.project_number}
                                            onChange={e => setForm(f => ({ ...f, project_number: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-1 lg:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.project_name}
                                            onChange={e => setForm(f => ({ ...f, project_name: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.year}
                                            onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <select
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.status}
                                            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                            required
                                        >
                                            <option value="">Select Status</option>
                                            {projectStatuses.map((status) => (
                                                <option key={status.id} value={status.name}>
                                                    {status.name.charAt(0).toUpperCase() + status.name.slice(1)}
                                                </option>
                                            ))}
                                        </select>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">FTE</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.fte}
                                            onChange={e => setForm(f => ({ ...f, fte: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Average Rate per Employee (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.average_rate_per_employee}
                                            onChange={e => setForm(f => ({ ...f, average_rate_per_employee: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Bid Price - One Year (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.bid_price_one_year}
                                            onChange={e => setForm(f => ({ ...f, bid_price_one_year: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Half Year Bid Price (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.half_year_bid_price}
                                            onChange={e => setForm(f => ({ ...f, half_year_bid_price: e.target.value }))}
                                        />
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly (12) (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.monthly_12}
                                            onChange={e => setForm(f => ({ ...f, monthly_12: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Withholding Tax (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.withholding_tax}
                                            onChange={e => setForm(f => ({ ...f, withholding_tax: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">VAT (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.vat}
                                            onChange={e => setForm(f => ({ ...f, vat: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Agency Fee (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.agency_fee}
                                            onChange={e => setForm(f => ({ ...f, agency_fee: e.target.value }))}
                                        />
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Supplies (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.supplies}
                                            onChange={e => setForm(f => ({ ...f, supplies: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Equipment (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.equipment}
                                            onChange={e => setForm(f => ({ ...f, equipment: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Salary Expenses (Year) (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.salary_expenses_year}
                                            onChange={e => setForm(f => ({ ...f, salary_expenses_year: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">13th Month Estimated (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.thirteenth_month_estimated}
                                            onChange={e => setForm(f => ({ ...f, thirteenth_month_estimated: e.target.value }))}
                                        />
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">SILP Estimated (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.silp_estimated}
                                            onChange={e => setForm(f => ({ ...f, silp_estimated: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">SSS Contribution (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.sss_contribution}
                                            onChange={e => setForm(f => ({ ...f, sss_contribution: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Philhealth Contribution (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.philhealth_contribution}
                                            onChange={e => setForm(f => ({ ...f, philhealth_contribution: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pagibig Contribution (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.pagibig_contribution}
                                            onChange={e => setForm(f => ({ ...f, pagibig_contribution: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ECC (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.ecc}
                                            onChange={e => setForm(f => ({ ...f, ecc: e.target.value }))}
                                        />
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Actual Supplies Cost (Year) (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.actual_supplies_cost_year}
                                            onChange={e => setForm(f => ({ ...f, actual_supplies_cost_year: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Actual Equipment Cost (Year) (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.actual_equipment_cost_year}
                                            onChange={e => setForm(f => ({ ...f, actual_equipment_cost_year: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Profit Margin (10%) (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.profit_margin_10_percent}
                                            onChange={e => setForm(f => ({ ...f, profit_margin_10_percent: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Supplies and Equipment (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.total_supplies_equipment}
                                            onChange={e => setForm(f => ({ ...f, total_supplies_equipment: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">VAT Savings (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.vat_savings}
                                            onChange={e => setForm(f => ({ ...f, vat_savings: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cost of Sales (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.cost_of_sales}
                                            onChange={e => setForm(f => ({ ...f, cost_of_sales: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Service Income (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.total_service_income}
                                            onChange={e => setForm(f => ({ ...f, total_service_income: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Admin Cost (8000) (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.admin_cost_8000}
                                            onChange={e => setForm(f => ({ ...f, admin_cost_8000: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Total (₱)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 px-4 py-3 transition-all shadow-sm"
                                            value={form.total}
                                            onChange={e => setForm(f => ({ ...f, total: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex justify-end"
                    >
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-md transition-all disabled:opacity-50"
                        >
                            <Save size={18} />
                            {processing ? 'Updating...' : 'Update Project'}
                        </button>
                    </motion.div>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditProject;