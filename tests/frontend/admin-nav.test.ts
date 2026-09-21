import { describe, expect, it } from "vitest";
import { History } from "lucide-react";
import {
  accountNav,
  isAccountPath,
  isActiveNavPath,
  isNavGroupActive,
  isNavGroupOpen,
  openNavGroup,
  parseNavGroupOpenState,
  portalNavFor,
  toggleNavGroupOpen,
} from "@frontend/portal/admin-nav";

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
      "/admin/outreach/additional",
      "/admin/registrations/quran",
      "/admin/registrations/kids",
      "/admin/outreach",
      "/admin/outreach/audiences",
    ]);
  });

  it("puts membership lists in Subscriptions and class sign-ups in Registration", () => {
    const groups = portalNavFor("regularadmin");
    const inbox = groups.find((group) => group.label === "Inbox");
    const subscriptions = groups.find((group) => group.label === "Subscriptions");
    const registration = groups.find((group) => group.label === "Registration");
    expect(inbox?.items.map((item) => item.href)).toEqual(["/admin/contacts"]);
    expect(subscriptions?.items.map((item) => item.href)).toEqual([
      "/admin/members",
      "/admin/volunteers",
      "/admin/newsletter",
      "/admin/outreach/additional",
    ]);
    expect(subscriptions?.items.map((item) => item.label)).toContain("Contact list");
    expect(groups.find((group) => group.label === "Outreach")?.items.map((item) => item.label)).not.toContain(
      "Contact list"
    );
    expect(registration?.items.map((item) => item.href)).toEqual([
      "/admin/registrations/quran",
      "/admin/registrations/kids",
    ]);
  });

  it("puts Outreach in the portal for every admin level", () => {
    expect(hrefs("regularadmin")).toContain("/admin/outreach");
    expect(hrefs("regularadmin")).not.toContain("/admin/outreach/new");
    expect(hrefs("intermediateadmin")).toContain("/admin/outreach");
    expect(hrefs("intermediateadmin")).toContain("/admin/outreach/new");
    expect(hrefs("superadmin")).toContain("/admin/outreach");
    expect(hrefs("superadmin")).toContain("/admin/outreach/new");
    expect(portalNavFor("regularadmin").find((group) => group.label === "Outreach")?.items[0]?.label).toBe("History");
  });

  it("lets intermediate and super admins open users and all-staff history", () => {
    expect(hrefs("intermediateadmin")).toContain("/admin/users");
    expect(hrefs("intermediateadmin")).toContain("/admin/history");
    expect(hrefs("superadmin")).toContain("/admin/users");
    expect(hrefs("superadmin")).toContain("/admin/history");
    expect(hrefs("superadmin")).not.toContain("/admin/email-test");
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

describe("collapsible nav groups", () => {
  it("marks a section active when one of its pages is open", () => {
    const groups = portalNavFor("regularadmin");
    const inbox = groups.find((group) => group.label === "Inbox")!;
    const subscriptions = groups.find((group) => group.label === "Subscriptions")!;
    expect(isNavGroupActive("/admin/contacts", inbox)).toBe(true);
    expect(isNavGroupActive("/admin/members", inbox)).toBe(false);
    expect(isNavGroupActive("/admin/members", subscriptions)).toBe(true);
  });

  it("keeps sections open unless they were explicitly closed", () => {
    expect(isNavGroupOpen("Main", {})).toBe(true);
    expect(isNavGroupOpen("Inbox", { Inbox: false })).toBe(false);
    expect(toggleNavGroupOpen("Inbox", {})).toEqual({ Inbox: false });
    expect(openNavGroup("Inbox", { Inbox: false })).toEqual({ Inbox: true });
    expect(parseNavGroupOpenState(`{"Main":true,"Inbox":false}`)).toEqual({ Main: true, Inbox: false });
    expect(parseNavGroupOpenState("not-json")).toEqual({});
  });
});
