import AppLayout from '@/layouts/app-layout';
import { usePage, Link, router } from '@inertiajs/react';
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

const EditProject = () => {
    const props = usePage().props as { project?: Project };
    const project = props.project;

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/admin/projects/${project.id}`, form);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-900">Edit Project</h2>
                        <p className="text-sm text-gray-500">
                            Update project information and financial details.
                        </p>
                    </div>
                    <Link
                        href={`/admin/projects`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-all"
                    >
                        ← Back to Projects
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-6xl mx-auto bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-8"
                >
                    {/* Basic Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Number</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.project_number}
                                    onChange={e => setForm(f => ({ ...f, project_number: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="md:col-span-1 lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.project_name}
                                    onChange={e => setForm(f => ({ ...f, project_name: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.year}
                                    onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rates and Pricing */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rates & Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">FTE</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.fte}
                                    onChange={e => setForm(f => ({ ...f, fte: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Average Rate per Employee (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.average_rate_per_employee}
                                    onChange={e => setForm(f => ({ ...f, average_rate_per_employee: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bid Price - One Year (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.bid_price_one_year}
                                    onChange={e => setForm(f => ({ ...f, bid_price_one_year: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Half Year Bid Price (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.half_year_bid_price}
                                    onChange={e => setForm(f => ({ ...f, half_year_bid_price: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.status}
                                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                    required
                                >
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Monthly & Taxes */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly & Taxes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly (12) (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.monthly_12}
                                    onChange={e => setForm(f => ({ ...f, monthly_12: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Withholding Tax (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.withholding_tax}
                                    onChange={e => setForm(f => ({ ...f, withholding_tax: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">VAT (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.vat}
                                    onChange={e => setForm(f => ({ ...f, vat: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Agency Fee (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.agency_fee}
                                    onChange={e => setForm(f => ({ ...f, agency_fee: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources & Expenses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Supplies (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.supplies}
                                    onChange={e => setForm(f => ({ ...f, supplies: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.equipment}
                                    onChange={e => setForm(f => ({ ...f, equipment: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Expenses (Year) (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.salary_expenses_year}
                                    onChange={e => setForm(f => ({ ...f, salary_expenses_year: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">13th Month Estimated (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.thirteenth_month_estimated}
                                    onChange={e => setForm(f => ({ ...f, thirteenth_month_estimated: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contributions */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SILP Estimated (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.silp_estimated}
                                    onChange={e => setForm(f => ({ ...f, silp_estimated: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SSS Contribution (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.sss_contribution}
                                    onChange={e => setForm(f => ({ ...f, sss_contribution: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Philhealth Contribution (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.philhealth_contribution}
                                    onChange={e => setForm(f => ({ ...f, philhealth_contribution: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pagibig Contribution (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.pagibig_contribution}
                                    onChange={e => setForm(f => ({ ...f, pagibig_contribution: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ECC (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.ecc}
                                    onChange={e => setForm(f => ({ ...f, ecc: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Costs & Income */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Costs & Income</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Actual Supplies Cost (Year) (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.actual_supplies_cost_year}
                                    onChange={e => setForm(f => ({ ...f, actual_supplies_cost_year: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Actual Equipment Cost (Year) (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.actual_equipment_cost_year}
                                    onChange={e => setForm(f => ({ ...f, actual_equipment_cost_year: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cost of Sales (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.cost_of_sales}
                                    onChange={e => setForm(f => ({ ...f, cost_of_sales: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Service Income (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.total_service_income}
                                    onChange={e => setForm(f => ({ ...f, total_service_income: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Cost (8000) (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.admin_cost_8000}
                                    onChange={e => setForm(f => ({ ...f, admin_cost_8000: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total (₱)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form.total}
                                    onChange={e => setForm(f => ({ ...f, total: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
                        >
                            Update Project
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditProject;
