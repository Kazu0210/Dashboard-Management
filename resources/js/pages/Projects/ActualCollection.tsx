

import { StatCard } from "@/components/StatCard";
import { DollarSign, TrendingUp } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      <div className="space-y-6 p-4 bg-white min-h-screen text-green-900 transition-colors">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Collection Overview</h2>
            <p className="text-lg mt-1 text-neutral-700">Track your project collections and balances.</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-green-50 rounded-lg p-6 shadow max-w-4xl mx-auto w-full">
          <h3 className="font-semibold mb-2">Collection Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-green-200 text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left font-semibold text-green-900">Date</th>
                  <th className="px-3 py-3.5 text-left font-semibold text-green-900">Project</th>
                  <th className="px-3 py-3.5 text-left font-semibold text-green-900">Collector</th>
                  <th className="px-3 py-3.5 text-right font-semibold text-green-900">Amount</th>
                  <th className="px-3 py-3.5 text-left font-semibold text-green-900">Notes</th>
                  <th className="px-3 py-3.5 text-right font-semibold text-green-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="whitespace-nowrap px-3 py-4">{entry.date}</td>
                    <td className="whitespace-nowrap px-3 py-4">{entry.project}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-green-700">{entry.collector}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-right">₱{formatCurrency(entry.amount)}</td>
                    <td className="px-3 py-4 text-green-700">{entry.notes}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(entry.id)} className="text-green-700 hover:underline mr-2">Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(entry.id)} className="text-red-600 hover:underline">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-3 py-4 font-semibold text-green-900">Total</td>
                  <td className="whitespace-nowrap px-3 py-4 text-right font-semibold text-green-900">₱{formatCurrency(total)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg mt-8 max-w-4xl mx-auto w-full">
          <div className="p-6 text-green-900">
            <h3 className="text-lg font-medium mb-4">Add / Edit Collection Entry</h3>
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="project">Project</Label>
                  <Input
                    id="project"
                    type="text"
                    value={form.project}
                    onChange={(e) => handleChange("project", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="collector">Collector</Label>
                  <Input
                    id="collector"
                    type="text"
                    value={form.collector}
                    onChange={(e) => handleChange("collector", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    ref={amountRef}
                    value={form.amount}
                    onChange={(e) => handleChange("amount", parseFloat(e.target.value) || 0)}
                    className="mt-1"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="mt-1 block w-full rounded-md border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={2}
                />
              </div>
              <div>
                <Button type="submit" variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                  {editingId ? "Update Entry" : "Add Entry"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Collection;
