"use client";

import { History } from "lucide-react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import { HISTORY_ACTION_LABELS, HISTORY_AREA_LABELS } from "@shared/admin-history";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import { formatDateTime } from "@frontend/portal/client";
import type { AdminHistoryEntry } from "@shared/types";

type ColumnKey = "when" | "email" | "action" | "service" | "change";

const accessors: Record<ColumnKey, (item: AdminHistoryEntry) => { sort: string; filter: string }> = {
  when: (item) => ({ sort: item.createdAt, filter: formatDateTime(item.createdAt) }),
  email: (item) => ({ sort: item.adminEmail, filter: item.adminEmail }),
  action: (item) => {
    const label = HISTORY_ACTION_LABELS[item.action] ?? item.action;
    return { sort: label, filter: label };
  },
  service: (item) => {
    const label = HISTORY_AREA_LABELS[item.area] ?? item.area;
    return { sort: label, filter: label };
  },
  change: (item) => ({ sort: item.summary, filter: item.summary }),
};

export default function AdminActivityTable({
  items,
  emptyTitle,
  emptyDescription,
  showEmail = false,
}: {
  items: AdminHistoryEntry[];
  emptyTitle: string;
  emptyDescription: string;
  showEmail?: boolean;
}) {
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(
    items,
    accessors,
    "when"
  );

  if (items.length === 0) {
    return <AdminEmptyState icon={History} title={emptyTitle} description={emptyDescription} />;
  }

  const headers: Array<{ key: ColumnKey; label: string; sort?: boolean; filter?: boolean }> = [
    { key: "when", label: "When", sort: true },
    ...(showEmail ? [{ key: "email" as const, label: "Admin email", sort: true, filter: true }] : []),
    { key: "action", label: "Action", sort: true, filter: true },
    { key: "service", label: "Service", sort: true, filter: true },
    { key: "change", label: "Change", filter: true },
  ];

  return (
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
              <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDateTime(item.createdAt)}</td>
              {showEmail ? <td className="px-4 py-3 font-medium text-foreground">{item.adminEmail}</td> : null}
              <td className="px-4 py-3">{HISTORY_ACTION_LABELS[item.action] ?? item.action}</td>
              <td className="px-4 py-3 text-muted">{HISTORY_AREA_LABELS[item.area] ?? item.area}</td>
              <td className="px-4 py-3">{item.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
