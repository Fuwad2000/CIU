import Link from "next/link";
import { ArrowUpRight, CalendarDays, Globe, Mail } from "lucide-react";

export default function AdminFooter() {
  return (
    <footer className="border-t border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          CIU Staff Portal
          <span className="mx-2 text-border">·</span>
          Canadian Islamic Union
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-medium text-brand transition hover:text-brand-dark"
          >
            <Globe className="h-4 w-4" strokeWidth={1.75} />
            Public website
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
          <Link href="/Events" className="inline-flex items-center gap-1.5 text-muted transition hover:text-foreground">
            <CalendarDays className="h-4 w-4" strokeWidth={1.75} />
            Events
          </Link>
          <Link href="/Contact" className="inline-flex items-center gap-1.5 text-muted transition hover:text-foreground">
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
