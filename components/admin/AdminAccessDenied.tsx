"use client";

import AdminAuthFrame from "@/components/admin/AdminAuthFrame";
import AdminBrandMark from "@/components/admin/AdminBrandMark";

export default function AdminAccessDenied({ onSignOut }: { onSignOut: () => void }) {
  return (
    <AdminAuthFrame>
      <AdminBrandMark size={44} className="hidden lg:inline-flex" />
      <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-brand uppercase lg:mt-10">Staff portal</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">This account doesn’t have access</h1>
      <div className="gold-accent-bar mt-4" />
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        You’re signed in, but this Microsoft account isn’t set up for the staff portal yet. If you should have access,
        please contact a CIU administrator.
      </p>
      <button
        type="button"
        onClick={onSignOut}
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-brand px-5 py-3.5 text-sm font-semibold text-white shadow-premium transition hover:bg-brand-dark sm:text-base"
      >
        Sign out
      </button>
    </AdminAuthFrame>
  );
}
