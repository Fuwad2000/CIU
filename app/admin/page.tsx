"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, BookOpen, CalendarDays, HeartHandshake, History, Mail, Megaphone, Newspaper, UserPlus, Users } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminSession } from "@/components/admin/AdminSessionContext";
import { ADMIN_ROLE_SUMMARIES } from "@/lib/portal/admin-roles";
import { adminFetch } from "@/lib/portal/client";

type Overview = {
  backend?: "sql" | "azure-api" | "memory";
  sqlConnected?: boolean;
  azureConnected: boolean;
  counts: {
    announcements: number;
    events: number;
    contacts: number;
    members: number;
    volunteers: number;
    newsletter: number;
    outreach: number;
    quranRegistrations: number;
    kidsRegistrations: number;
    history: number;
  };
};

const cards = [
  { href: "/admin/announcements", key: "announcements", label: "Announcements", hint: "Ticker messages", icon: Bell },
  { href: "/admin/events", key: "events", label: "Events", hint: "Public event list", icon: CalendarDays },
  { href: "/admin/contacts", key: "contacts", label: "Contact messages", hint: "Form inbox", icon: Mail },
  { href: "/admin/members", key: "members", label: "Membership", hint: "Mailing list", icon: UserPlus },
  { href: "/admin/volunteers", key: "volunteers", label: "Volunteers", hint: "Service sign-ups", icon: HeartHandshake },
  { href: "/admin/newsletter", key: "newsletter", label: "Newsletter", hint: "Event emails", icon: Newspaper },
  { href: "/admin/outreach", key: "outreach", label: "Outreach", hint: "Email campaigns", icon: Megaphone },
  { href: "/admin/registrations/quran", key: "quranRegistrations", label: "Quran class", hint: "Adult registrations", icon: BookOpen },
  { href: "/admin/registrations/kids", key: "kidsRegistrations", label: "Kids program", hint: "Weekend school", icon: Users },
  {
    href: "/admin/history",
    key: "history",
    label: "History",
    hint: "Staff activity",
    icon: History,
    staffOnly: true,
  },
] as const;

export default function AdminOverviewPage() {
  const { profile } = useAdminSession();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Overview>("/api/admin/overview")
      .then(setOverview)
      .catch((err: Error) => setError(err.message));
  }, []);

  const visibleCards = cards.filter((card) => !("staffOnly" in card && card.staffOnly) || profile.canViewAllHistory);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Dashboard"
        title={`Welcome, ${profile.displayName.split(/\s+/)[0] || profile.displayName}`}
        description={ADMIN_ROLE_SUMMARIES[profile.role]}
      />
      {overview ? (
        <p className="mb-6 rounded-2xl border border-brand/20 bg-brand/10 px-4 py-3 text-sm text-foreground xl:text-base">
          {overview.sqlConnected
            ? "Connected to Azure SQL (ciu-db-dev)."
            : overview.azureConnected
              ? "Connected to Azure API."
              : "Using the local adapter until Azure SQL is configured. Run `az login` locally. Data can reset on deploy."}
        </p>
      ) : null}
      {error ? <p className="mb-6 text-sm text-danger">{error}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-brand/30 hover:bg-surface hover:shadow-sm xl:p-6"
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
