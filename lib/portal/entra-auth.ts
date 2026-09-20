import { actorCapabilities } from "@/lib/portal/admin-roles";
import type { AdminMe } from "@/lib/portal/admin-me";
import { authorizeStoredAdmin } from "@/lib/portal/admin-policy";
import { isSqlConfigured } from "@/lib/portal/env";
import { EntraAuthError, identityFromRequest } from "@/lib/portal/entra-token";
import { jsonError } from "@/lib/portal/http";
import { isSqlConnectivityError, sqlUnavailableMessage } from "@/lib/portal/sql-unavailable";
import {
  ensurePrimaryOwner,
  findAdminByEntraIdentity,
  touchStaffUserLogin,
  type StaffUserRecord,
} from "@/lib/portal/sql-store";
import type { AdminRole } from "@/lib/portal/admin-roles";

export type AdminActor = StaffUserRecord & { adminRole: AdminRole };

type AuthResult = { actor: AdminActor; error?: undefined } | { actor?: undefined; error: Response };

const authCache = new WeakMap<Request, Promise<AuthResult>>();

export type { AdminMe } from "@/lib/portal/admin-me";

export function toAdminMe(actor: AdminActor): AdminMe {
  const capabilities = actorCapabilities(actor.adminRole);
  return {
    id: actor.id,
    displayName: actor.displayName,
    email: actor.email,
    role: actor.adminRole,
    isActive: actor.isActive,
    canManageAdmins: actor.canManageAdmins,
    isOwner: actor.isOwner,
    canViewAdmins: capabilities.canViewAdmins,
    canViewAllHistory: capabilities.canViewAllHistory,
    canCreateAdmins: capabilities.canCreateAdmins,
    creatableRoles: capabilities.creatableRoles,
    canManageAdminRoles: capabilities.canManageAdminRoles,
    canSendOutreach: capabilities.canSendOutreach,
    canViewOutreachRecipients: capabilities.canViewOutreachRecipients,
    canSelectStaffAudience: capabilities.canSelectStaffAudience,
    lastLoginAt: actor.lastLoginAt,
    createdAt: actor.createdAt,
  };
}

async function authenticateAdminRequestUncached(request: Request): Promise<AuthResult> {
  try {
    const identity = await identityFromRequest(request);
    if (!isSqlConfigured()) {
      return { error: jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503) };
    }

    await ensurePrimaryOwner();
    const user = await findAdminByEntraIdentity(identity.oid, identity.email);
    const authorized = authorizeStoredAdmin(user);
    if ("actor" in authorized) {
      void touchStaffUserLogin(authorized.actor.id).catch(() => undefined);
      return { actor: authorized.actor };
    }
    return { error: jsonError(authorized.error, 403) };
  } catch (error) {
    if (error instanceof EntraAuthError) {
      return { error: jsonError(error.message, error.status) };
    }
    if (isSqlConnectivityError(error)) {
      return { error: jsonError(sqlUnavailableMessage(), 503) };
    }
    return { error: jsonError("Authentication required.", 401) };
  }
}

export function authenticateAdminRequest(request: Request) {
  const cached = authCache.get(request);
  if (cached) return cached;
  const pending = authenticateAdminRequestUncached(request);
  authCache.set(request, pending);
  return pending;
}

export function cachedAdminActor(request: Request) {
  return authCache.get(request);
}
