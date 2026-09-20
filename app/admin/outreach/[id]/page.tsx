"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import OutreachCampaignEditor from "@/components/admin/OutreachCampaignEditor";
import { useAdminSession } from "@/components/admin/AdminSessionContext";
import { adminFetch, formatDateTime } from "@/lib/portal/client";
import {
  OUTREACH_AUDIENCE_LABELS,
  OUTREACH_STATUS_LABELS,
  OUTREACH_TYPE_LABELS,
  type OutreachCampaign,
  type OutreachRecipient,
} from "@/lib/portal/outreach";
import { Megaphone } from "lucide-react";

export default function OutreachCampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const { profile } = useAdminSession();
  const [campaign, setCampaign] = useState<OutreachCampaign | null>(null);
  const [recipients, setRecipients] = useState<OutreachRecipient[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params.id) return;
    adminFetch<OutreachCampaign>(`/api/admin/outreach/campaigns/${params.id}`)
      .then(setCampaign)
      .catch((err: Error) => setError(err.message));
  }, [params.id]);

  useEffect(() => {
    if (!campaign || campaign.status === "draft" || !profile.canViewOutreachRecipients) return;
    adminFetch<OutreachRecipient[]>(`/api/admin/outreach/campaigns/${campaign.id}/recipients`)
      .then(setRecipients)
      .catch(() => setRecipients([]));
  }, [campaign, profile.canViewOutreachRecipients]);

  if (error) {
    return (
      <div>
        <AdminPageHeader eyebrow="Outreach" title="Campaign" description="This campaign could not be opened." />
        <p className="text-sm text-danger">{error}</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div>
        <AdminPageHeader eyebrow="Outreach" title="Campaign" description="Loading campaign…" />
      </div>
    );
  }

  if (campaign.status === "draft") {
    return (
      <div>
        <AdminPageHeader
          eyebrow="Outreach"
          title={campaign.subject || "Untitled draft"}
          description="Edit this draft, preview the unique recipient count, and send when you have permission."
        />
        <OutreachCampaignEditor campaign={campaign} />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Outreach"
        title={campaign.subject}
        description={`${OUTREACH_TYPE_LABELS[campaign.type]} · ${OUTREACH_STATUS_LABELS[campaign.status]}`}
        action={
          <Link href="/admin/outreach" className="text-sm font-medium text-muted hover:text-foreground">
            Back to campaigns
          </Link>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border border-border/80 bg-surface p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Details</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-muted">Audiences</dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {campaign.audiences.map((id) => OUTREACH_AUDIENCE_LABELS[id]).join(", ") || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Created</dt>
              <dd className="mt-0.5 text-foreground">
                {campaign.createdByName} · {formatDateTime(campaign.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Sent</dt>
              <dd className="mt-0.5 text-foreground">
                {campaign.sentAt
                  ? `${campaign.sentByName || campaign.createdByName} · ${formatDateTime(campaign.sentAt)}`
                  : "Not sent"}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Recipients</dt>
              <dd className="mt-0.5 text-foreground">{campaign.delivery.total} unique</dd>
            </div>
            <div>
              <dt className="text-muted">Delivery</dt>
              <dd className="mt-0.5 text-foreground">
                Sent {campaign.delivery.sent} · Failed {campaign.delivery.failed} · Pending {campaign.delivery.pending}{" "}
                · Skipped {campaign.delivery.skipped}
              </dd>
            </div>
          </dl>
        </section>
        <section className="rounded-3xl border border-border/80 bg-surface p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Email</p>
          <p className="mt-3 text-sm font-semibold text-foreground">{campaign.subject}</p>
          <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">{campaign.content}</div>
        </section>
      </div>
      {profile.canViewOutreachRecipients ? (
        <section className="mt-4 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Recipient snapshot</p>
            <p className="mt-1 text-sm text-muted">Historical copy of who this campaign targeted.</p>
          </div>
          {recipients && recipients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border bg-background/70 text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Audience</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recipients.map((item) => (
                    <tr key={item.id} className="border-b border-border/70 last:border-0">
                      <td className="px-4 py-3">{item.displayName}</td>
                      <td className="px-4 py-3 text-muted">{item.email}</td>
                      <td className="px-4 py-3 text-muted">{OUTREACH_AUDIENCE_LABELS[item.audience]}</td>
                      <td className="px-4 py-3 text-muted">{item.deliveryStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <AdminEmptyState
              icon={Megaphone}
              title="No recipient snapshot yet"
              description="Recipient emails are stored when a campaign is actually sent."
            />
          )}
        </section>
      ) : (
        <p className="mt-4 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-muted">
          Recipient email addresses are hidden for regular admins. You can still see the campaign, audiences, and
          totals.
        </p>
      )}
    </div>
  );
}
