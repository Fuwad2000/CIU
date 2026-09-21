"use client";

import { useEffect, useState } from "react";
import AdminActivityTable from "@frontend/components/admin/AdminActivityTable";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import { adminFetch } from "@frontend/portal/client";
import type { AdminHistoryEntry } from "@shared/types";

type ProfilePayload = {
  history: AdminHistoryEntry[];
};

export default function AdminProfileHistoryPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<AdminHistoryEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<ProfilePayload>("/api/admin/profile")
      .then((payload) => setItems(payload.history))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Your account"
        title="History"
        description={`Only your changes in the staff portal, recorded under ${profile.email}. Sort or filter from a column heading.`}
      />
      {error ? <p className="mb-4 text-sm text-danger">{error}</p> : null}
      <section className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        <AdminActivityTable
          items={items}
          emptyTitle="No history yet"
          emptyDescription="When you sign in or update a record, it will show up here."
        />
      </section>
    </div>
  );
}
