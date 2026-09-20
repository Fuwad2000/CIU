"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search, UserPlus } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatShortDate } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { MemberRecord } from "@/lib/portal/sql-store";

type SortKey = "name" | "email" | "date";
type SortDir = "asc" | "desc";

const typeLabels: Record<MemberRecord["membershipType"], string> = {
  individual: "Individual",
  family: "Family",
};

export default function AdminMembersPage() {
  const [items, setItems] = useState<MemberRecord[]>([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<MemberRecord[]>("/api/admin/members")
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
      [item.fullName, item.email, item.phone, item.city, item.notes, item.emailTopics.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
    next.sort((a, b) => {
      const left = (sortKey === "date" ? a.createdAt : sortKey === "name" ? a.fullName : a.email).toLowerCase();
      const right = (sortKey === "date" ? b.createdAt : sortKey === "name" ? b.fullName : b.email).toLowerCase();
      const result = left.localeCompare(right, "en", { numeric: true, sensitivity: "base" });
      return sortDir === "asc" ? result : -result;
    });
    return next;
  }, [items, query, sortKey, sortDir]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Inbox"
        title="Membership"
        description="People who joined the CIU mailing list from the public membership form."
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search name, email, city, or notes"
        className={formInputClassName}
      />
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {filtered.length === 0 ? (
          <AdminEmptyState
            icon={items.length === 0 ? UserPlus : Search}
            title={items.length === 0 ? "No members yet" : "No matching members"}
            description={
              items.length === 0
                ? "When someone joins the public membership list, they will appear here."
                : "Try a different name, email, or city."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-background text-muted">
                <tr>
                  {(
                    [
                      { key: "name", label: "Name", sortable: true },
                      { key: "email", label: "Email", sortable: true },
                      { key: "phone", label: "Phone" },
                      { key: "city", label: "City" },
                      { key: "type", label: "Type" },
                      { key: "topics", label: "Email topics" },
                      { key: "notes", label: "Notes" },
                      { key: "date", label: "Date", sortable: true },
                    ] as const
                  ).map((column) => {
                    const active = "sortable" in column && column.sortable && sortKey === column.key;
                    return (
                      <th key={column.key} className="px-4 py-3 font-medium">
                        {"sortable" in column && column.sortable ? (
                          <button
                            type="button"
                            onClick={() => toggleSort(column.key as SortKey)}
                            className={`inline-flex items-center gap-1.5 transition hover:text-foreground ${
                              active ? "text-foreground" : ""
                            }`}
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
