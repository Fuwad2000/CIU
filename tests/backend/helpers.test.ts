import { describe, expect, it } from "vitest";
import {
  actorCapabilities,
  adminRoleLabel,
  canChangeAdminRole,
  canDeactivateAdmin,
  flagsForRole,
  requestedCreateRole,
  resolveAdminRole,
} from "@shared/admin-roles";
import { parseOutreachAdditionalInput, parseOutreachCampaignInput } from "@backend/outreach/input";
import { isAzureConfigured, isEmailConfigured, isSqlConfigured, portalBackendName, sqlPort } from "@backend/env";
import { readString } from "@shared/read-string";

describe("readString", () => {
  it("trims strings and rejects non-strings", () => {
    expect(readString("  hello  ")).toBe("hello");
    expect(readString(12)).toBe("");
    expect(readString(undefined)).toBe("");
  });
});

describe("admin role helpers", () => {
  it("maps legacy flags onto the three current roles", () => {
    expect(resolveAdminRole({ role: "owner", isOwner: true })).toBe("superadmin");
    expect(resolveAdminRole({ role: "staff", canManageAdmins: true })).toBe("intermediateadmin");
    expect(resolveAdminRole({ role: "admin" })).toBe("regularadmin");
    expect(resolveAdminRole({ role: "visitor" })).toBeNull();
  });

  it("keeps superadmin-only privilege changes off the application path", () => {
    expect(canChangeAdminRole("superadmin", "regularadmin", "intermediateadmin")).toBe(true);
    expect(canChangeAdminRole("superadmin", "superadmin", "regularadmin")).toBe(false);
    expect(canDeactivateAdmin("superadmin", "regularadmin")).toBe(true);
    expect(canDeactivateAdmin("superadmin", "superadmin")).toBe(false);
    expect(requestedCreateRole(" SUPERADMIN ")).toBe("superadmin");
    expect(requestedCreateRole("owner")).toBe("invalid");
    expect(flagsForRole("regularadmin")).toEqual({ isOwner: false, canManageAdmins: false });
    expect(actorCapabilities("intermediateadmin").creatableRoles).toEqual(["regularadmin"]);
    expect(adminRoleLabel("regularadmin")).toBe("Regular admin");
  });
});

describe("outreach campaign input", () => {
  it("accepts a valid draft and rejects unknown audiences or types", () => {
    expect(
      parseOutreachCampaignInput({
        type: "marketing",
        subject: "Class offer",
        content: "Come join",
        audiences: ["additional", "quran"],
      })
    ).toEqual({
      type: "marketing",
      subject: "Class offer",
      content: "Come join",
      audiences: ["additional", "quran"],
      eventId: undefined,
    });
    expect(parseOutreachCampaignInput({ type: "party", subject: "Hi", content: "x", audiences: ["members"] })).toBe(
      "Choose a campaign type."
    );
    expect(parseOutreachCampaignInput({ type: "newsletter", subject: "Hi", audiences: ["everyone"] })).toBe(
      "Choose only supported audiences."
    );
    expect(parseOutreachCampaignInput({ type: "newsletter", subject: "", content: "x", audiences: ["members"] })).toBe(
      "Subject is required."
    );
  });

  it("accepts a staff-added additional person and rejects a missing email", () => {
    expect(
      parseOutreachAdditionalInput({
        fullName: "  Guest Speaker  ",
        email: " Speaker@Example.com ",
        phone: " 905-555-0123 ",
        notes: "Invited for Ramadan",
      })
    ).toEqual({
      fullName: "Guest Speaker",
      email: "speaker@example.com",
      phone: "905-555-0123",
      notes: "Invited for Ramadan",
    });
    expect(parseOutreachAdditionalInput({ fullName: "Guest", email: "not-an-email" })).toBe("A valid email is required.");
    expect(parseOutreachAdditionalInput({ fullName: "", email: "a@b.com" })).toBe("Name is required.");
  });
});

describe("environment helpers", () => {
  it("reports the current backend name from env", () => {
    expect(typeof isSqlConfigured()).toBe("boolean");
    expect(typeof isAzureConfigured()).toBe("boolean");
    expect(typeof isEmailConfigured()).toBe("boolean");
    expect(["sql", "azure-api", "memory"]).toContain(portalBackendName());
    expect(sqlPort()).toBeGreaterThan(0);
  });
});
