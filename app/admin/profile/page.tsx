"use client";

import AdminAccessCards from "@/components/admin/AdminAccessCards";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminSession } from "@/components/admin/AdminSessionContext";
import { displayInitials } from "@/lib/portal/admin-me";
import { ADMIN_ROLE_LABELS, ADMIN_ROLE_SUMMARIES } from "@/lib/portal/admin-roles";
import { formatDateTime, formatShortDate } from "@/lib/portal/client";

export default function AdminProfilePage() {
  const { profile } = useAdminSession();
  const roleLabel = ADMIN_ROLE_LABELS[profile.role];

  return (
    <div>
      <AdminPageHeader
        eyebrow="Your account"
        title={profile.displayName}
        description={ADMIN_ROLE_SUMMARIES[profile.role]}
      />

      <section className="rounded-3xl border border-border/80 bg-background p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand text-xl font-semibold text-white">
            {displayInitials(profile.displayName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold text-foreground">{profile.displayName}</p>
            <p className="mt-0.5 truncate text-sm text-muted">{profile.email}</p>
            <p className="mt-2 text-sm text-foreground">
              {roleLabel}
              <span className="text-muted"> · {profile.isActive ? "Active" : "Inactive"}</span>
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Microsoft account</dt>
            <dd className="mt-1 text-base text-foreground">{profile.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Access</dt>
            <dd className="mt-1 text-base text-foreground">{roleLabel}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Last signed in</dt>
            <dd className="mt-1 text-base text-foreground">
              {profile.lastLoginAt ? formatDateTime(profile.lastLoginAt) : "Not recorded yet"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Added</dt>
            <dd className="mt-1 text-base text-foreground">{formatShortDate(profile.createdAt)}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-8">
        <AdminAccessCards role={profile.role} />
      </div>
    </div>
  );
}
