"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Inbox, Search } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatShortDate } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { ContactMessage } from "@/lib/portal/types";

type SortKey = "name" | "email" | "date";
type SortDir = "asc" | "desc";

const columns: { key: SortKey | "phone" | "subject" | "message"; label: string; sortable?: boolean }[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "phone", label: "Phone" },
  { key: "subject", label: "Subject" },
  { key: "message", label: "Message" },
  { key: "date", label: "Date", sortable: true },
];

function contactName(item: ContactMessage) {
  return item.name || [item.firstName, item.surname].filter(Boolean).join(" ") || "";
}

function sortValue(item: ContactMessage, key: SortKey) {
  if (key === "date") return item.createdAt || "";
  if (key === "name") return contactName(item);
  return item.email || "";
}

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<ContactMessage[]>("/api/admin/contacts")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(key === "date" ? "desc" : "asc");
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = items.filter((item) =>
      [contactName(item), item.email, item.phone, item.subject, item.message]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
    next.sort((a, b) => {
      const left = sortValue(a, sortKey).toLowerCase();
      const right = sortValue(b, sortKey).toLowerCase();
      const result = left.localeCompare(right, "en", { numeric: true, sensitivity: "base" });
      return sortDir === "asc" ? result : -result;
    });
    return next;
  }, [items, query, sortKey, sortDir]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Inbox"
        title="Contact messages"
        description="Full details from everyone who used the public contact form."
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search name, phone, email, or message"
        className={formInputClassName}
      />
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {filtered.length === 0 ? (
          <AdminEmptyState
            icon={items.length === 0 ? Inbox : Search}
            title={items.length === 0 ? "No messages yet" : "No matching messages"}
            description={
              items.length === 0
                ? "When someone submits the public contact form, their details will appear here."
                : "Try a different name, email, phone, or subject."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-background text-muted">
                <tr>
                  {columns.map((column) => {
                    const active = column.sortable && sortKey === column.key;
                    return (
                      <th key={column.key} className="px-4 py-3 font-medium">
                        {column.sortable ? (
                          <button
                            type="button"
                            onClick={() => toggleSort(column.key as SortKey)}
                            className={`inline-flex items-center gap-1.5 transition hover:text-foreground ${
                              active ? "text-foreground" : ""
                            }`}
                            aria-label={`Sort by ${column.label}`}
                          >
                            {column.label}
                            {active && sortDir === "asc" ? (
                              <ChevronUp className="h-4 w-4" strokeWidth={1.75} />
                            ) : (
                              <ChevronDown className={`h-4 w-4 ${active ? "" : "opacity-40"}`} strokeWidth={1.75} />
                            )}
                          </button>
                        ) : (
                          column.label
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
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
