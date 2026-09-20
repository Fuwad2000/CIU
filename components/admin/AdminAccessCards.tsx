"use client";

import Link from "next/link";
import { ArrowUpRight, Bell, BookOpen, CalendarDays, HeartHandshake, History, Mail, Megaphone, Newspaper, Shield, UserCog, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ADMIN_ACCESS_AREAS,
  ADMIN_ROLE_ACCESS,
  type AdminAccessAreaId,
  type AdminRole,
} from "@/lib/portal/admin-roles";

const icons: Record<AdminAccessAreaId, LucideIcon> = {
  announcements: Bell,
  events: CalendarDays,
  contacts: Mail,
  members: UserPlus,
  volunteers: HeartHandshake,
  newsletter: Newspaper,
  registrations: BookOpen,
  users: UserCog,
  access: Shield,
  staffHistory: History,
  outreach: Megaphone,
};

export default function AdminAccessCards({ role }: { role: AdminRole }) {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Access</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">What you can do</h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          These are the parts of the portal your account can open. Tap a card to go there.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {ADMIN_ROLE_ACCESS[role].map((id) => {
          const area = ADMIN_ACCESS_AREAS[id];
          const Icon = icons[id];
          return (
            <Link
              key={id}
              href={area.href}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-background p-5 transition hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-gradient transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100"
                  strokeWidth={1.75}
                />
              </div>
              <p className="mt-4 text-base font-semibold text-foreground">{area.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{area.description}</p>
              <div className="gold-accent-bar mt-4 w-8 transition-all duration-300 group-hover:w-12" aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
