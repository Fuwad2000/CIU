"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Newspaper, Search } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatShortDate } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { NewsletterRecord } from "@/lib/portal/sql-store";

type SortKey = "name" | "email" | "date";
type SortDir = "asc" | "desc";

export default function AdminNewsletterPage() {
  const [items, setItems] = useState<NewsletterRecord[]>([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    adminFetch<NewsletterRecord[]>("/api/admin/newsletter")
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
      [item.fullName, item.email].join(" ").toLowerCase().includes(needle)
    );
    next.sort((a, b) => {
      const left = (sortKey === "date" ? a.createdAt : sortKey === "name" ? a.fullName : a.email).toLowerCase();
      const right = (sortKey === "date" ? b.createdAt : sortKey === "name" ? b.fullName : b.email).toLowerCase();
      const result = left.localeCompare(right, "en", { numeric: true, sensitivity: "base" });
      return sortDir === "asc" ? result : -result;
    });
    return next;
  }, [items, query, sortKey, sortDir]);

  const copyEmails = async () => {
    const emails = filtered.map((item) => item.email).join(", ");
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
        eyebrow="Inbox"
        title="Newsletter"
        description="People who asked to receive CIU event and community emails. Use Outreach to compose a campaign; copy remains available until email sending is connected."
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/outreach/new"
              className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Create campaign
            </Link>
            {filtered.length > 0 ? (
              <button
                type="button"
                onClick={() => void copyEmails()}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
              >
                {copied ? "Emails copied" : "Copy emails"}
              </button>
            ) : null}
          </div>
        }
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search name or email"
        className={formInputClassName}
      />
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {filtered.length === 0 ? (
          <AdminEmptyState
            icon={items.length === 0 ? Newspaper : Search}
            title={items.length === 0 ? "No newsletter sign-ups yet" : "No matching sign-ups"}
            description={
              items.length === 0
                ? "When someone uses the public newsletter form, they will appear here."
                : "Try a different name or email."
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
                      { key: "date", label: "Date", sortable: true },
                    ] as const
                  ).map((column) => {
                    const active = sortKey === column.key;
                    return (
                      <th key={column.key} className="px-4 py-3 font-medium">
                        <button
                          type="button"
                          onClick={() => toggleSort(column.key)}
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
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{item.fullName}</td>
                    <td className="px-4 py-3">
                      <a className="text-brand hover:underline" href={`mailto:${item.email}`}>
                        {item.email}
                      </a>
                    </td>
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
