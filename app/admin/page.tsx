"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, BookOpen, CalendarDays, History, Mail, Users } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch } from "@/lib/portal/client";

type Overview = {
  azureConnected: boolean;
  counts: {
    announcements: number;
    events: number;
    contacts: number;
    quranRegistrations: number;
    kidsRegistrations: number;
    history: number;
  };
};

const cards = [
  { href: "/admin/announcements", key: "announcements", label: "Announcements", hint: "Ticker messages", icon: Bell },
  { href: "/admin/events", key: "events", label: "Events", hint: "Public event list", icon: CalendarDays },
  { href: "/admin/contacts", key: "contacts", label: "Contact messages", hint: "Form inbox", icon: Mail },
  { href: "/admin/registrations/quran", key: "quranRegistrations", label: "Quran class", hint: "Adult registrations", icon: BookOpen },
  { href: "/admin/registrations/kids", key: "kidsRegistrations", label: "Kids program", hint: "Weekend school", icon: Users },
  { href: "/admin/history", key: "history", label: "History", hint: "Staff activity", icon: History },
] as const;

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Overview>("/api/admin/overview")
      .then(setOverview)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="Manage announcements, events, messages, and class registrations. The public website reads the same records."
      />
      {overview ? (
        <p className="mb-6 rounded-2xl border border-brand/15 bg-brand/5 px-4 py-3 text-sm text-brand-dark xl:text-base">
          {overview.azureConnected
            ? "Connected to Azure API."
            : "Using the local adapter until Azure is connected. Data can reset on deploy."}
        </p>
      ) : null}
      {error ? <p className="mb-6 text-sm text-red-700">{error}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:-translate-y-0.5 hover:border-brand/25 hover:bg-white hover:shadow-sm xl:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white xl:h-12 xl:w-12">
                <Icon className="h-5 w-5 xl:h-6 xl:w-6" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">
                {overview?.counts[card.key] ?? "—"}
              </p>
              <p className="mt-1 text-base font-medium text-foreground xl:text-lg">{card.label}</p>
              <p className="mt-0.5 text-sm text-muted xl:text-base">{card.hint}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
