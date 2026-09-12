"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Bell } from "lucide-react";
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
  const [error, setError] = useState("");

  const load = () =>
    adminFetch<Announcement[]>("/api/admin/announcements")
      .then(setItems)
      .catch((err: Error) => setError(err.message));

  useEffect(() => {
    void load();
  }, []);

  const resetForm = () => {
    setMessage("");
    setHref("");
    setEditingId(null);
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
      resetForm();
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
    await load();
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Public site"
        title="Announcements"
        description="Active messages animate across the public site ticker."
      />

      <form onSubmit={handleSubmit} className="rounded-3xl border border-border/80 bg-surface p-5 shadow-sm">
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
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        <div className="mt-4 flex gap-3">
          <button type="submit" className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white xl:text-base">
            {editingId ? "Update announcement" : "Add announcement"}
          </button>
          {editingId ? (
            <button type="button" onClick={resetForm} className="text-sm text-muted">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={Bell}
            title="No announcements yet"
            description="Add a ticker message above. Active items will appear on the public website."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-[#f8f5f0] text-muted">
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
                        <button
                          type="button"
                          className="text-brand"
                          onClick={() => {
                            setEditingId(item.id);
                            setMessage(item.message);
                            setHref(item.href ?? "");
                          }}
                        >
                          Edit
                        </button>
                        <button type="button" className="text-brand" onClick={() => toggleActive(item)}>
                          {item.active ? "Hide" : "Show"}
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
