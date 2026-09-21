import type { AdminRole, CreatableAdminRole } from "@shared/admin-roles";

export type AdminMe = {
  id: string;
  displayName: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  canManageAdmins: boolean;
  isOwner: boolean;
  canViewAdmins: boolean;
  canViewAllHistory: boolean;
  canCreateAdmins: boolean;
  creatableRoles: CreatableAdminRole[];
  canManageAdminRoles: boolean;
  canSendOutreach: boolean;
  canViewOutreachRecipients: boolean;
  canSelectStaffAudience: boolean;
  canDeleteSubscriptions: boolean;
  lastLoginAt?: string;
  createdAt: string;
};

export function displayInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = (parts.length >= 2 ? [parts[0], parts[parts.length - 1]] : parts)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return letters.slice(0, 2) || "A";
}
