import Link from "next/link";
import { BookOpen, Users } from "lucide-react";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";

const programs = [
  {
    href: "/admin/registrations/quran",
    title: "Quran class",
    description: "Adult and all-learner sign-ups for Tuesday & Thursday Quran class.",
    icon: BookOpen,
  },
  {
    href: "/admin/registrations/kids",
    title: "Kids program",
    description: "Weekend school sign-ups with grade and parent or guardian details.",
    icon: Users,
  },
] as const;

export default function AdminRegistrationsIndex() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Registration"
        title="Registrations"
        description="Choose a program to review sign-ups from the public registration form."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {programs.map((program) => {
          const Icon = program.icon;
          return (
            <Link
              key={program.href}
              href={program.href}
              className="rounded-3xl border border-border/80 bg-surface p-5 shadow-sm transition hover:border-brand/35"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-base font-semibold text-foreground">{program.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{program.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
