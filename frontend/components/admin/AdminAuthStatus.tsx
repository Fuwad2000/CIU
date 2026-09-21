"use client";

import type { ReactNode } from "react";
import AdminAuthFrame from "@frontend/components/admin/AdminAuthFrame";
import AdminBrandMark from "@frontend/components/admin/AdminBrandMark";
import { clampAuthProgress } from "@frontend/portal/admin-session-timeout";

export function AdminAuthStatus({
  title,
  description,
  action,
  progress,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  progress?: number;
}) {
  const percent = progress == null ? undefined : clampAuthProgress(progress);

  return (
    <AdminAuthFrame>
      <AdminBrandMark size={44} className="hidden lg:inline-flex" />
      <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-brand uppercase lg:mt-10">Staff portal</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <div className="gold-accent-bar mt-4" />
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      {action ? (
        <div className="mt-8">{action}</div>
      ) : (
        <div className="mt-8" role="status" aria-live="polite" aria-label={title}>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-brand/20 border-t-brand"
            />
            <p className="text-sm font-semibold text-foreground">
              {percent == null ? "Preparing…" : `${percent}% ready`}
            </p>
          </div>
          <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-brand/15">
            {percent == null ? (
              <span
                aria-hidden="true"
                className="absolute inset-y-0 w-1/3 animate-[auth-progress_1.15s_ease-in-out_infinite] rounded-full bg-brand"
              />
            ) : (
              <span
                aria-hidden="true"
                className="block h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
                style={{ width: `${percent}%` }}
              />
            )}
          </div>
        </div>
      )}
    </AdminAuthFrame>
  );
}
