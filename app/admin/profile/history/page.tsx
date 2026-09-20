"use client";

import { useEffect, useMemo, useState } from "react";
import { History, Search } from "lucide-react";
import AdminActivityTable from "@/components/admin/AdminActivityTable";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminSession } from "@/components/admin/AdminSessionContext";
import { HISTORY_ACTION_LABELS, HISTORY_AREA_LABELS } from "@/lib/portal/admin-history";
import { adminFetch } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { AdminHistoryArea, AdminHistoryEntry } from "@/lib/portal/types";

type ProfilePayload = {
  history: AdminHistoryEntry[];
};

export default function AdminProfileHistoryPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<AdminHistoryEntry[]>([]);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<"all" | AdminHistoryArea>("all");
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<ProfilePayload>("/api/admin/profile")
      .then((payload) => setItems(payload.history))
      .catch((err: Error) => setError(err.message));
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (area !== "all" && item.area !== area) return false;
      return [item.summary, HISTORY_ACTION_LABELS[item.action], HISTORY_AREA_LABELS[item.area]]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [items, query, area]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Your account"
        title="History"
        description={`Only your changes in the staff portal, recorded under ${profile.email}.`}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a change"
          className={formInputClassName}
        />
        <select
          value={area}
          onChange={(event) => setArea(event.target.value as "all" | AdminHistoryArea)}
          className={formInputClassName}
        >
          <option value="all">All activity</option>
          <option value="session">Sign in / out</option>
          <option value="announcements">Announcements</option>
          <option value="events">Events</option>
          <option value="contacts">Contacts</option>
          <option value="registrations">Registrations</option>
          <option value="users">Users</option>
          <option value="outreach">Outreach</option>
        </select>
      </div>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <section className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {filtered.length === 0 ? (
          <AdminEmptyState
            icon={items.length === 0 ? History : Search}
            title={items.length === 0 ? "No history yet" : "No matching history"}
            description={
              items.length === 0
                ? "When you sign in or update a record, it will show up here."
                : "Try another search or activity filter."
            }
          />
        ) : (
          <AdminActivityTable
            items={filtered}
            emptyTitle="No history yet"
            emptyDescription="When you sign in or update a record, it will show up here."
          />
        )}
      </section>
    </div>
  );
}
