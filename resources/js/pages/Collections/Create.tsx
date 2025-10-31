import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

const CreateCollectionIndex = () => {
    const { projects = [] } = usePage().props as {
        projects?: { id: number; name: string }[];
    };

    const { data, setData, post, processing, errors } = useForm({
        project_id: '',
        billing_period: '',
        billed_amount: '',
        collected_amount: '',
        balance: '',
        status: 'Pending',
    });

    // Auto calculate balance
    const handleAmountChange = (field: 'billed_amount' | 'collected_amount', value: string) => {
        const numericValue = value === '' ? '' : Number(value);
        setData(field, numericValue);

        const billed = field === 'billed_amount' ? numericValue : Number(data.billed_amount);
        const collected = field === 'collected_amount' ? numericValue : Number(data.collected_amount);

        if (!isNaN(billed) && !isNaN(collected)) {
            setData('balance', billed - collected);
        }
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/collections');
    }

    return (
        <AppLayout>
            <Head title="Create Collection" />
            <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Create Collection</h2>
                            <p className="text-lg mt-1 text-gray-600">
                                Fill out the form to add a new collection record.
                            </p>
                        </div>
                        <Link href="/admin/collections" className="text-sm text-gray-600 hover:underline">
                            Back to list
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className="bg-white rounded-lg p-6 shadow w-full">
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Project */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Project</label>
                                    <select
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={data.project_id}
                                        onChange={(e) => setData('project_id', e.target.value)}
                                        required
                                        disabled={processing}
                                    >
                                        <option value="">Select a project</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.project_id && <div className="text-red-600 text-sm">{errors.project_id}</div>}
                                </div>

                                {/* Billing Period */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Billing Period</label>
                                    <input
                                        type="text"
                                        value={data.billing_period}
                                        onChange={(e) => setData('billing_period', e.target.value)}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                                        placeholder="Example: January 2025 / Q1-2025"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.billing_period && <div className="text-red-600 text-sm">{errors.billing_period}</div>}
                                </div>

                                {/* Billed Amount */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Billed Amount</label>
                                    <input
                                        type="number"
                                        value={data.billed_amount}
                                        onChange={(e) => handleAmountChange('billed_amount', e.target.value)}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.billed_amount && <div className="text-red-600 text-sm">{errors.billed_amount}</div>}
                                </div>

                                {/* Collected */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Collected</label>
                                    <input
                                        type="number"
                                        value={data.collected_amount}
                                        onChange={(e) => handleAmountChange('collected_amount', e.target.value)}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.collected_amount && <div className="text-red-600 text-sm">{errors.collected_amount}</div>}
                                </div>

                                {/* Balance (readonly) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Balance</label>
                                    <input
                                        type="number"
                                        value={data.balance}
                                        readOnly
                                        className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                        disabled={processing}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Partial">Partial</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                    {errors.status && <div className="text-red-600 text-sm">{errors.status}</div>}
                                </div>

                                {/* Action buttons */}
                                <div className="flex justify-end gap-2 mt-2">
                                    <Link href="/admin/collections" className="px-4 py-2 border rounded-md text-sm">
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                                        disabled={processing}
                                    >
                                        {processing ? 'Creating...' : 'Create'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CreateCollectionIndex;
