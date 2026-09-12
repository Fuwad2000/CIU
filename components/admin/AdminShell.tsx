"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Globe,
  History,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Users,
} from "lucide-react";
import { ciuLogoSrc } from "@/content/SiteContent";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { adminFetch } from "@/lib/portal/client";
import AdminFooter from "@/components/admin/AdminFooter";

const navGroups = [
  {
    label: "Main",
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/announcements", label: "Announcements", icon: Bell },
      { href: "/admin/events", label: "Events", icon: CalendarDays },
    ],
  },
  {
    label: "Inbox",
    items: [
      { href: "/admin/contacts", label: "Contact messages", icon: Mail },
      { href: "/admin/registrations/quran", label: "Quran class", icon: BookOpen },
      { href: "/admin/registrations/kids", label: "Kids program", icon: Users },
    ],
  },
  {
    label: "Activity",
    items: [{ href: "/admin/history", label: "History", icon: History }],
  },
];

function isActivePath(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [identityError, setIdentityError] = useState("");
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("admin-type");
    return () => document.documentElement.classList.remove("admin-type");
  }, []);

  useEffect(() => {
    adminFetch<{ email: string }>("/api/admin/identity")
      .then((payload) => {
        setSavedEmail(payload.email);
        setEmail(payload.email);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const saveIdentity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIdentityError("");
    try {
      const payload = await adminFetch<{ email: string }>("/api/admin/identity", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setSavedEmail(payload.email);
      setEmail(payload.email);
    } catch (err) {
      setIdentityError(err instanceof Error ? err.message : "Could not save email.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/identity", { method: "DELETE" });
    await fetch("/api/admin/session", { method: "DELETE" });
    setSavedEmail("");
    setEmail("");
    router.push("/admin");
    router.refresh();
  };

  const toggleSidebar = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setDesktopCollapsed((open) => !open);
    } else {
      setMobileOpen((open) => !open);
    }
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[#f4f6f8]">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
            aria-label={desktopCollapsed ? "Expand navigation" : "Collapse navigation"}
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image src={ciuLogoSrc} alt="CIU" width={32} height={32} className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-tight text-brand">CIU Admin</span>
          </Link>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand"
        >
          <Globe className="h-4 w-4" strokeWidth={1.75} />
          <span className="hidden sm:inline">Public website</span>
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
        </Link>
      </header>

      <div className="flex min-h-0 flex-1">
        {mobileOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 top-14 z-30 bg-slate-900/20 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}

        <aside
          className={`fixed top-14 bottom-0 left-0 z-40 flex w-[260px] flex-col overflow-hidden border-r border-slate-200 bg-white transition-[width,transform] duration-200 lg:sticky lg:top-14 lg:z-0 lg:flex lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } ${desktopCollapsed ? "lg:w-[72px]" : "lg:w-[260px]"}`}
        >
          <nav className={`flex-1 overflow-y-auto py-4 ${desktopCollapsed ? "lg:px-2" : "px-3"}`}>
            {navGroups.map((group, index) => (
              <div
                key={group.label}
                className={`mb-5 last:mb-0 ${
                  desktopCollapsed
                    ? `lg:mb-0 lg:py-3 ${index > 0 ? "lg:border-t lg:border-slate-200" : ""}`
                    : ""
                }`}
              >
                <p
                  className={`px-3 pb-2 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase ${
                    desktopCollapsed ? "lg:hidden" : ""
                  }`}
                >
                  {group.label}
                </p>
                <div className={`space-y-1 ${desktopCollapsed ? "lg:flex lg:flex-col lg:items-center lg:space-y-1" : ""}`}>
                  {group.items.map((item) => {
                    const active = isActivePath(pathname, item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={item.label}
                        aria-label={item.label}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium transition ${
                          desktopCollapsed ? "lg:h-10 lg:w-10 lg:justify-center lg:gap-0 lg:px-0 lg:py-0" : ""
                        } ${
                          active
                            ? "bg-brand text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
                        <span className={desktopCollapsed ? "lg:hidden" : ""}>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className={`border-t border-slate-200 ${desktopCollapsed ? "lg:flex lg:flex-col lg:items-center lg:p-2 lg:py-3" : "p-3"}`}>
            <p
              className={`px-1 pb-2 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase ${
                desktopCollapsed ? "lg:hidden" : ""
              }`}
            >
              Account
            </p>
            <form onSubmit={saveIdentity} className={`space-y-2 ${desktopCollapsed ? "lg:hidden" : ""}`}>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Staff email"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                {savedEmail ? "Update email" : "Save email"}
              </button>
              <p className="px-0.5 text-xs leading-relaxed text-slate-500">
                {savedEmail ? `Recording as ${savedEmail}` : "History is logged as unknown until you save an email."}
              </p>
              {identityError ? <p className="text-xs text-red-700">{identityError}</p> : null}
            </form>
            <button
              type="button"
              onClick={logout}
              title="Clear email"
              aria-label="Clear email"
              className={`mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 ${
                desktopCollapsed ? "lg:mt-0 lg:h-10 lg:w-10 lg:justify-center lg:gap-0 lg:px-0 lg:py-0" : ""
              }`}
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
              <span className={desktopCollapsed ? "lg:hidden" : ""}>Clear email</span>
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 p-4 sm:p-5 lg:p-6">
            <div className="min-h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-6 lg:p-8">
              {children}
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
