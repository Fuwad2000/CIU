import { describe, expect, it } from "vitest";
import { History } from "lucide-react";
import { accountNav, isAccountPath, isActiveNavPath, portalNavFor } from "@/lib/portal/admin-nav";

function hrefs(role: "regularadmin" | "intermediateadmin" | "superadmin") {
  return portalNavFor(role).flatMap((group) => group.items.map((item) => item.href));
}

describe("portal navigation", () => {
  it("keeps regular admins on content and inbox, not staff tools", () => {
    expect(hrefs("regularadmin")).toEqual([
      "/admin",
      "/admin/announcements",
      "/admin/events",
      "/admin/contacts",
      "/admin/members",
      "/admin/volunteers",
      "/admin/newsletter",
      "/admin/registrations/quran",
      "/admin/registrations/kids",
      "/admin/outreach",
      "/admin/outreach/new",
      "/admin/outreach/audiences",
    ]);
  });

  it("puts Outreach in the portal for every admin level", () => {
    expect(hrefs("regularadmin")).toContain("/admin/outreach");
    expect(hrefs("intermediateadmin")).toContain("/admin/outreach");
    expect(hrefs("superadmin")).toContain("/admin/outreach");
  });

  it("lets intermediate and super admins open users and all-staff history", () => {
    expect(hrefs("intermediateadmin")).toContain("/admin/users");
    expect(hrefs("intermediateadmin")).toContain("/admin/history");
    expect(hrefs("superadmin")).toContain("/admin/users");
    expect(hrefs("superadmin")).toContain("/admin/history");
    expect(hrefs("superadmin")).toContain("/admin/email-test");
    expect(hrefs("regularadmin")).not.toContain("/admin/email-test");
    expect(hrefs("intermediateadmin")).not.toContain("/admin/email-test");
  });
});

describe("account navigation", () => {
  it("treats profile pages as the personal account, not the portal", () => {
    expect(isAccountPath("/admin/profile")).toBe(true);
    expect(isAccountPath("/admin/profile/history")).toBe(true);
    expect(isAccountPath("/admin")).toBe(false);
    expect(isAccountPath("/admin/users")).toBe(false);
  });

  it("puts personal history in its own History menu", () => {
    const groups = accountNav();
    expect(groups.map((group) => group.label)).toContain("History");
    expect(groups.find((group) => group.label === "History")?.items.map((item) => item.href)).toEqual([
      "/admin/profile/history",
    ]);
  });

  it("does not keep Profile selected on nested account pages", () => {
    expect(
      isActiveNavPath("/admin/profile/history", {
        href: "/admin/profile",
        label: "Profile",
        icon: History,
        exact: true,
      })
    ).toBe(false);
  });
});
