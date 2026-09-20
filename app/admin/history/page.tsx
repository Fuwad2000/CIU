"use client";

import { useEffect, useMemo, useState } from "react";
import { History, Search } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminRoleGate from "@/components/admin/AdminRoleGate";
import { useAdminSession } from "@/components/admin/AdminSessionContext";
import AdminActivityTable from "@/components/admin/AdminActivityTable";
import { HISTORY_ACTION_LABELS, HISTORY_AREA_LABELS } from "@/lib/portal/admin-history";
import { adminFetch } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { AdminHistoryArea, AdminHistoryEntry } from "@/lib/portal/types";

export default function AdminHistoryPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<AdminHistoryEntry[]>([]);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<"all" | AdminHistoryArea>("all");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!profile.canViewAllHistory) return;
    adminFetch<AdminHistoryEntry[]>("/api/admin/history")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, [profile.canViewAllHistory]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (area !== "all" && item.area !== area) return false;
      return [item.adminEmail, item.summary, HISTORY_ACTION_LABELS[item.action], HISTORY_AREA_LABELS[item.area]]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [items, query, area]);

  return (
    <AdminRoleGate allow={profile.canViewAllHistory} redirectTo="/admin/profile/history">
      <div>
        <AdminPageHeader
          eyebrow="Staff"
          title="History"
          description="Every staff change, including who made it and when."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search email or change"
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
        <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
          {filtered.length === 0 ? (
            <AdminEmptyState
              icon={items.length === 0 ? History : Search}
              title={items.length === 0 ? "No activity yet" : "No matching activity"}
              description={
                items.length === 0
                  ? "Create or update a record. Changes will appear here."
                  : "Try another search or activity filter."
              }
            />
          ) : (
            <AdminActivityTable
              items={filtered}
              emptyTitle="No activity yet"
              emptyDescription="Create or update a record. Changes will appear here."
              showEmail
            />
          )}
        </div>
      </div>
    </AdminRoleGate>
  );
}