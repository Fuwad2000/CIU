"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatDateTime } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { PortalEvent, PortalEventCategory } from "@/lib/portal/types";

const emptyEvent = {
  title: "",
  category: "community" as PortalEventCategory,
  dateLabel: "",
  date: "",
  time: "",
  location: "",
  description: "",
  tags: "",
  href: "/Events",
  buttonLabel: "View Details",
  image: "",
  recurring: false,
  featured: false,
};

export default function AdminEventsPage() {
  const [items, setItems] = useState<PortalEvent[]>([]);
  const [form, setForm] = useState(emptyEvent);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = () =>
    adminFetch<PortalEvent[]>("/api/admin/events")
      .then(setItems)
      .catch((err: Error) => setError(err.message));

  useEffect(() => {
    void load();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await adminFetch(`/api/admin/events/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/api/admin/events", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setForm(emptyEvent);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save event.");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await adminFetch(`/api/admin/events/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Public site"
        title="Events"
        description="Add, edit, or remove events. The public Events page reads this same list."
      />

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-border/80 bg-surface p-5 shadow-sm md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Title</span>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={formInputClassName} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Category</span>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as PortalEventCategory })} className={formInputClassName}>
            {["education", "youth", "family", "community", "spiritual", "volunteer"].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Date label</span>
          <input required value={form.dateLabel} onChange={(e) => setForm({ ...form, dateLabel: e.target.value })} className={formInputClassName} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Sort date (YYYY-MM-DD)</span>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={formInputClassName} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Time</span>
          <input required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={formInputClassName} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Location</span>
          <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={formInputClassName} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Description</span>
          <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${formInputClassName} min-h-[100px]`} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Button link</span>
          <input required value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} className={formInputClassName} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Button label</span>
          <input value={form.buttonLabel} onChange={(e) => setForm({ ...form, buttonLabel: e.target.value })} className={formInputClassName} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Tags (comma separated)</span>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={formInputClassName} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium xl:text-base">Image URL</span>
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={formInputClassName} />
        </label>
        <label className="flex items-center gap-2 text-sm xl:text-base">
          <input type="checkbox" checked={form.recurring} onChange={(e) => setForm({ ...form, recurring: e.target.checked })} />
          Recurring
        </label>
        <label className="flex items-center gap-2 text-sm xl:text-base">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Featured
        </label>
        {error ? <p className="md:col-span-2 text-sm text-red-700">{error}</p> : null}
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white xl:text-base">
            {editingId ? "Update event" : "Add event"}
          </button>
          {editingId ? (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyEvent); }} className="text-sm text-muted">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={CalendarDays}
            title="No events yet"
            description="Create an event above and it will appear on the public Events page."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-[#f8f5f0] text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-muted">{item.location}</p>
                    </td>
                    <td className="px-4 py-3">{item.dateLabel} · {item.time}</td>
                    <td className="px-4 py-3 text-muted">{formatDateTime(item.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="text-brand"
                          onClick={() => {
                            setEditingId(item.id);
                            setForm({
                              title: item.title,
                              category: item.category,
                              dateLabel: item.dateLabel,
                              date: item.date ?? "",
                              time: item.time,
                              location: item.location,
                              description: item.description,
                              tags: item.tags.join(", "),
                              href: item.href,
                              buttonLabel: item.buttonLabel,
                              image: item.image ?? "",
                              recurring: Boolean(item.recurring),
                              featured: Boolean(item.featured),
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button type="button" className="text-red-700" onClick={() => remove(item.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
