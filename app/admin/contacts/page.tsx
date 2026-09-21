"use client";

import { useEffect, useState } from "react";
import { Inbox } from "lucide-react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { adminFetch, formatShortDate } from "@frontend/portal/client";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import type { ContactMessage } from "@shared/types";

type ColumnKey = "name" | "email" | "phone" | "subject" | "message" | "date";

function contactName(item: ContactMessage) {
  return item.name || [item.firstName, item.surname].filter(Boolean).join(" ") || "";
}

const accessors: Record<ColumnKey, (item: ContactMessage) => { sort: string; filter: string }> = {
  name: (item) => ({ sort: contactName(item), filter: contactName(item) }),
  email: (item) => ({ sort: item.email || "", filter: item.email || "" }),
  phone: (item) => ({ sort: item.phone || "", filter: item.phone || "" }),
  subject: (item) => ({ sort: item.subject || "", filter: item.subject || "" }),
  message: (item) => ({ sort: item.message || "", filter: item.message || "" }),
  date: (item) => ({ sort: item.createdAt || "", filter: formatShortDate(item.createdAt) }),
};

const headers: Array<{ key: ColumnKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "name", label: "Name", sort: true, filter: true },
  { key: "email", label: "Email", sort: true, filter: true },
  { key: "phone", label: "Phone", filter: true },
  { key: "subject", label: "Subject", filter: true },
  { key: "message", label: "Message" },
  { key: "date", label: "Date", sort: true },
];

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [error, setError] = useState("");
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(items, accessors, "date");

  useEffect(() => {
    adminFetch<ContactMessage[]>("/api/admin/contacts")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Inbox"
        title="Contact messages"
        description="Full details from everyone who used the public contact form. Sort or filter from a column heading."
      />
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={Inbox}
            title="No messages yet"
            description="When someone submits the public contact form, their details will appear here."
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
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? <AdminTableEmptyRow colSpan={headers.length} /> : null}
                {rows.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 font-medium text-foreground">{contactName(item) || "—"}</td>
                    <td className="px-4 py-3">{item.email || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3">{item.phone || "—"}</td>
                    <td className="px-4 py-3">{item.subject || "—"}</td>
                    <td className="max-w-md px-4 py-3 whitespace-pre-wrap text-muted">{item.message || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">{formatShortDate(item.createdAt)}</td>
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
