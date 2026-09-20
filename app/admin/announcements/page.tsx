"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Bell, Plus, X } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatDateTime } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { Announcement } from "@/lib/portal/types";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [message, setMessage] = useState("");
  const [href, setHref] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");

  const load = () =>
    adminFetch<Announcement[]>("/api/admin/announcements")
      .then(setItems)
      .catch((err: Error) => setError(err.message));

  useEffect(() => {
    void load();
  }, []);

  const closeForm = () => {
    setFormOpen(false);
    setMessage("");
    setHref("");
    setEditingId(null);
    setError("");
  };

  const openCreate = () => {
    setEditingId(null);
    setMessage("");
    setHref("");
    setError("");
    setFormOpen(true);
  };

  const openEdit = (item: Announcement) => {
    setEditingId(item.id);
    setMessage(item.message);
    setHref(item.href ?? "");
    setError("");
    setFormOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      if (editingId) {
        await adminFetch(`/api/admin/announcements/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify({ message, href }),
        });
      } else {
        await adminFetch("/api/admin/announcements", {
          method: "POST",
          body: JSON.stringify({ message, href, active: true }),
        });
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save announcement.");
    }
  };

  const toggleActive = async (item: Announcement) => {
    await adminFetch(`/api/admin/announcements/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !item.active }),
    });
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    await adminFetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
    if (editingId === id) closeForm();
    await load();
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Public site"
        title="Announcements"
        description="Active messages animate across the public site ticker. Add or edit a record when you need to make a change."
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
              Add announcement
            </button>
          )
        }
      />

      {formOpen ? (
        <form onSubmit={handleSubmit} className="mb-6 rounded-3xl border border-border/80 bg-surface p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-semibold text-foreground xl:text-base">
              {editingId ? "Edit announcement" : "New announcement"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {editingId
                ? "Update the ticker message, then save. Active items appear on the public website."
                : "Write a ticker message, then save to publish it on the public website."}
            </p>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium xl:text-base">Message</span>
            <input
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={formInputClassName}
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium xl:text-base">Optional link</span>
            <input
              value={href}
              onChange={(event) => setHref(event.target.value)}
              placeholder="/Events or https://..."
              className={formInputClassName}
            />
          </label>
          {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
          <div className="mt-4 flex gap-3">
            <button type="submit" className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white xl:text-base">
              {editingId ? "Save changes" : "Publish announcement"}
            </button>
            <button type="button" onClick={closeForm} className="text-sm text-muted xl:text-base">
              Cancel
            </button>
          </div>
        </form>
      ) : error && items.length === 0 ? (
        <p className="mb-6 text-sm text-danger">{error}</p>
      ) : null}

      <div className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={Bell}
            title="No announcements yet"
            description="Use Add announcement to publish a ticker message on the public website."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium xl:px-5 xl:py-3.5">Message</th>
                  <th className="px-4 py-3 font-medium xl:px-5 xl:py-3.5">Status</th>
                  <th className="px-4 py-3 font-medium xl:px-5 xl:py-3.5">Updated</th>
                  <th className="px-4 py-3 font-medium xl:px-5 xl:py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground xl:px-5 xl:py-4">{item.message}</td>
                    <td className="px-4 py-3 xl:px-5 xl:py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.active ? "bg-brand/10 text-brand" : "bg-border/60 text-muted"
                        }`}
                      >
                        {item.active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDateTime(item.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className="text-brand" onClick={() => openEdit(item)}>
                          Edit
                        </button>
                        <button type="button" className="text-brand" onClick={() => toggleActive(item)}>
                          {item.active ? "Hide" : "Show"}
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
