"use client";

import Link from "next/link";
import { History, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import { adminFetch, formatDateTime } from "@frontend/portal/client";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import {
  isOutreachHistoryStatus,
  OUTREACH_AUDIENCE_LABELS,
  OUTREACH_STATUS_LABELS,
  OUTREACH_TYPE_LABELS,
  type OutreachCampaign,
} from "@shared/outreach";

type ColumnKey = "sent" | "subject" | "type" | "createdBy" | "sentBy" | "audiences" | "delivery" | "status";

function deliveryLabel(item: OutreachCampaign) {
  return `${item.delivery.sent} sent${item.delivery.failed ? ` · ${item.delivery.failed} failed` : ""}${
    item.delivery.total ? ` / ${item.delivery.total}` : ""
  }`;
}

const accessors: Record<ColumnKey, (item: OutreachCampaign) => { sort: string; filter: string }> = {
  sent: (item) => ({
    sort: item.sentAt || item.updatedAt,
    filter: formatDateTime(item.sentAt || item.updatedAt),
  }),
  subject: (item) => ({ sort: item.subject || "Untitled", filter: item.subject || "Untitled" }),
  type: (item) => ({ sort: OUTREACH_TYPE_LABELS[item.type], filter: OUTREACH_TYPE_LABELS[item.type] }),
  createdBy: (item) => ({
    sort: item.createdByName,
    filter: [item.createdByName, item.createdByEmail].filter(Boolean).join(" "),
  }),
  sentBy: (item) => ({
    sort: item.sentByName || item.createdByName,
    filter: [item.sentByName || item.createdByName, item.sentByEmail].filter(Boolean).join(" "),
  }),
  audiences: (item) => {
    const label = item.audiences.map((id) => OUTREACH_AUDIENCE_LABELS[id]).join(", ");
    return { sort: label, filter: label };
  },
  delivery: (item) => ({ sort: String(item.delivery.sent).padStart(6, "0"), filter: deliveryLabel(item) }),
  status: (item) => ({ sort: OUTREACH_STATUS_LABELS[item.status], filter: OUTREACH_STATUS_LABELS[item.status] }),
};

const headers: Array<{ key: ColumnKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "sent", label: "Sent", sort: true },
  { key: "subject", label: "Subject", sort: true, filter: true },
  { key: "type", label: "Type", sort: true, filter: true },
  { key: "createdBy", label: "Created by", sort: true, filter: true },
  { key: "sentBy", label: "Sent by", sort: true, filter: true },
  { key: "audiences", label: "Audiences", filter: true },
  { key: "delivery", label: "Delivery", sort: true },
  { key: "status", label: "Status", sort: true, filter: true },
];

export default function OutreachCampaignsPage() {
  const { profile } = useAdminSession();
  const [items, setItems] = useState<OutreachCampaign[]>([]);
  const [error, setError] = useState("");
  const historyItems = useMemo(() => items.filter((item) => isOutreachHistoryStatus(item.status)), [items]);
  const drafts = useMemo(() => items.filter((item) => item.status === "draft"), [items]);
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(
    historyItems,
    accessors,
    "sent"
  );

  useEffect(() => {
    adminFetch<OutreachCampaign[]>("/api/admin/outreach/campaigns")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Outreach"
        title="Outreach history"
        description="A record of emails that left Outreach: who created them, who sent them, the type, audiences, and how delivery finished. Sort or filter from a column heading."
        action={
          profile.canSendOutreach ? (
            <Link
              href="/admin/outreach/new"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              <Plus className="h-4 w-4" strokeWidth={1.75} />
              Create campaign
            </Link>
          ) : undefined
        }
      />
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      {drafts.length > 0 ? (
        <p className="mt-3 text-sm text-muted">
          {drafts.length === 1 ? "1 unsent draft is still open. " : `${drafts.length} unsent drafts are still open. `}
          {drafts.slice(0, 3).map((item, index) => (
            <span key={item.id}>
              {index > 0 ? " · " : null}
              <Link href={`/admin/outreach/${item.id}`} className="font-medium text-brand hover:underline">
                {item.subject || "Untitled"}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {historyItems.length === 0 ? (
          <AdminEmptyState
            icon={History}
            title="No outreach sent yet"
            description="When a campaign is sent, it will appear here with the person who created it, the type, and delivery results."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-background/70 text-muted">
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
                  <tr key={item.id} className="border-b border-border/70 last:border-0 align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {formatDateTime(item.sentAt || item.updatedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/outreach/${item.id}`} className="font-medium text-foreground hover:text-brand">
                        {item.subject || "Untitled"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{OUTREACH_TYPE_LABELS[item.type]}</td>
                    <td className="px-4 py-3">
                      <p className="text-foreground">{item.createdByName}</p>
                      {item.createdByEmail ? <p className="mt-0.5 text-xs text-muted">{item.createdByEmail}</p> : null}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-foreground">{item.sentByName || item.createdByName}</p>
                      {item.sentByEmail ? <p className="mt-0.5 text-xs text-muted">{item.sentByEmail}</p> : null}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {item.audiences.map((id) => OUTREACH_AUDIENCE_LABELS[id]).join(", ") || "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">{deliveryLabel(item)}</td>
                    <td className="px-4 py-3 text-muted">{OUTREACH_STATUS_LABELS[item.status]}</td>
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
