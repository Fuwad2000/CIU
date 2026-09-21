"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Contact } from "lucide-react";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { adminFetch } from "@frontend/portal/client";

type AudienceRow = {
  id: string;
  label: string;
  description: string;
  href: string;
  eligibleCount: number;
};

export default function OutreachAudiencesPage() {
  const [items, setItems] = useState<AudienceRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<{ audiences: AudienceRow[] }>("/api/admin/outreach/audiences")
      .then((payload) => setItems(payload.audiences))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Outreach"
        title="Audiences"
        description="These are the lists you can email from Outreach. Contact list is unique people: each form sender once, plus anyone staff add."
      />
      {error ? <p className="mb-4 text-sm text-danger">{error}</p> : null}
      {items.length === 0 ? (
        <div className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
          <AdminEmptyState
            icon={Contact}
            title="No audiences loaded"
            description="Run the Outreach SQL script if this stays empty, then refresh."
          />
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-3xl border border-border/80 bg-surface p-5 shadow-sm transition hover:border-brand/35"
            >
              <p className="text-base font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              <p className="mt-4 text-sm font-medium text-brand">{item.eligibleCount} eligible</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
