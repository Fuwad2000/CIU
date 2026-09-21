import {
  canChangeAdminRole,
  canCreateAdminRole,
  canDeactivateAdmin,
  isCreatableAdminRole,
  requestedCreateRole,
  resolveAdminRole,
  type AdminRole,
} from "@shared/admin-roles";
import type { StaffUserRecord } from "@shared/records";

export type AuthorizedAdmin = StaffUserRecord & { adminRole: AdminRole };

export function authorizeStoredAdmin(
  user: StaffUserRecord | null
): { actor: AuthorizedAdmin } | { error: string } {
  if (!user || !user.isActive) {
    return { error: "You do not have access to the CIU admin portal." };
  }
  const adminRole = resolveAdminRole(user);
  if (!adminRole) {
    return { error: "You do not have access to the CIU admin portal." };
  }
  return { actor: { ...user, adminRole } };
}

export { requestedCreateRole } from "@shared/admin-roles";

export function denyCreateAdmin(actorRole: AdminRole, body: Record<string, unknown>) {
  if (body.isOwner === true) {
    return "The application cannot assign owner privileges.";
  }

  const requestedRole = requestedCreateRole(body.role);
  if (requestedRole === "superadmin") {
    return "The application cannot create a super admin.";
  }
  if (body.canManageAdmins === true && requestedRole !== "intermediateadmin") {
    return "Admin-management privileges cannot be granted directly.";
  }
  if (requestedRole === "invalid" || !canCreateAdminRole(actorRole, requestedRole)) {
    return "You do not have permission to create that admin level.";
  }
  return null;
}

export function denyUpdateAdmin(
  actor: { id: string; adminRole: AdminRole },
  target: StaffUserRecord,
  body: Record<string, unknown>
) {
  if (body.isOwner === true || body.role === "superadmin") {
    return "The application cannot assign super admin privileges.";
  }

  const wantsRole = Object.prototype.hasOwnProperty.call(body, "role");
  const wantsActive = Object.prototype.hasOwnProperty.call(body, "isActive");
  if (!wantsRole && !wantsActive) {
    return "No admin changes were requested.";
  }

  if (target.id === actor.id) {
    return "You cannot change your own admin privileges.";
  }

  const targetRole = resolveAdminRole(target);
  if (!targetRole || targetRole === "superadmin") {
    return "Super admin accounts cannot be modified through the API.";
  }

  if (wantsRole) {
    const requestedRole = requestedCreateRole(body.role);
    if (requestedRole === "superadmin") {
      return "The application cannot assign the super admin role.";
    }
    if (requestedRole === "invalid" || !canChangeAdminRole(actor.adminRole, targetRole, requestedRole)) {
      return "You do not have permission to change that admin level.";
    }
  }

  if (wantsActive) {
    if (typeof body.isActive !== "boolean") {
      return "isActive must be true or false.";
    }
    if (!canDeactivateAdmin(actor.adminRole, targetRole)) {
      return "You do not have permission to deactivate or restore that admin.";
    }
  }

  const nextRole = wantsRole ? requestedCreateRole(body.role) : targetRole;
  if (typeof nextRole !== "string" || !isCreatableAdminRole(nextRole)) {
    return "The application cannot assign the super admin role.";
  }

  return null;
}

