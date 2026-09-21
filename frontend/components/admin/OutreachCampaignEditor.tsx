"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { AdminApiError, adminFetch } from "@frontend/portal/client";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import PosterUpload from "@frontend/components/admin/PosterUpload";
import { formInputClassName, formShellClassName } from "@frontend/lib/formStyles";
import { posterPreviewSrc, type PosterImageInput } from "@shared/poster-image";
import {
  OUTREACH_AUDIENCE_LABELS,
  OUTREACH_TYPE_LABELS,
  OUTREACH_TYPES,
  type OutreachAudienceId,
  type OutreachCampaign,
  type OutreachPreview,
  type OutreachType,
} from "@shared/outreach";
import type { PortalEvent } from "@shared/types";

type AudienceOption = {
  id: OutreachAudienceId;
  label: string;
  description: string;
  eligibleCount: number;
};

type Draft = {
  type: OutreachType;
  subject: string;
  content: string;
  audiences: OutreachAudienceId[];
  eventId: string;
};

const emptyDraft: Draft = {
  type: "newsletter",
  subject: "",
  content: "",
  audiences: [],
  eventId: "",
};

function draftFromCampaign(campaign: OutreachCampaign): Draft {
  return {
    type: campaign.type,
    subject: campaign.subject,
    content: campaign.content,
    audiences: campaign.audiences,
    eventId: campaign.eventId ?? "",
  };
}

export default function OutreachCampaignEditor({ campaign }: { campaign?: OutreachCampaign }) {
  const router = useRouter();
  const { profile } = useAdminSession();
  const [draft, setDraft] = useState<Draft>(campaign ? draftFromCampaign(campaign) : emptyDraft);
  const [audiences, setAudiences] = useState<AudienceOption[]>([]);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [savedId, setSavedId] = useState(campaign?.id ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<OutreachPreview | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [poster, setPoster] = useState<PosterImageInput | null>(null);

  useEffect(() => {
    adminFetch<{ audiences: AudienceOption[] }>("/api/admin/outreach/audiences")
      .then((payload) => setAudiences(payload.audiences))
      .catch((err: Error) => setError(err.message));
    adminFetch<PortalEvent[]>("/api/admin/events")
      .then(setEvents)
      .catch(() => undefined);
  }, []);

  const payload = () => ({
    type: draft.type,
    subject: draft.subject,
    content: draft.content,
    audiences: draft.audiences,
    eventId: draft.type === "event" ? draft.eventId : "",
  });

  const toggleAudience = (id: OutreachAudienceId) => {
    setPreview(null);
    setDraft((current) => ({
      ...current,
      audiences: current.audiences.includes(id)
        ? current.audiences.filter((item) => item !== id)
        : [...current.audiences, id],
    }));
  };

  const saveDraft = async () => {
    setError("");
    setSaving(true);
    try {
      if (campaign?.id || savedId) {
        const id = campaign?.id || savedId;
        const updated = await adminFetch<OutreachCampaign>(`/api/admin/outreach/campaigns/${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload()),
        });
        setDraft(draftFromCampaign(updated));
        setSavedId(updated.id);
        return updated;
      }
      const created = await adminFetch<OutreachCampaign>("/api/admin/outreach/campaigns", {
        method: "POST",
        body: JSON.stringify(payload()),
      });
      setSavedId(created.id);
      setDraft(draftFromCampaign(created));
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save draft.");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const runPreview = async () => {
    setError("");
    try {
      const next = await adminFetch<OutreachPreview>("/api/admin/outreach/preview", {
        method: "POST",
        body: JSON.stringify({ audiences: draft.audiences }),
      });
      setPreview(next);
      return next;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not preview recipients.");
      return null;
    }
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    const saved = await saveDraft();
    if (saved && !campaign) router.replace(`/admin/outreach/${saved.id}`);
  };

  const openSendConfirm = async () => {
    setError("");
    if (!draft.subject.trim() || !draft.content.trim()) {
      setError("Subject and email content are required before sending.");
      return;
    }
    if (draft.audiences.length === 0) {
      setError("Choose at least one audience before sending.");
      return;
    }
    const saved = await saveDraft();
    if (!saved) return;
    const next = await runPreview();
    if (next) setConfirmOpen(true);
  };

  const confirmSend = async () => {
    setSending(true);
    setError("");
    try {
      const saved = await saveDraft();
      if (!saved) return;
      await adminFetch(`/api/admin/outreach/campaigns/${saved.id}/send`, {
        method: "POST",
        body: JSON.stringify(poster ? { poster } : {}),
      });
      setConfirmOpen(false);
      router.replace(`/admin/outreach/${saved.id}`);
    } catch (err) {
      const message =
        err instanceof AdminApiError ? err.message : err instanceof Error ? err.message : "Could not send campaign.";
      setError(message);
      setConfirmOpen(false);
      if (savedId) router.replace(`/admin/outreach/${savedId}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <form onSubmit={(event) => void handleSave(event)} className={`${formShellClassName} p-5 sm:p-6`}>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Campaign type</span>
              <select
                value={draft.type}
                onChange={(event) => {
                  setDraft((current) => ({ ...current, type: event.target.value as OutreachType }));
                }}
                className={formInputClassName}
              >
                {OUTREACH_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {OUTREACH_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Subject</span>
              <input
                value={draft.subject}
                onChange={(event) => setDraft((current) => ({ ...current, subject: event.target.value }))}
                className={formInputClassName}
                maxLength={200}
                required
              />
            </label>

            {draft.type === "event" ? (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Related event</span>
                <select
                  value={draft.eventId}
                  onChange={(event) => setDraft((current) => ({ ...current, eventId: event.target.value }))}
                  className={formInputClassName}
                >
                  <option value="">None — event type is a label only</option>
                  {events.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <span className="mt-1.5 block text-sm text-muted">
                  Recipients still come from the audiences you select. Event registration is not in this version.
                </span>
              </label>
            ) : null}

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-foreground">Audiences</legend>
              <p className="mb-3 text-sm text-muted">
                Choose who should receive this. People in more than one list are counted once.
              </p>
              <div className="space-y-2">
                {audiences.map((audience) => {
                  const checked = draft.audiences.includes(audience.id);
                  return (
                    <div
                      key={audience.id}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3"
                    >
                      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAudience(audience.id)}
                          className="mt-1 h-4 w-4 accent-[var(--brand,#0f7a4a)]"
                        />
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            {audience.label}
                            <span className="ml-2 font-normal text-muted">{audience.eligibleCount}</span>
                          </span>
                          <span className="mt-0.5 block text-sm text-muted">{audience.description}</span>
                        </span>
                      </label>
                      {audience.id === "additional" ? (
                        <Link
                          href="/admin/outreach/additional"
                          className="shrink-0 pt-0.5 text-sm font-medium text-brand hover:underline"
                        >
                          Manage list
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </fieldset>
            {draft.audiences.includes("admins") && !profile.canSelectStaffAudience ? (
              <p className="text-sm text-muted">
                This draft includes CIU staff. You can preview the unique count. An intermediate or super admin has to
                change that audience or send.
              </p>
            ) : null}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Email content</span>
              <textarea
                value={draft.content}
                onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
                className={`${formInputClassName} min-h-64 font-[inherit] leading-relaxed`}
                placeholder="Write the message CIU would send."
              />
            </label>

            <PosterUpload
              label="Poster (optional)"
              hint="Add a picture from this device to include in the email. It is not saved yet — blob storage comes later."
              poster={poster}
              onChange={setPoster}
              onError={setError}
            />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Preview</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{draft.subject || "Subject"}</p>
              {poster ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-border bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={posterPreviewSrc(poster)} alt="Poster preview" className="max-h-64 w-full object-contain" />
                </div>
              ) : null}
              <div className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-muted">
                {draft.content || "The email body will appear here."}
              </div>
            </div>
            {preview ? (
              <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4">
                <p className="text-sm font-semibold text-foreground">Recipient preview</p>
                <p className="mt-1 text-sm text-muted">
                  {preview.uniqueCount} unique {preview.uniqueCount === 1 ? "person" : "people"} after combining
                  selected lists.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
          <button
            type="button"
            onClick={() => void runPreview()}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
          >
            Preview
          </button>
          {profile.canSendOutreach ? (
            <button
              type="button"
              onClick={() => void openSendConfirm()}
              className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Send
            </button>
          ) : (
            <p className="self-center text-sm text-muted">
              Regular admins can save drafts. An intermediate or super admin has to send.
            </p>
          )}
          <Link href="/admin/outreach" className="self-center text-sm font-medium text-muted hover:text-foreground">
            Back to history
          </Link>
        </div>
      </form>

      {confirmOpen && preview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Confirm send</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Send this campaign?</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Type</dt>
                <dd className="font-medium text-foreground">{OUTREACH_TYPE_LABELS[draft.type]}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Subject</dt>
                <dd className="text-right font-medium text-foreground">{draft.subject}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Audiences</dt>
                <dd className="text-right font-medium text-foreground">
                  {draft.audiences.map((id) => OUTREACH_AUDIENCE_LABELS[id]).join(", ")}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Unique recipients</dt>
                <dd className="font-medium text-foreground">{preview.uniqueCount}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Poster</dt>
                <dd className="font-medium text-foreground">{poster ? poster.name : "None"}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted">
              This sends one email to each unique person in the selected groups at the same time. People on more than
              one list receive a single message. Recipient addresses stay hidden from each other.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void confirmSend()}
                disabled={sending}
                className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send now"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
