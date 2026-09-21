"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, UserPlus, X } from "lucide-react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import { AdminApiError, adminFetch, formatShortDate } from "@frontend/portal/client";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import { formInputClassName } from "@frontend/lib/formStyles";
import type { OutreachAdditionalPerson } from "@shared/outreach";

type ColumnKey = "name" | "email" | "phone" | "notes" | "addedBy" | "date";

const accessors: Record<ColumnKey, (item: OutreachAdditionalPerson) => { sort: string; filter: string }> = {
  name: (item) => ({ sort: item.fullName, filter: item.fullName }),
  email: (item) => ({ sort: item.email, filter: item.email }),
  phone: (item) => ({ sort: item.phone || "", filter: item.phone || "" }),
  notes: (item) => ({ sort: item.notes || "", filter: item.notes || "" }),
  addedBy: (item) => ({ sort: item.createdByName || "", filter: item.createdByName || "" }),
  date: (item) => ({ sort: item.createdAt, filter: formatShortDate(item.createdAt) }),
};

const headers: Array<{ key: ColumnKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "name", label: "Name", sort: true, filter: true },
  { key: "email", label: "Email", sort: true, filter: true },
  { key: "phone", label: "Phone", filter: true },
  { key: "notes", label: "Note" },
  { key: "addedBy", label: "Added by", sort: true, filter: true },
  { key: "date", label: "Date", sort: true },
];

export default function OutreachAdditionalPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<OutreachAdditionalPerson[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [removingId, setRemovingId] = useState("");
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(items, accessors, "date");
  const canDelete = profile.canDeleteSubscriptions;

  const load = () =>
    adminFetch<OutreachAdditionalPerson[]>("/api/admin/outreach/additional")
      .then(setItems)
      .catch((err: Error) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const onAdd = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const record = await adminFetch<OutreachAdditionalPerson>("/api/admin/outreach/additional", {
        method: "POST",
        body: JSON.stringify({ fullName, email, phone, notes }),
      });
      setItems((current) => [record, ...current.filter((item) => item.id !== record.id)]);
      setFullName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setFormOpen(false);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not add this person.");
    } finally {
      setSaving(false);
    }
  };

  const onRemove = async (item: OutreachAdditionalPerson) => {
    if (!window.confirm(`Remove ${item.fullName} (${item.email}) from the contact list?`)) return;
    setError("");
    setRemovingId(item.id);
    try {
      await adminFetch<{ ok: true }>(`/api/admin/outreach/additional/${item.id}`, { method: "DELETE" });
      setItems((current) => current.filter((row) => row.id !== item.id));
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not remove this person.");
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Subscriptions"
        title="Contact list"
        description="One row per person. Anyone who uses the public contact form is added here once. You can also add someone who has not written in. Full messages stay in Inbox."
        action={
          formOpen ? (
            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                setFullName("");
                setEmail("");
                setPhone("");
                setNotes("");
                setError("");
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setFormOpen(true);
                setError("");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              <Plus className="h-4 w-4" strokeWidth={1.75} />
              Add a new contact
            </button>
          )
        }
      />

      {formOpen ? (
      <form
        onSubmit={onAdd}
        className="mb-6 grid gap-3 rounded-3xl border border-border/80 bg-surface p-5 shadow-sm md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]"
      >
        <input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Full name"
          className={formInputClassName}
          autoComplete="name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className={formInputClassName}
          autoComplete="email"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone (optional)"
          className={formInputClassName}
          autoComplete="tel"
        />
        <input
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Note (optional)"
          className={formInputClassName}
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add person"}
        </button>
      </form>
      ) : null}

      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={UserPlus}
            title="No one on the contact list yet"
            description="People who write in through the contact form appear here once. You can also add someone who has not used the form."
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
                  {canDelete ? <th className="px-4 py-3 font-medium"> </th> : null}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? <AdminTableEmptyRow colSpan={headers.length + (canDelete ? 1 : 0)} /> : null}
                {rows.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{item.fullName}</td>
                    <td className="px-4 py-3">
                      <a className="text-brand hover:underline" href={`mailto:${item.email}`}>
                        {item.email}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{item.phone || "—"}</td>
                    <td className="px-4 py-3 text-muted">{item.notes || "—"}</td>
                    <td className="px-4 py-3 text-muted">{item.createdByName || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">{formatShortDate(item.createdAt)}</td>
                    {canDelete ? (
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onRemove(item)}
                        disabled={removingId === item.id}
                        className="text-sm font-medium text-danger hover:underline disabled:opacity-60"
                      >
                        {removingId === item.id ? "Removing…" : "Delete"}
                      </button>
                    </td>
                    ) : null}
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
