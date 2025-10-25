import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

const CreateCollectionIndex = () => {
    const { projects = [] } = usePage().props as { projects?: { id: number, name: string }[] };
    const { data, setData, post, processing, errors } = useForm({
        date: new Date().toISOString().slice(0, 10),
        project_id: '',
        collector: '',
        amount: '',
        notes: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/collections');
    }

    return (
        <AppLayout>
            <Head title="Create Collection" />
            <div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900">Create Collection</h2>
                        <p className="text-lg mt-1 text-neutral-700">Fill out the form to add a new collection record.</p>
                    </div>
                </div>
                <div className="bg-green-50 rounded-lg p-6 shadow max-w-2xl mx-auto w-full">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={data.date}
                                onChange={e => setData('date', e.target.value)}
                                className="mt-1"
                                required
                                disabled={processing}
                            />
                            {errors.date && <div className="text-red-600 text-sm mt-1">{errors.date}</div>}
                        </div>
                        <div>
                            <Label htmlFor="project_id">Project</Label>
                            <select
                                id="project_id"
                                name="project_id"
                                className="mt-1 w-full border rounded-md px-3 py-2"
                                value={data.project_id}
                                onChange={e => setData('project_id', e.target.value)}
                                required
                                disabled={processing}
                            >
                                <option value="">Select a project</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </select>
                            {errors.project_id && <div className="text-red-600 text-sm mt-1">{errors.project_id}</div>}
                        </div>
                        <div>
                            <Label htmlFor="collector">Collector</Label>
                            <Input
                                id="collector"
                                name="collector"
                                type="text"
                                value={data.collector}
                                onChange={e => setData('collector', e.target.value)}
                                className="mt-1"
                                required
                                disabled={processing}
                            />
                            {errors.collector && <div className="text-red-600 text-sm mt-1">{errors.collector}</div>}
                        </div>
                        <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                                className="mt-1"
                                required
                                disabled={processing}
                            />
                            {errors.amount && <div className="text-red-600 text-sm mt-1">{errors.amount}</div>}
                        </div>
                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <Input
                                id="notes"
                                name="notes"
                                type="text"
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                                className="mt-1"
                                disabled={processing}
                            />
                            {errors.notes && <div className="text-red-600 text-sm mt-1">{errors.notes}</div>}
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button asChild variant="outline" className="bg-muted text-foreground">
                                <Link href="/admin/collections">Cancel</Link>
                            </Button>
                            <Button type="submit" variant="default" className="bg-green-500 hover:bg-green-600 text-white" disabled={processing}>
                                {processing ? 'Creating...' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

export default CreateCollectionIndex;

