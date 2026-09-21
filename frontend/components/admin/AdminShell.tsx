"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AdminBrandMark from "@frontend/components/admin/AdminBrandMark";
import AdminFooter from "@frontend/components/admin/AdminFooter";
import AdminProfileMenu from "@frontend/components/admin/AdminProfileMenu";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";
import AdminThemeToggle from "@frontend/components/admin/AdminThemeToggle";
import { displayInitials } from "@shared/admin-me";
import { ADMIN_ROLE_LABELS } from "@shared/admin-roles";
import {
  isAccountPath,
  isActiveNavPath,
  isNavGroupActive,
  isNavGroupOpen,
  navGroupsFor,
  openNavGroup,
  persistNavGroupOpenState,
  readStoredNavGroupOpenState,
  toggleNavGroupOpen,
} from "@frontend/portal/admin-nav";
import { applyAdminTheme, readStoredAdminTheme } from "@frontend/portal/admin-theme";

const iconButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-background hover:text-foreground";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile } = useAdminSession();
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const didLoadNavGroups = useRef(false);
  const account = isAccountPath(pathname);
  const navGroups = navGroupsFor(pathname, profile.role);
  const activeGroupLabel = navGroups.find((group) => isNavGroupActive(pathname, group))?.label;

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.documentElement.classList.add("admin-type");
    applyAdminTheme(readStoredAdminTheme());
    return () => {
      document.documentElement.classList.remove("admin-type", "admin-dark");
    };
  }, []);

  useEffect(() => {
    setOpenGroups((current) => {
      const base = didLoadNavGroups.current ? current : readStoredNavGroupOpenState();
      didLoadNavGroups.current = true;
      if (!activeGroupLabel) return base;
      const next = openNavGroup(activeGroupLabel, base);
      if (next !== base) persistNavGroupOpenState(next);
      return next;
    });
  }, [activeGroupLabel]);

  const toggleSidebar = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setDesktopCollapsed((open) => !open);
    } else {
      setMobileOpen((open) => !open);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-surface/90 px-3 backdrop-blur-md sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className={iconButtonClass}
            aria-label={desktopCollapsed ? "Expand navigation" : "Collapse navigation"}
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <Link href="/admin" className="flex items-center gap-2.5">
            <AdminBrandMark size={32} />
            <span className="text-lg font-semibold tracking-tight text-brand">CIU Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <AdminThemeToggle />
          <AdminProfileMenu />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {mobileOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 top-14 z-30 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}

        <aside
          className={`fixed top-14 bottom-0 left-0 z-40 flex w-[260px] flex-col overflow-hidden border-r border-border bg-surface transition-[width,transform] duration-200 lg:sticky lg:top-14 lg:z-0 lg:flex lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } ${desktopCollapsed ? "lg:w-[72px]" : "lg:w-[260px]"}`}
        >
          <nav className={`flex-1 overflow-y-auto py-4 ${desktopCollapsed ? "lg:px-2" : "px-3"}`}>
            {navGroups.map((group, index) => (
              <div
                key={group.label}
                className={`mb-5 last:mb-0 ${
                  desktopCollapsed
                    ? `lg:mb-0 lg:py-3 ${index > 0 ? "lg:border-t lg:border-border" : ""}`
                    : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenGroups((current) => {
                      const next = toggleNavGroupOpen(group.label, current);
                      persistNavGroupOpenState(next);
                      return next;
                    });
                  }}
                  aria-expanded={isNavGroupOpen(group.label, openGroups)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[11px] font-semibold tracking-[0.14em] text-muted/80 uppercase transition hover:bg-background hover:text-foreground ${
                    desktopCollapsed ? "lg:hidden" : ""
                  }`}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                      isNavGroupOpen(group.label, openGroups) ? "" : "-rotate-90"
                    }`}
                    strokeWidth={2}
                  />
                </button>
                {isNavGroupOpen(group.label, openGroups) || desktopCollapsed ? (
                  <div className={`space-y-1 ${desktopCollapsed ? "lg:flex lg:flex-col lg:items-center lg:space-y-1" : ""}`}>
                    {group.items.map((item) => {
                      const active = isActiveNavPath(pathname, item);
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
                              : "text-muted hover:bg-background hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
                          <span className={desktopCollapsed ? "lg:hidden" : ""}>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className={`border-t border-border ${desktopCollapsed ? "lg:px-2 lg:py-3" : "px-3 py-3"}`}>
            <Link
              href={account ? "/admin" : "/admin/profile"}
              title={account ? "Back to portal" : "Your account"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-background ${
                desktopCollapsed ? "lg:h-10 lg:w-10 lg:justify-center lg:px-0" : ""
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                {displayInitials(profile.displayName)}
              </span>
              <span className={`min-w-0 ${desktopCollapsed ? "lg:hidden" : ""}`}>
                <span className="block truncate text-sm font-medium text-foreground">{profile.displayName}</span>
                <span className="block truncate text-xs text-muted">
                  {account ? "Back to portal" : ADMIN_ROLE_LABELS[profile.role]}
                </span>
              </span>
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 p-4 sm:p-5 lg:p-6">
            <div className="min-h-full rounded-2xl border border-border bg-surface p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
              {children}
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
