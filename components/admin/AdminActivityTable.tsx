"use client";

import { History } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { HISTORY_ACTION_LABELS, HISTORY_AREA_LABELS } from "@/lib/portal/admin-history";
import { formatDateTime } from "@/lib/portal/client";
import type { AdminHistoryEntry } from "@/lib/portal/types";

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
  if (items.length === 0) {
    return (
      <AdminEmptyState icon={History} title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm xl:text-base">
        <thead className="border-b border-border bg-background text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">When</th>
            {showEmail ? <th className="px-4 py-3 font-medium">Admin email</th> : null}
            <th className="px-4 py-3 font-medium">Action</th>
            <th className="px-4 py-3 font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border last:border-0 align-top">
              <td className="px-4 py-3 whitespace-nowrap text-muted">{formatDateTime(item.createdAt)}</td>
              {showEmail ? (
                <td className="px-4 py-3 font-medium text-foreground">{item.adminEmail}</td>
              ) : null}
              <td className="px-4 py-3">
                {HISTORY_ACTION_LABELS[item.action] ?? item.action}
                <span className="block text-xs text-muted">
                  {HISTORY_AREA_LABELS[item.area] ?? item.area}
                </span>
              </td>
              <td className="px-4 py-3">{item.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
