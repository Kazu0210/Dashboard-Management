

import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/admin/projects' },
    { title: 'Create Project', href: '#' },
];

const steps = [
    { label: 'Basic Info', fields: ['project_number', 'project_name', 'year', 'status'] },
    { label: 'Rates & Pricing', fields: ['fte', 'average_rate_per_employee', 'bid_price_one_year', 'half_year_bid_price'] },
    { label: 'Monthly & Taxes', fields: ['monthly_12', 'withholding_tax', 'vat', 'agency_fee'] },
    { label: 'Resources', fields: ['supplies', 'equipment', 'salary_expenses_year', 'thirteenth_month_estimated'] },
    { label: 'Contributions', fields: ['silp_estimated', 'sss_contribution', 'philhealth_contribution', 'pagibig_contribution', 'ecc'] },
    { label: 'Costs & Income', fields: ['actual_supplies_cost_year', 'actual_equipment_cost_year', 'cost_of_sales', 'total_service_income', 'admin_cost_8000', 'total'] },
];

const fieldLabels: Record<string, string> = {
    project_number: 'Project Number',
    project_name: 'Project Name',
    year: 'Year',
    fte: 'FTE (Full Time Equivalent)',
    average_rate_per_employee: 'Average Rate per Employee (₱)',
    bid_price_one_year: 'Bid Price - One Year (₱)',
    half_year_bid_price: 'Half Year Bid Price (₱)',
    status: 'Status',
    monthly_12: 'Monthly (12) (₱)',
    withholding_tax: 'Withholding Tax (₱)',
    vat: 'VAT (₱)',
    agency_fee: 'Agency Fee (₱)',
    supplies: 'Supplies (₱)',
    equipment: 'Equipment (₱)',
    salary_expenses_year: 'Salary Expenses (Year) (₱)',
    thirteenth_month_estimated: '13th Month Estimated (₱)',
    silp_estimated: 'SILP Estimated (₱)',
    sss_contribution: 'SSS Contribution (₱)',
    philhealth_contribution: 'Philhealth Contribution (₱)',
    pagibig_contribution: 'Pagibig Contribution (₱)',
    ecc: 'ECC (₱)',
    actual_supplies_cost_year: 'Actual Supplies Cost (Year) (₱)',
    actual_supplies_cost_jan_june: 'Actual Supplies Cost (Jan-June) (₱)',
    actual_equipment_cost_year: 'Actual Equipment Cost (Year) (₱)',
    profit_margin_10_percent: 'Profit Margin (10%) (₱)',
    total_supplies_equipment: 'Total Supplies and Equipment (₱)',
    vat_savings: 'VAT Savings (₱)',
    cost_of_sales: 'Cost of Sales (₱)',
    total_service_income: 'Total Service Income (₱)',
    admin_cost_8000: 'Admin Cost (8000) (₱)',
    total: 'Total (₱)',
};

const initialForm = {
    project_number: '',
    project_name: '',
    year: new Date().getFullYear(),
    fte: '',
    average_rate_per_employee: '',
    bid_price_one_year: '',
    half_year_bid_price: '',
    status: 'ongoing',
    monthly_12: '',
    withholding_tax: '',
    vat: '',
    agency_fee: '',
    supplies: '',
    equipment: '',
    salary_expenses_year: '',
    thirteenth_month_estimated: '',
    silp_estimated: '',
    sss_contribution: '',
    philhealth_contribution: '',
    pagibig_contribution: '',
    ecc: '',
    actual_supplies_cost_year: '',
    actual_supplies_cost_jan_june: '',
    actual_equipment_cost_year: '',
    profit_margin_10_percent: '',
    total_supplies_equipment: '',
    vat_savings: '',
    cost_of_sales: '',
    total_service_income: '',
    admin_cost_8000: '',
    total: '',
};

const CreateProject = () => {
    const [form, setForm] = useState(initialForm);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, any>>({});
    const [step, setStep] = useState(0);

    const handleChange = (field: string, value: any) => {
        setForm(f => ({ ...f, [field]: value }));
    };

    const handleNext = () => {
        setStep(s => Math.min(s + 1, steps.length - 1));
    };
    const handleBack = () => {
        setStep(s => Math.max(s - 1, 0));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        router.post('/admin/projects', form, {
            onError: (err) => {
                setErrors(err);
                setProcessing(false);
            },
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-900">Create Project</h2>
                        <p className="text-sm text-gray-500">
                            Enter project information and financial details.
                        </p>
                    </div>
                </div>

                {/* Stepper */}
                <div className="max-w-3xl mx-auto mb-6">
                    <ol className="flex items-center w-full text-sm font-medium text-gray-500">
                        {steps.map((s, idx) => (
                            <li key={s.label} className={`flex-1 flex items-center ${idx < step ? 'text-blue-600' : idx === step ? 'text-blue-900' : ''}`}>
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${idx <= step ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-white'} mr-2`}>{idx + 1}</span>
                                {s.label}
                                {idx < steps.length - 1 && <span className="flex-1 h-0.5 bg-gray-300 mx-2" />}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Tabbed Card */}
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-xl shadow-sm p-8">
                    <div className="mb-6 border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {steps.map((s, idx) => (
                                <button
                                    type="button"
                                    key={s.label}
                                    className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${step === idx ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                    onClick={() => setStep(idx)}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Fields for current step/tab */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {steps[step].fields.map(field => (
                            <div key={field} className={field === 'status' ? 'md:col-span-1' : ''}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{fieldLabels[field]}</label>
                                {field === 'status' ? (
                                    <select
                                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                        value={(form as any)[field]}
                                        onChange={e => handleChange(field, e.target.value)}
                                        required
                                    >
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                ) : (
                                    <input
                                        type={field === 'year' || ['fte', 'average_rate_per_employee', 'bid_price_one_year', 'half_year_bid_price', 'monthly_12', 'withholding_tax', 'vat', 'agency_fee', 'supplies', 'equipment', 'salary_expenses_year', 'thirteenth_month_estimated', 'silp_estimated', 'sss_contribution', 'philhealth_contribution', 'pagibig_contribution', 'ecc', 'actual_supplies_cost_year', 'actual_supplies_cost_jan_june', 'actual_equipment_cost_year', 'profit_margin_10_percent', 'total_supplies_equipment', 'vat_savings', 'cost_of_sales', 'total_service_income', 'admin_cost_8000', 'total'].includes(field) ? 'number' : 'text'}
                                        step={field === 'fte' || field.includes('rate') || field.includes('margin') ? '0.01' : undefined}
                                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                        value={(form as any)[field]}
                                        onChange={e => handleChange(field, field === 'year' ? Number(e.target.value) : e.target.value)}
                                        required={field === 'project_number' || field === 'project_name' || field === 'year'}
                                        placeholder={field === 'project_number' ? 'e.g., PROJ-2025-001' : undefined}
                                    />
                                )}
                                {errors[field] && (
                                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-8">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={step === 0}
                            className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-all ${step === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Back
                        </button>
                        {step < steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
                            >
                                {processing ? 'Saving...' : 'Create Project'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default CreateProject;
