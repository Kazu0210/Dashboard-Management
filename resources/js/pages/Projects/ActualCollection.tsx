
import { StatCard } from "@/components/StatCard";
import { DollarSign, TrendingUp } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect, useRef } from 'react';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

type CollectionEntry = {
  id: string;
  date: string;
  project: string;
  collector?: string;
  amount: number;
  notes?: string;
};

const STORAGE_KEY = "collections_simple_v1";
const formatCurrency = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

const initialChartData = {
  amounts: [12000, 15000, 18000, 20000, 22000, 25000, 27000],
  months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
};

const Collection = () => {
  const [entries, setEntries] = useState<CollectionEntry[]>([]);
  const [form, setForm] = useState<Partial<CollectionEntry>>({
    date: new Date().toISOString().slice(0, 10),
    project: "",
    collector: "",
    amount: 0,
    notes: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [chartData] = useState(initialChartData);
  const amountRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setEntries(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleChange = (key: keyof CollectionEntry, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.project || !form.amount) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      setEntries((prev) =>
        prev.map((e) => (e.id === editingId ? { ...e, ...form, amount: Number(form.amount) } : e))
      );
      setEditingId(null);
    } else {
      const newEntry: CollectionEntry = {
        id: uid(),
        date: form.date!,
        project: form.project!,
        collector: form.collector || "",
        amount: Number(form.amount),
        notes: form.notes || "",
      };
      setEntries((prev) => [newEntry, ...prev]);
    }

    setForm({
      date: new Date().toISOString().slice(0, 10),
      project: "",
      collector: "",
      amount: 0,
      notes: "",
    });
    amountRef.current?.focus();
  };

  const handleEdit = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    setForm(entry);
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this entry?")) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const total = entries.reduce((sum, e) => sum + e.amount, 0);



  return (
    <AppLayout>
      <div className="space-y-6 p-4 bg-background min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-primary">Collection Overview</h2>
            <p className="text-lg text-secondary mt-1">Track your project collections and balances.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Collected"
            value={`₱${formatCurrency(total)}`}
            change={"+5.2%"}
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Entries"
            value={entries.length.toLocaleString()}
            change={"+2.1%"}
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* Table Section */}
        <div className="bg-card rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2">Collection Table</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Project</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Collector</th>
                  <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                  <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{entry.date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{entry.project}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.collector}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">
                      ₱{formatCurrency(entry.amount)}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">{entry.notes}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                      <button
                        onClick={() => handleEdit(entry.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-3 py-4 text-sm font-semibold text-gray-900">
                    Total
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-semibold text-gray-900">
                    ₱{formatCurrency(total)}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8">
          <div className="p-6 text-gray-900">
            <h3 className="text-lg font-medium mb-4">Add / Edit Collection Entry</h3>
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project</label>
                  <input
                    type="text"
                    value={form.project}
                    onChange={(e) => handleChange("project", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Collector</label>
                  <input
                    type="text"
                    value={form.collector}
                    onChange={(e) => handleChange("collector", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    ref={amountRef}
                    value={form.amount}
                    onChange={(e) => handleChange("amount", parseFloat(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={2}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {editingId ? "Update Entry" : "Add Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Collection;
