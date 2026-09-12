"use client";

import { useEffect, useMemo, useState } from "react";
import { History, Search } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatDateTime } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { AdminHistoryAction, AdminHistoryArea, AdminHistoryEntry } from "@/lib/portal/types";

const actionLabels: Record<AdminHistoryAction, string> = {
  authenticated: "Signed in",
  "signed-out": "Signed out",
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
};

const areaLabels: Record<AdminHistoryArea, string> = {
  session: "Login",
  announcements: "Announcements",
  events: "Events",
  contacts: "Contacts",
  registrations: "Registrations",
};

export default function AdminHistoryPage() {
  const [items, setItems] = useState<AdminHistoryEntry[]>([]);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<"all" | AdminHistoryArea>("all");
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<AdminHistoryEntry[]>("/api/admin/history")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (area !== "all" && item.area !== area) return false;
      return [item.adminEmail, item.summary, actionLabels[item.action], areaLabels[item.area]]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [items, query, area]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Activity"
        title="History"
        description="Staff email, time, and the change they made. Enter your email in the sidebar so new actions are attributed to you."
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
        </select>
      </div>
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {filtered.length === 0 ? (
          <AdminEmptyState
            icon={items.length === 0 ? History : Search}
            title={items.length === 0 ? "No activity yet" : "No matching activity"}
            description={
              items.length === 0
                ? "Save your email in the sidebar, then create or update a record. Changes will appear here."
                : "Try another search or activity filter."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-[#f8f5f0] text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium">Admin email</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                  <th className="px-4 py-3 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 text-muted">{formatDateTime(item.createdAt)}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.adminEmail}</td>
                    <td className="px-4 py-3">
                      {actionLabels[item.action]}
                      <span className="block text-xs text-muted">{areaLabels[item.area]}</span>
                    </td>
                    <td className="px-4 py-3">{item.summary}</td>
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
