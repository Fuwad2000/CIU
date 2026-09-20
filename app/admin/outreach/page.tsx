"use client";

import Link from "next/link";
import { Megaphone, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatDateTime } from "@/lib/portal/client";
import {
  OUTREACH_AUDIENCE_LABELS,
  OUTREACH_STATUS_LABELS,
  OUTREACH_TYPE_LABELS,
  type OutreachCampaign,
} from "@/lib/portal/outreach";

export default function OutreachCampaignsPage() {
  const [items, setItems] = useState<OutreachCampaign[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<OutreachCampaign[]>("/api/admin/outreach/campaigns")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Outreach"
        title="Campaigns"
        description="Draft and review CIU emails from one place. Regular admins can prepare campaigns; intermediate and super admins can send."
        action={
          <Link
            href="/admin/outreach/new"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} />
            Create campaign
          </Link>
        }
      />
      {error ? <p className="mb-4 text-sm text-danger">{error}</p> : null}
      <div className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {items.length === 0 ? (
          <AdminEmptyState
            icon={Megaphone}
            title="No campaigns yet"
            description="Create a draft, choose who should receive it, and ask an intermediate or super admin to send when email delivery is connected."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-background/70 text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Audiences</th>
                  <th className="px-4 py-3 font-medium">Recipients</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/admin/outreach/${item.id}`} className="font-medium text-foreground hover:text-brand">
                        {item.subject || "Untitled draft"}
                      </Link>
                      <p className="mt-0.5 text-xs text-muted">
                        {item.sentByName || item.createdByName}
                        {item.sentAt ? ` · sent ${formatDateTime(item.sentAt)}` : ""}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted">{OUTREACH_TYPE_LABELS[item.type]}</td>
                    <td className="px-4 py-3 text-muted">{OUTREACH_STATUS_LABELS[item.status]}</td>
                    <td className="px-4 py-3 text-muted">
                      {item.audiences.map((id) => OUTREACH_AUDIENCE_LABELS[id]).join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted">{item.delivery.total}</td>
                    <td className="px-4 py-3 text-muted">{formatDateTime(item.createdAt)}</td>
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
