

import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/admin/projects' },
    { title: 'Create Project', href: '#' },
];

const steps = [
    { label: 'Details', fields: ['project_name', 'client', 'location', 'duration'] },
    { label: 'Financials', fields: ['contract_amount', 'personnel', 'payroll', 'supplies', 'collected', 'net_income'] },
    { label: 'Status', fields: ['status', 'billing_status'] },
];

const fieldLabels: Record<string, string> = {
    project_name: 'Project Name',
    client: 'Client',
    location: 'Location',
    contract_amount: 'Contract Amount (₱)',
    duration: 'Duration',
    status: 'Status',
    personnel: 'Personnel',
    payroll: 'Payroll (₱)',
    supplies: 'Supplies (₱)',
    billing_status: 'Billing Status',
    collected: 'Collected (₱)',
    net_income: 'Net Income (₱)',
};

const initialForm = {
    project_name: '',
    client: '',
    location: '',
    contract_amount: '',
    duration: '',
    status: '',
    personnel: 0,
    payroll: '',
    supplies: '',
    billing_status: '',
    collected: '',
    net_income: '',
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
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{fieldLabels[field]}</label>
                                <input
                                    type={['contract_amount','payroll','supplies','collected','net_income','personnel'].includes(field) ? 'number' : 'text'}
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    value={form[field]}
                                    onChange={e => handleChange(field, field === 'personnel' ? Number(e.target.value) : e.target.value)}
                                    required
                                />
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
