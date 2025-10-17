import React, { useEffect, useRef, useState } from "react";
import { Head } from '@inertiajs/react';

type CollectionEntry = {
  id: string;
  date: string;
  project: string;
  collector?: string;
  amount: number;
  notes?: string;
};

const STORAGE_KEY = "actualCollections_simple_v1";

const formatCurrency = (value: number) =>
  value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export default function ActualCollection() {
  const [entries, setEntries] = useState<CollectionEntry[]>([]);
  const [form, setForm] = useState<Partial<CollectionEntry>>({
    date: new Date().toISOString().slice(0, 10),
    project: "",
    collector: "",
    amount: 0,
    notes: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const amountRef = useRef<HTMLInputElement | null>(null);

  // Load existing entries
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setEntries(JSON.parse(raw));
  }, []);

  // Save whenever entries change
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

    // Reset form
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
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto", fontFamily: "Segoe UI, sans-serif" }}>
      <h2>Actual Collection Tracker</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        <input
          type="date"
          value={form.date || ""}
          onChange={(e) => handleChange("date", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Project name"
          value={form.project || ""}
          onChange={(e) => handleChange("project", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Collector name"
          value={form.collector || ""}
          onChange={(e) => handleChange("collector", e.target.value)}
        />
        <input
          ref={amountRef}
          type="number"
          placeholder="Amount"
          value={form.amount ?? ""}
          onChange={(e) => handleChange("amount", Number(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Notes"
          value={form.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
        <button type="submit">
          {editingId ? "Save Changes" : "Add Collection"}
        </button>
      </form>

      <h3>Total Amount: ₱{formatCurrency(total)}</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f9f9f9" }}>
          <tr>
            <th style={th}>Date</th>
            <th style={th}>Project</th>
            <th style={th}>Collector</th>
            <th style={th}>Amount</th>
            <th style={th}>Notes</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 10 }}>
                No records yet
              </td>
            </tr>
          ) : (
            entries.map((e) => (
              <tr key={e.id}>
                <td style={td}>{e.date}</td>
                <td style={td}>{e.project}</td>
                <td style={td}>{e.collector}</td>
                <td style={{ ...td, textAlign: "right" }}>₱{formatCurrency(e.amount)}</td>
                <td style={td}>{e.notes}</td>
                <td style={td}>
                  <button onClick={() => handleEdit(e.id)} style={{ marginRight: 6 }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(e.id)} style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "1px solid #ccc",
};

const td: React.CSSProperties = {
  padding: "8px",
  borderBottom: "1px solid #eee",
};