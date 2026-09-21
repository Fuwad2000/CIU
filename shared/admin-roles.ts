export const ADMIN_ROLES = ["regularadmin", "intermediateadmin", "superadmin"] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];
export type CreatableAdminRole = Exclude<AdminRole, "superadmin">;

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  regularadmin: "Regular admin",
  intermediateadmin: "Intermediate admin",
  superadmin: "Super admin",
};

export const ADMIN_ROLE_SUMMARIES: Record<AdminRole, string> = {
  regularadmin: "You can keep the public site current and read incoming messages and class sign-ups.",
  intermediateadmin: "You can do regular admin work, add regular staff, and review all staff activity.",
  superadmin: "You have full staff access, including changing other people’s access.",
};

export const ADMIN_ACCESS_AREAS = {
  announcements: {
    title: "Announcements",
    description: "Keep the public ticker current.",
    href: "/admin/announcements",
  },
  events: {
    title: "Events",
    description: "Add and edit public events.",
    href: "/admin/events",
  },
  contacts: {
    title: "Contact messages",
    description: "Read incoming messages from the website.",
    href: "/admin/contacts",
  },
  members: {
    title: "Membership",
    description: "See people who joined the CIU mailing list.",
    href: "/admin/members",
  },
  volunteers: {
    title: "Volunteers",
    description: "See people who registered to serve at the centre.",
    href: "/admin/volunteers",
  },
  newsletter: {
    title: "Newsletter",
    description: "See people who asked for CIU event emails.",
    href: "/admin/newsletter",
  },
  registrations: {
    title: "Class registrations",
    description: "View Quran class and kids program sign-ups.",
    href: "/admin/registrations",
  },
  users: {
    title: "Staff list",
    description: "See staff accounts and add regular admins.",
    href: "/admin/users",
  },
  access: {
    title: "Staff access",
    description: "Change access levels and deactivate accounts.",
    href: "/admin/users",
  },
  staffHistory: {
    title: "Staff history",
    description: "Review every change made by staff.",
    href: "/admin/history",
  },
  outreach: {
    title: "Outreach",
    description: "Create and review CIU email campaigns.",
    href: "/admin/outreach",
  },
} as const;

export type AdminAccessAreaId = keyof typeof ADMIN_ACCESS_AREAS;

export const ADMIN_ROLE_ACCESS: Record<AdminRole, AdminAccessAreaId[]> = {
  regularadmin: ["announcements", "events", "contacts", "members", "volunteers", "newsletter", "registrations", "outreach"],
  intermediateadmin: [
    "announcements",
    "events",
    "contacts",
    "members",
    "volunteers",
    "newsletter",
    "registrations",
    "outreach",
    "users",
    "staffHistory",
  ],
  superadmin: [
    "announcements",
    "events",
    "contacts",
    "members",
    "volunteers",
    "newsletter",
    "registrations",
    "outreach",
    "users",
    "access",
    "staffHistory",
  ],
};

export function isAdminRole(value: string): value is AdminRole {
  return ADMIN_ROLES.includes(value as AdminRole);
}

export function isCreatableAdminRole(value: string): value is CreatableAdminRole {
  return value === "regularadmin" || value === "intermediateadmin";
}

export function flagsForRole(role: AdminRole) {
  if (role === "superadmin") {
    return { isOwner: true, canManageAdmins: true };
  }
  if (role === "intermediateadmin") {
    return { isOwner: false, canManageAdmins: true };
  }
  return { isOwner: false, canManageAdmins: false };
}

export function resolveAdminRole(user: {
  role: string;
  isOwner?: boolean;
  canManageAdmins?: boolean;
}): AdminRole | null {
  if (isAdminRole(user.role)) return user.role;
  if (user.isOwner) return "superadmin";
  if (user.canManageAdmins) return "intermediateadmin";
  if (user.role === "admin" || user.role === "staff") return "regularadmin";
  return null;
}

export function canViewAdmins(role: AdminRole | null) {
  return role === "intermediateadmin" || role === "superadmin";
}

export function canViewAllHistory(role: AdminRole | null) {
  return canViewAdmins(role);
}

export function canSendOutreach(role: AdminRole | null) {
  return role === "intermediateadmin" || role === "superadmin";
}

export function canViewOutreachRecipients(role: AdminRole | null) {
  return canSendOutreach(role);
}

export function canSelectStaffAudience(role: AdminRole | null) {
  return canSendOutreach(role);
}

export function canDeleteSubscriptions(role: AdminRole | null) {
  return role === "intermediateadmin" || role === "superadmin";
}

export function actorCapabilities(role: AdminRole | null) {
  return {
    role,
    canViewAdmins: canViewAdmins(role),
    canViewAllHistory: canViewAllHistory(role),
    canCreateAdmins: creatableRolesFor(role).length > 0,
    creatableRoles: creatableRolesFor(role),
    canManageAdminRoles: role === "superadmin",
    canSendOutreach: canSendOutreach(role),
    canViewOutreachRecipients: canViewOutreachRecipients(role),
    canSelectStaffAudience: canSelectStaffAudience(role),
    canDeleteSubscriptions: canDeleteSubscriptions(role),
  };
}

export function creatableRolesFor(role: AdminRole | null): CreatableAdminRole[] {
  if (role === "superadmin") return ["regularadmin", "intermediateadmin"];
  if (role === "intermediateadmin") return ["regularadmin"];
  return [];
}

export function canCreateAdminRole(actor: AdminRole | null, requested: string) {
  return isCreatableAdminRole(requested) && creatableRolesFor(actor).includes(requested);
}

export function requestedCreateRole(value: unknown): CreatableAdminRole | "superadmin" | "invalid" {
  const role = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!role || role === "regularadmin") return "regularadmin";
  if (role === "intermediateadmin") return "intermediateadmin";
  if (role === "superadmin") return "superadmin";
  return "invalid";
}

export function canChangeAdminRole(
  actor: AdminRole | null,
  target: AdminRole | null,
  next: string
) {
  return (
    actor === "superadmin" &&
    target !== "superadmin" &&
    isCreatableAdminRole(next) &&
    target !== next
  );
}

export function canDeactivateAdmin(actor: AdminRole | null, target: AdminRole | null) {
  return actor === "superadmin" && target !== "superadmin";
}

export function adminRoleLabel(role: string) {
  return isAdminRole(role) ? ADMIN_ROLE_LABELS[role] : role;
}
