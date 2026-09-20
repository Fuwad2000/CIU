import { describe, expect, it } from "vitest";
import { authorizeStoredAdmin, denyCreateAdmin, denyUpdateAdmin } from "@/lib/portal/admin-policy";
import {
  canCreateAdminRole,
  canSendOutreach,
  canViewAdmins,
  canViewAllHistory,
  creatableRolesFor,
} from "@/lib/portal/admin-roles";
import type { StaffUserRecord } from "@/lib/portal/sql-store";

function user(overrides: Partial<StaffUserRecord> = {}): StaffUserRecord {
  return {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    email: "staff@ciucanada.ca",
    displayName: "Staff",
    role: "regularadmin",
    isActive: true,
    isOwner: false,
    canManageAdmins: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("database authorization", () => {
  it("rejects a valid Microsoft identity with no dbo.users row", () => {
    expect(authorizeStoredAdmin(null)).toEqual({
      error: "You do not have access to the CIU admin portal.",
    });
  });

  it("rejects an inactive administrator", () => {
    expect(authorizeStoredAdmin(user({ isActive: false }))).toEqual({
      error: "You do not have access to the CIU admin portal.",
    });
  });

  it("allows an active regularadmin into the portal without admin-management privilege", () => {
    const result = authorizeStoredAdmin(user({ role: "regularadmin" }));
    expect("actor" in result).toBe(true);
    if ("actor" in result) {
      expect(result.actor.adminRole).toBe("regularadmin");
    }
    expect(canViewAdmins("regularadmin")).toBe(false);
    expect(canViewAllHistory("regularadmin")).toBe(false);
    expect(creatableRolesFor("regularadmin")).toEqual([]);
    expect(canSendOutreach("regularadmin")).toBe(false);
  });
});

describe("admin creation policy", () => {
  it("lets an intermediateadmin create a regularadmin only", () => {
    expect(denyCreateAdmin("intermediateadmin", { role: "regularadmin" })).toBeNull();
    expect(canCreateAdminRole("intermediateadmin", "regularadmin")).toBe(true);
  });

  it("does not let an intermediateadmin create an intermediateadmin", () => {
    expect(denyCreateAdmin("intermediateadmin", { role: "intermediateadmin" })).toBe(
      "You do not have permission to create that admin level."
    );
  });

  it("does not let an intermediateadmin create a superadmin", () => {
    expect(denyCreateAdmin("intermediateadmin", { role: "superadmin" })).toBe(
      "The application cannot create a super admin."
    );
  });

  it("does not let a superadmin create a superadmin", () => {
    expect(denyCreateAdmin("superadmin", { role: "superadmin" })).toBe(
      "The application cannot create a super admin."
    );
  });

  it("does not let a superadmin set isOwner through the API", () => {
    expect(denyCreateAdmin("superadmin", { role: "regularadmin", isOwner: true })).toBe(
      "The application cannot assign owner privileges."
    );
  });

  it("does not let a browser-supplied role override the database actor role", () => {
    const actorRole = "regularadmin";
    const body = { role: "superadmin" };
    expect(denyCreateAdmin(actorRole, body)).toBe("The application cannot create a super admin.");
    expect(canCreateAdminRole(actorRole, "regularadmin")).toBe(false);
  });
});

describe("admin update policy", () => {
  it("does not let a superadmin change their own admin level", () => {
    const actor = { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", adminRole: "superadmin" as const };
    const target = user({ id: actor.id, role: "superadmin", isOwner: true, canManageAdmins: true });
    expect(denyUpdateAdmin(actor, target, { role: "regularadmin" })).toBe(
      "You cannot change your own admin privileges."
    );
  });
});
