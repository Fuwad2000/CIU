"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import AdminRoleGate from "@frontend/components/admin/AdminRoleGate";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import AdminActivityTable from "@frontend/components/admin/AdminActivityTable";
import { adminFetch } from "@frontend/portal/client";
import type { AdminHistoryEntry } from "@shared/types";

export default function AdminHistoryPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<AdminHistoryEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!profile.canViewAllHistory) return;
    adminFetch<AdminHistoryEntry[]>("/api/admin/history")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, [profile.canViewAllHistory]);

  return (
    <AdminRoleGate allow={profile.canViewAllHistory} redirectTo="/admin/profile/history">
      <div>
        <AdminPageHeader
          eyebrow="Staff"
          title="History"
          description="Every staff change, including who made it, the action, and which service was affected. Sort or filter from a column heading."
        />
        {error ? <p className="mb-4 text-sm text-danger">{error}</p> : null}
        <div className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
          {items.length === 0 && !error ? (
            <AdminEmptyState
              icon={History}
              title="No activity yet"
              description="Create or update a record. Changes will appear here."
            />
          ) : (
            <AdminActivityTable
              items={items}
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
