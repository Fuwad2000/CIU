"use client";

import { useEffect, useMemo, useState } from "react";
import { Inbox, Search } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatDateTime } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { ContactMessage } from "@/lib/portal/types";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase xl:text-sm">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground xl:text-base">
        {value || "—"}
      </p>
    </div>
  );
}

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<ContactMessage[]>("/api/admin/contacts")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = items.filter((item) =>
      [
        item.firstName,
        item.surname,
        item.name,
        item.email,
        item.phone,
        item.subject,
        item.message,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
    next.sort((a, b) =>
      sort === "newest"
        ? b.createdAt.localeCompare(a.createdAt)
        : a.createdAt.localeCompare(b.createdAt)
    );
    return next;
  }, [items, query, sort]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Inbox"
        title="Contact messages"
        description="Full details from everyone who used the public contact form."
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, phone, email, or message"
          className={formInputClassName}
        />
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as "newest" | "oldest")}
          className={formInputClassName}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
            <AdminEmptyState
              icon={items.length === 0 ? Inbox : Search}
              title={items.length === 0 ? "No messages yet" : "No matching messages"}
              description={
                items.length === 0
                  ? "When someone submits the public contact form, their details will appear here."
                  : "Try a different name, email, phone, or subject."
              }
            />
          </div>
        ) : (
          filtered.map((item) => (
            <article key={item.id} className="rounded-3xl border border-border/80 bg-surface p-5 shadow-sm sm:p-6">
              <p className="text-xs text-muted xl:text-sm">{formatDateTime(item.createdAt)}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Detail label="First name" value={item.firstName || item.name} />
                <Detail label="Surname" value={item.surname} />
                <Detail label="Email" value={item.email} />
                <Detail label="Phone number" value={item.phone} />
                <div className="sm:col-span-2">
                  <Detail label="Subject" value={item.subject} />
                </div>
                <div className="sm:col-span-2">
                  <Detail label="Message" value={item.message} />
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
