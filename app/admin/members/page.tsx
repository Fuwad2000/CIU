"use client";

import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import { AdminApiError, adminFetch, formatShortDate } from "@frontend/portal/client";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import type { MemberRecord } from "@shared/records";

type ColumnKey = "name" | "email" | "phone" | "city" | "type" | "topics" | "notes" | "date";

const typeLabels: Record<MemberRecord["membershipType"], string> = {
  individual: "Individual",
  family: "Family",
};

const accessors: Record<ColumnKey, (item: MemberRecord) => { sort: string; filter: string }> = {
  name: (item) => ({ sort: item.fullName, filter: item.fullName }),
  email: (item) => ({ sort: item.email, filter: item.email }),
  phone: (item) => ({ sort: item.phone || "", filter: item.phone || "" }),
  city: (item) => ({ sort: item.city || "", filter: item.city || "" }),
  type: (item) => ({ sort: typeLabels[item.membershipType], filter: typeLabels[item.membershipType] }),
  topics: (item) => ({ sort: item.emailTopics.join(", "), filter: item.emailTopics.join(", ") }),
  notes: (item) => ({ sort: item.notes || "", filter: item.notes || "" }),
  date: (item) => ({ sort: item.createdAt, filter: formatShortDate(item.createdAt) }),
};

const headers: Array<{ key: ColumnKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "name", label: "Name", sort: true, filter: true },
  { key: "email", label: "Email", sort: true, filter: true },
  { key: "phone", label: "Phone", filter: true },
  { key: "city", label: "City", sort: true, filter: true },
  { key: "type", label: "Type", sort: true, filter: true },
  { key: "topics", label: "Email topics", filter: true },
  { key: "notes", label: "Notes" },
  { key: "date", label: "Date", sort: true },
];

export default function AdminMembersPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<MemberRecord[]>([]);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState("");
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(items, accessors, "date");
  const canDelete = profile.canDeleteSubscriptions;

  useEffect(() => {
    adminFetch<MemberRecord[]>("/api/admin/members")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  const onRemove = async (item: MemberRecord) => {
    if (!window.confirm(`Remove ${item.fullName} (${item.email}) from membership?`)) return;
    setError("");
    setRemovingId(item.id);
    try {
      await adminFetch<{ ok: true }>(`/api/admin/members/${item.id}`, { method: "DELETE" });
      setItems((current) => current.filter((row) => row.id !== item.id));
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not remove this member.");
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Subscriptions"
        title="Membership"
        description="People who joined the CIU mailing list from the public membership form. Sort or filter from a column heading."
      />
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={UserPlus}
            title="No members yet"
            description="When someone joins the public membership list, they will appear here."
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
                  <tr key={item.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 font-medium text-foreground">{item.fullName}</td>
                    <td className="px-4 py-3">
                      <a className="text-brand hover:underline" href={`mailto:${item.email}`}>
                        {item.email}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{item.phone || "—"}</td>
                    <td className="px-4 py-3">{item.city || "—"}</td>
                    <td className="px-4 py-3">{typeLabels[item.membershipType]}</td>
                    <td className="px-4 py-3 text-muted">
                      {item.emailTopics.length ? item.emailTopics.join(", ") : "—"}
                    </td>
                    <td className="max-w-xs px-4 py-3 whitespace-pre-wrap text-muted">{item.notes || "—"}</td>
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
