import { describe, expect, it } from "vitest";
import { isOutreachHistoryStatus, mergeAudienceRecipients, parseAudienceIds } from "@shared/outreach";
import { denyOutreachCreate, denyOutreachRecipients, denyOutreachSend, denyStaffAudience } from "@backend/outreach/policy";
import { canSendOutreach, canViewOutreachRecipients } from "@shared/admin-roles";

describe("outreach audience parsing", () => {
  it("accepts only predefined audience keys", () => {
    expect(parseAudienceIds(["members", "newsletter"])).toEqual(["members", "newsletter"]);
    expect(parseAudienceIds(["quran", "kids"])).toEqual(["quran", "kids"]);
    expect(parseAudienceIds(["contacts", "members"])).toBe("invalid");
    expect(parseAudienceIds(["additional", "newsletter"])).toEqual(["additional", "newsletter"]);
    expect(parseAudienceIds(["members", "dbo.users"])).toBe("invalid");
    expect(parseAudienceIds(["eventRegistrants"])).toBe("invalid");
  });

  it("treats sent, sending, and failed campaigns as history, not drafts", () => {
    expect(isOutreachHistoryStatus("draft")).toBe(false);
    expect(isOutreachHistoryStatus("sent")).toBe(true);
    expect(isOutreachHistoryStatus("sending")).toBe(true);
    expect(isOutreachHistoryStatus("failed")).toBe(true);
  });

  it("deduplicates by normalized email and keeps the first audience", () => {
    const merged = mergeAudienceRecipients([
      {
        audience: "members",
        recipients: [{ email: " Person@Example.com ", displayName: "Member" }],
      },
      {
        audience: "volunteers",
        recipients: [
          { email: "person@example.com", displayName: "Volunteer" },
          { email: "volunteer@example.com", displayName: "Also volunteer" },
        ],
      },
      {
        audience: "newsletter",
        recipients: [{ email: "PERSON@example.com", displayName: "Subscriber" }],
      },
    ]);
    expect(merged).toEqual([
      { email: "person@example.com", displayName: "Member", audience: "members" },
      { email: "volunteer@example.com", displayName: "Also volunteer", audience: "volunteers" },
    ]);
  });
});

describe("outreach authorization", () => {
  it("lets every admin level be distinguished from send permission", () => {
    expect(canSendOutreach("regularadmin")).toBe(false);
    expect(canSendOutreach("intermediateadmin")).toBe(true);
    expect(canSendOutreach("superadmin")).toBe(true);
    expect(canViewOutreachRecipients("regularadmin")).toBe(false);
    expect(canViewOutreachRecipients("intermediateadmin")).toBe(true);
  });

  it("denies send and recipient lists for regular admins", () => {
    expect(denyOutreachCreate("regularadmin")).toMatch(/do not have permission to create/i);
    expect(denyOutreachSend("regularadmin")).toMatch(/do not have permission to send/i);
    expect(denyOutreachRecipients("regularadmin")).toMatch(/recipient emails/i);
    expect(denyOutreachCreate("intermediateadmin")).toBeNull();
    expect(denyOutreachSend("intermediateadmin")).toBeNull();
    expect(denyOutreachSend("superadmin")).toBeNull();
  });

  it("does not let regular admins add the staff audience", () => {
    expect(denyStaffAudience("regularadmin", ["members", "admins"])).toMatch(/CIU staff/i);
    expect(denyStaffAudience("regularadmin", ["admins"], ["admins"])).toBeNull();
    expect(denyStaffAudience("intermediateadmin", ["admins"])).toBeNull();
  });
});
