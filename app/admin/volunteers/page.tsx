"use client";

import { useEffect, useState } from "react";
import { HeartHandshake } from "lucide-react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import { AdminApiError, adminFetch, formatShortDate } from "@frontend/portal/client";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import type { VolunteerRecord } from "@shared/records";

type ColumnKey = "name" | "email" | "phone" | "age" | "roles" | "availability" | "hours" | "message" | "date";

const ageLabels: Record<VolunteerRecord["ageGroup"], string> = {
  "high-school": "High school",
  adult: "Adult",
  senior: "Senior",
};

const availabilityLabels: Record<VolunteerRecord["availability"], string> = {
  weekdays: "Weekdays",
  weekends: "Weekends",
  evenings: "Evenings",
  flexible: "Flexible",
};

function hoursLabel(value: VolunteerRecord["volunteerHours"]) {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "";
}

const accessors: Record<ColumnKey, (item: VolunteerRecord) => { sort: string; filter: string }> = {
  name: (item) => ({ sort: item.fullName, filter: item.fullName }),
  email: (item) => ({ sort: item.email, filter: item.email }),
  phone: (item) => ({ sort: item.phone, filter: item.phone }),
  age: (item) => ({ sort: ageLabels[item.ageGroup], filter: ageLabels[item.ageGroup] }),
  roles: (item) => ({ sort: item.roles.join(", "), filter: item.roles.join(", ") }),
  availability: (item) => ({
    sort: availabilityLabels[item.availability],
    filter: availabilityLabels[item.availability],
  }),
  hours: (item) => ({ sort: hoursLabel(item.volunteerHours), filter: hoursLabel(item.volunteerHours) }),
  message: (item) => ({ sort: item.message || "", filter: item.message || "" }),
  date: (item) => ({ sort: item.createdAt, filter: formatShortDate(item.createdAt) }),
};

const headers: Array<{ key: ColumnKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "name", label: "Name", sort: true, filter: true },
  { key: "email", label: "Email", sort: true, filter: true },
  { key: "phone", label: "Phone", filter: true },
  { key: "age", label: "Category", sort: true, filter: true },
  { key: "roles", label: "Roles", filter: true },
  { key: "availability", label: "Availability", sort: true, filter: true },
  { key: "hours", label: "Student hours", sort: true, filter: true },
  { key: "message", label: "Message" },
  { key: "date", label: "Date", sort: true },
];

export default function AdminVolunteersPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<VolunteerRecord[]>([]);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState("");
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(items, accessors, "date");
  const canDelete = profile.canDeleteSubscriptions;

  useEffect(() => {
    adminFetch<VolunteerRecord[]>("/api/admin/volunteers")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  const onRemove = async (item: VolunteerRecord) => {
    if (!window.confirm(`Remove ${item.fullName} (${item.email}) from volunteers?`)) return;
    setError("");
    setRemovingId(item.id);
    try {
      await adminFetch<{ ok: true }>(`/api/admin/volunteers/${item.id}`, { method: "DELETE" });
      setItems((current) => current.filter((row) => row.id !== item.id));
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not remove this volunteer.");
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Subscriptions"
        title="Volunteers"
        description="People who registered to serve at the masjid and centre. Sort or filter from a column heading."
      />
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={HeartHandshake}
            title="No volunteers yet"
            description="When someone submits the public volunteer form, they will appear here."
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
                    <td className="whitespace-nowrap px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3">{ageLabels[item.ageGroup]}</td>
                    <td className="px-4 py-3 text-muted">{item.roles.join(", ") || "—"}</td>
                    <td className="px-4 py-3">{availabilityLabels[item.availability]}</td>
                    <td className="px-4 py-3">{hoursLabel(item.volunteerHours) || "—"}</td>
                    <td className="max-w-xs px-4 py-3 whitespace-pre-wrap text-muted">{item.message || "—"}</td>
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
