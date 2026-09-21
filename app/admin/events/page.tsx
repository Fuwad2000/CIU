"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, Plus, X } from "lucide-react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { adminFetch, formatDateTime } from "@frontend/portal/client";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import { parseStoredEventTime } from "@shared/event-datetime";
import PosterUpload from "@frontend/components/admin/PosterUpload";
import { formInputClassName } from "@frontend/lib/formStyles";
import type { PosterImageInput } from "@shared/poster-image";
import type { PortalEvent, PortalEventCategory } from "@shared/types";

type ColumnKey = "event" | "category" | "when" | "updated";

const accessors: Record<ColumnKey, (item: PortalEvent) => { sort: string; filter: string }> = {
  event: (item) => ({
    sort: item.title,
    filter: [item.title, item.location, item.featured ? "Featured" : "", item.recurring ? "Recurring" : ""]
      .filter(Boolean)
      .join(" "),
  }),
  category: (item) => ({ sort: item.category, filter: item.category }),
  when: (item) => ({
    sort: item.date || item.dateLabel,
    filter: `${item.dateLabel} · ${item.time}`,
  }),
  updated: (item) => ({ sort: item.updatedAt, filter: formatDateTime(item.updatedAt) }),
};

const headers: Array<{ key: ColumnKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "event", label: "Event", sort: true, filter: true },
  { key: "category", label: "Category", sort: true, filter: true },
  { key: "when", label: "When", sort: true },
  { key: "updated", label: "Updated", sort: true },
];

const emptyEvent = {
  title: "",
  category: "community" as PortalEventCategory,
  date: "",
  startTime: "",
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
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");
  const [poster, setPoster] = useState<PosterImageInput | null>(null);
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(items, accessors, "when");

  const load = () =>
    adminFetch<PortalEvent[]>("/api/admin/events")
      .then(setItems)
      .catch((err: Error) => setError(err.message));

  useEffect(() => {
    void load();
  }, []);

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyEvent);
    setPoster(null);
    setError("");
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyEvent);
    setPoster(null);
    setError("");
    setFormOpen(true);
  };

  const openEdit = (item: PortalEvent) => {
    setEditingId(item.id);
    const times = parseStoredEventTime(item.time);
    setForm({
      title: item.title,
      category: item.category,
      date: item.date ?? "",
      startTime: times.start,
      location: item.location,
      description: item.description,
      tags: item.tags.join(", "),
      href: item.href,
      buttonLabel: item.buttonLabel,
      image: item.image ?? "",
      recurring: Boolean(item.recurring),
      featured: Boolean(item.featured),
    });
    setPoster(null);
    setError("");
    setFormOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const payload = {
      ...form,
      startTime: form.startTime,
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
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save event.");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await adminFetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (editingId === id) closeForm();
    await load();
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Public site"
        title="Events"
        description="The public Events page reads this same list. Add or edit a record when you need to make a change."
        action={
          formOpen ? (
            <button
              type="button"
              onClick={closeForm}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background xl:text-base"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark xl:text-base"
            >
              <Plus className="h-4 w-4" strokeWidth={1.75} />
              Add event
            </button>
          )
        }
      />

      {formOpen ? (
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid gap-4 rounded-3xl border border-border/80 bg-surface p-5 shadow-sm md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-foreground xl:text-base">
              {editingId ? "Edit event" : "New event"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {editingId
                ? "Update the fields below, then save. Changes appear on the public Events page."
                : "Fill in the event details, then save to publish it on the public Events page."}
            </p>
          </div>
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
            <span className="mb-1.5 block text-sm font-medium xl:text-base">Date</span>
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={formInputClassName}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium xl:text-base">Time</span>
            <input
              required
              type="time"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className={formInputClassName}
            />
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
          <div className="md:col-span-2">
            <PosterUpload
              label="Poster (optional)"
              hint="Upload a picture from this device to preview it here. It will be saved when blob storage is ready."
              poster={poster}
              fallbackSrc={form.image}
              onChange={(next) => {
                setPoster(next);
                if (!next) setForm((current) => ({ ...current, image: "" }));
              }}
              onError={setError}
            />
          </div>
          <label className="flex items-center gap-2 text-sm xl:text-base">
            <input type="checkbox" checked={form.recurring} onChange={(e) => setForm({ ...form, recurring: e.target.checked })} />
            Recurring
          </label>
          <label className="flex items-center gap-2 text-sm xl:text-base">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
          {error ? <p className="md:col-span-2 text-sm text-danger">{error}</p> : null}
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white xl:text-base">
              {editingId ? "Save changes" : "Publish event"}
            </button>
            <button type="button" onClick={closeForm} className="text-sm text-muted xl:text-base">
              Cancel
            </button>
          </div>
        </form>
      ) : error && items.length === 0 ? (
        <p className="mb-6 text-sm text-danger">{error}</p>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={CalendarDays}
            title="No events yet"
            description="Use Add event to publish a gathering, class, or program on the public Events page."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-background text-muted">
                <tr>
                  <AdminColumnHeaders
                    columns={headers}
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                    filters={filters}
                    onFilterChange={setFilter}
                  />
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? <AdminTableEmptyRow colSpan={headers.length + 1} /> : null}
                {rows.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-muted">{item.location}</p>
                      {item.featured || item.recurring ? (
                        <p className="mt-1 text-xs text-brand">
                          {[item.featured ? "Featured" : null, item.recurring ? "Recurring" : null]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 capitalize text-muted">{item.category}</td>
                    <td className="px-4 py-3">{item.dateLabel} · {item.time}</td>
                    <td className="px-4 py-3 text-muted">{formatDateTime(item.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button type="button" className="text-brand" onClick={() => openEdit(item)}>
                          Edit
                        </button>
                        <button type="button" className="text-danger" onClick={() => remove(item.id)}>
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
