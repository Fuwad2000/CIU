import {
  ArrowLeft,
  Bell,
  BookOpen,
  CalendarDays,
  Contact,
  HeartHandshake,
  History,
  LayoutDashboard,
  Mail,
  Newspaper,
  Palette,
  PenSquare,
  UserCog,
  UserPlus,
  UserRound,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  canSendOutreach,
  canViewAdmins,
  canViewAllHistory,
  type AdminRole,
} from "@shared/admin-roles";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export function isAccountPath(pathname: string) {
  return pathname === "/admin/profile" || pathname.startsWith("/admin/profile/");
}

export function isActiveNavPath(pathname: string, item: AdminNavItem) {
  if (item.href === "/admin/outreach" && /^\/admin\/outreach\/[0-9a-f-]{36}$/i.test(pathname)) {
    return true;
  }
  if (item.exact || item.href === "/admin") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function isNavGroupActive(pathname: string, group: AdminNavGroup) {
  return group.items.some((item) => isActiveNavPath(pathname, item));
}

export const ADMIN_NAV_GROUPS_KEY = "ciu-admin-nav-groups";

export function parseNavGroupOpenState(raw: string | null): Record<string, boolean> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const next: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === "boolean") next[key] = value;
    }
    return next;
  } catch {
    return {};
  }
}

export function isNavGroupOpen(label: string, stored: Record<string, boolean>) {
  return stored[label] !== false;
}

export function toggleNavGroupOpen(label: string, stored: Record<string, boolean>) {
  return { ...stored, [label]: !isNavGroupOpen(label, stored) };
}

export function openNavGroup(label: string, stored: Record<string, boolean>) {
  if (stored[label] !== false) return stored;
  return { ...stored, [label]: true };
}

export function readStoredNavGroupOpenState() {
  try {
    return parseNavGroupOpenState(localStorage.getItem(ADMIN_NAV_GROUPS_KEY));
  } catch {
    return {};
  }
}

export function persistNavGroupOpenState(state: Record<string, boolean>) {
  try {
    localStorage.setItem(ADMIN_NAV_GROUPS_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota or private-mode write failures.
  }
}

export function portalNavFor(role: AdminRole): AdminNavGroup[] {
  const groups: AdminNavGroup[] = [
    {
      label: "Main",
      items: [
        { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
        { href: "/admin/announcements", label: "Announcements", icon: Bell },
        { href: "/admin/events", label: "Events", icon: CalendarDays },
      ],
    },
    {
      label: "Inbox",
      items: [
        { href: "/admin/contacts", label: "Contact messages", icon: Mail },
      ],
    },
    {
      label: "Subscriptions",
      items: [
        { href: "/admin/members", label: "Membership", icon: UserPlus },
        { href: "/admin/volunteers", label: "Volunteers", icon: HeartHandshake },
        { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper },
        { href: "/admin/outreach/additional", label: "Contact list", icon: Contact },
      ],
    },
    {
      label: "Registration",
      items: [
        { href: "/admin/registrations/quran", label: "Quran class", icon: BookOpen },
        { href: "/admin/registrations/kids", label: "Kids program", icon: Users },
      ],
    },
    {
      label: "Outreach",
      items: [
        { href: "/admin/outreach", label: "History", icon: History, exact: true },
        ...(canSendOutreach(role)
          ? [{ href: "/admin/outreach/new", label: "Create campaign", icon: PenSquare }]
          : []),
        { href: "/admin/outreach/audiences", label: "Audiences", icon: Contact },
      ],
    },
  ];

  const staff: AdminNavItem[] = [];
  if (canViewAdmins(role)) {
    staff.push({ href: "/admin/users", label: "Users", icon: UserCog });
  }
  if (canViewAllHistory(role)) {
    staff.push({ href: "/admin/history", label: "History", icon: History });
  }
  if (staff.length > 0) {
    groups.push({ label: "Staff", items: staff });
  }

  return groups;
}

export function accountNav(): AdminNavGroup[] {
  return [
    {
      label: "Your account",
      items: [
        { href: "/admin/profile", label: "Profile", icon: UserRound, exact: true },
        { href: "/admin/profile/appearance", label: "Appearance", icon: Palette },
      ],
    },
    {
      label: "History",
      items: [{ href: "/admin/profile/history", label: "History", icon: History }],
    },
    {
      label: "Staff portal",
      items: [{ href: "/admin", label: "Back to portal", icon: ArrowLeft, exact: true }],
    },
  ];
}

export function navGroupsFor(pathname: string, role: AdminRole) {
  return isAccountPath(pathname) ? accountNav() : portalNavFor(role);
}
