"use client";

import AdminAuthFrame from "@/components/admin/AdminAuthFrame";
import AdminBrandMark from "@/components/admin/AdminBrandMark";

export function AdminAuthStatus({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <AdminAuthFrame>
      <AdminBrandMark size={44} className="hidden lg:inline-flex" />
      <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-brand uppercase lg:mt-10">Staff portal</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <div className="gold-accent-bar mt-4" />
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-brand/15">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-brand" />
      </div>
    </AdminAuthFrame>
  );
}
