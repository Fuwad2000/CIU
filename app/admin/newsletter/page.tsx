"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import { AdminApiError, adminFetch, formatShortDate } from "@frontend/portal/client";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import type { NewsletterRecord } from "@shared/records";

type ColumnKey = "name" | "email" | "date";

const accessors: Record<ColumnKey, (item: NewsletterRecord) => { sort: string; filter: string }> = {
  name: (item) => ({ sort: item.fullName, filter: item.fullName }),
  email: (item) => ({ sort: item.email, filter: item.email }),
  date: (item) => ({ sort: item.createdAt, filter: formatShortDate(item.createdAt) }),
};

const headers: Array<{ key: ColumnKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "name", label: "Name", sort: true, filter: true },
  { key: "email", label: "Email", sort: true, filter: true },
  { key: "date", label: "Date", sort: true },
];

export default function AdminNewsletterPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<NewsletterRecord[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [removingId, setRemovingId] = useState("");
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(items, accessors, "date");
  const canDelete = profile.canDeleteSubscriptions;

  useEffect(() => {
    adminFetch<NewsletterRecord[]>("/api/admin/newsletter")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  const onRemove = async (item: NewsletterRecord) => {
    if (!window.confirm(`Remove ${item.fullName} (${item.email}) from the newsletter?`)) return;
    setError("");
    setRemovingId(item.id);
    try {
      await adminFetch<{ ok: true }>(`/api/admin/newsletter/${item.id}`, { method: "DELETE" });
      setItems((current) => current.filter((row) => row.id !== item.id));
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not remove this newsletter sign-up.");
    } finally {
      setRemovingId("");
    }
  };

  const copyEmails = async () => {
    const emails = rows.map((item) => item.email).join(", ");
    if (!emails) return;
    try {
      await navigator.clipboard.writeText(emails);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy emails. Select them from the table instead.");
    }
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Subscriptions"
        title="Newsletter"
        description="People who asked to receive CIU event and community emails. Sort or filter from a column heading."
        action={
          profile.canSendOutreach || rows.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.canSendOutreach ? (
              <Link
                href="/admin/outreach/new"
                className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Create campaign
              </Link>
            ) : null}
            {rows.length > 0 ? (
              <button
                type="button"
                onClick={() => void copyEmails()}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
              >
                {copied ? "Emails copied" : "Copy emails"}
              </button>
            ) : null}
          </div>
          ) : undefined
        }
      />
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={Newspaper}
            title="No newsletter sign-ups yet"
            description="When someone uses the public newsletter form, they will appear here."
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
