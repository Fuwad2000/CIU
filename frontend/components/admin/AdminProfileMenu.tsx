"use client";

import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import { displayInitials } from "@shared/admin-me";
import { ADMIN_ROLE_LABELS } from "@shared/admin-roles";

export default function AdminProfileMenu() {
  const { profile, onSignOut } = useAdminSession();
  const initials = displayInitials(profile.displayName);

  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark"
        aria-haspopup="menu"
        aria-label="Open profile menu"
      >
        {initials}
      </button>
      <div className="invisible absolute top-full right-0 z-50 w-64 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_12px_32px_rgba(15,23,42,0.14)]">
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-semibold text-foreground">{profile.displayName}</p>
            <p className="mt-0.5 truncate text-xs text-muted">{profile.email}</p>
            <p className="mt-1 text-xs font-medium text-brand">{ADMIN_ROLE_LABELS[profile.role]}</p>
          </div>
          <div className="p-1.5">
            <Link
              href="/admin/profile"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition hover:bg-background"
            >
              <UserRound className="h-4 w-4 text-muted" strokeWidth={1.75} />
              View profile
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-danger transition hover:bg-background"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
