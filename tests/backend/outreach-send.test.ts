import { beforeEach, describe, expect, it, vi } from "vitest";
import type { OutreachCampaign, OutreachRecipient } from "@shared/outreach";

const isSqlConfigured = vi.fn();
const isEmailConfigured = vi.fn();
const getOutreachCampaign = vi.fn();
const replaceOutreachRecipients = vi.fn();
const setOutreachCampaignStatus = vi.fn();
const updateOutreachRecipientDelivery = vi.fn();
const resolveAudiences = vi.fn();
const sendOutreachRecipientMail = vi.fn();

vi.mock("@backend/env", () => ({
  isSqlConfigured,
  isEmailConfigured,
}));

vi.mock("@backend/outreach/store", () => ({
  getOutreachCampaign,
  replaceOutreachRecipients,
  setOutreachCampaignStatus,
  updateOutreachRecipientDelivery,
}));

vi.mock("@backend/outreach/audience", () => ({
  resolveAudiences,
}));

vi.mock("@email/outreach-mail", () => ({
  sendOutreachRecipientMail,
}));

function campaign(overrides: Partial<OutreachCampaign> = {}): OutreachCampaign {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    type: "marketing",
    subject: "Class offer",
    content: "Join Quran class this fall.",
    status: "draft",
    audiences: ["quran", "kids"],
    createdBy: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    createdByName: "Fuwad",
    createdByEmail: "fuwad.oladega@ciucanada.ca",
    createdAt: "2026-09-20T00:00:00.000Z",
    updatedAt: "2026-09-20T00:00:00.000Z",
    delivery: { total: 0, pending: 0, sent: 0, failed: 0, skipped: 0 },
    ...overrides,
  };
}

function recipient(overrides: Partial<OutreachRecipient> = {}): OutreachRecipient {
  return {
    id: "22222222-2222-4222-8222-222222222222",
    campaignId: campaign().id,
    email: "parent@example.com",
    displayName: "Parent One",
    audience: "quran",
    deliveryStatus: "pending",
    ...overrides,
  };
}

describe("handleOutreachSend", () => {
  beforeEach(() => {
    isSqlConfigured.mockReset().mockReturnValue(true);
    isEmailConfigured.mockReset().mockReturnValue(true);
    getOutreachCampaign.mockReset().mockResolvedValue(campaign());
    replaceOutreachRecipients.mockReset();
    setOutreachCampaignStatus.mockReset().mockImplementation(async (_id, status) =>
      campaign({
        status,
        delivery: { total: 2, pending: 0, sent: status === "sent" ? 2 : 0, failed: 0, skipped: 0 },
      })
    );
    updateOutreachRecipientDelivery.mockReset().mockResolvedValue(undefined);
    resolveAudiences.mockReset().mockResolvedValue({
      recipients: [
        { email: "parent@example.com", displayName: "Parent One", audience: "quran" },
        { email: "family@example.com", displayName: "Family Two", audience: "kids" },
      ],
      preview: { audiences: ["quran", "kids"], uniqueCount: 2, countsByAudience: { quran: 1, kids: 1 } },
    });
    sendOutreachRecipientMail.mockReset().mockResolvedValue({ status: "sent" });
    replaceOutreachRecipients.mockResolvedValue([
      recipient(),
      recipient({
        id: "33333333-3333-4333-8333-333333333333",
        email: "family@example.com",
        displayName: "Family Two",
        audience: "kids",
      }),
    ]);
  });

  it("does not let a regular admin send", async () => {
    const { handleOutreachSend } = await import("@backend/outreach/send-campaign");
    const result = await handleOutreachSend({
      campaignId: campaign().id,
      actorId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      actorRole: "regularadmin",
    });
    expect(result).toMatchObject({ ok: false, status: 403 });
    expect(sendOutreachRecipientMail).not.toHaveBeenCalled();
  });

  it("stops when ACS is not configured", async () => {
    isEmailConfigured.mockReturnValue(false);
    const { handleOutreachSend } = await import("@backend/outreach/send-campaign");
    const result = await handleOutreachSend({
      campaignId: campaign().id,
      actorId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      actorRole: "intermediateadmin",
    });
    expect(result).toMatchObject({ ok: false, status: 503 });
    expect(sendOutreachRecipientMail).not.toHaveBeenCalled();
  });

  it("sends one message per unique recipient across the selected groups", async () => {
    const { handleOutreachSend } = await import("@backend/outreach/send-campaign");
    const result = await handleOutreachSend({
      campaignId: campaign().id,
      actorId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      actorRole: "superadmin",
    });

    expect(result.ok).toBe(true);
    expect(sendOutreachRecipientMail).toHaveBeenCalledTimes(2);
    expect(sendOutreachRecipientMail.mock.calls[0]?.[2]).toBeUndefined();
    expect(sendOutreachRecipientMail.mock.calls.map((call) => call[1].email).sort()).toEqual([
      "family@example.com",
      "parent@example.com",
    ]);
    expect(updateOutreachRecipientDelivery).toHaveBeenCalledTimes(2);
    expect(setOutreachCampaignStatus).toHaveBeenCalledWith(campaign().id, "sending");
    expect(setOutreachCampaignStatus).toHaveBeenCalledWith(
      campaign().id,
      "sent",
      expect.objectContaining({ sentBy: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", sentAt: true })
    );
  });

  it("passes an optional poster through to each email for this send only", async () => {
    const { handleOutreachSend } = await import("@backend/outreach/send-campaign");
    const poster = {
      name: "picnic.jpg",
      contentType: "image/jpeg" as const,
      contentInBase64: "aGVsbG8gdGhlcmUgdGhpcyBpcyBsb25nIGVub3VnaA==",
    };
    await handleOutreachSend({
      campaignId: campaign().id,
      actorId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      actorRole: "superadmin",
      poster,
    });
    expect(sendOutreachRecipientMail.mock.calls[0]?.[2]).toEqual(poster);
  });

  it("records a failed recipient without stopping the rest of the campaign", async () => {
    sendOutreachRecipientMail
      .mockResolvedValueOnce({ status: "sent" })
      .mockRejectedValueOnce(new Error("The email could not be sent."));
    const { handleOutreachSend } = await import("@backend/outreach/send-campaign");
    const result = await handleOutreachSend({
      campaignId: campaign().id,
      actorId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      actorRole: "intermediateadmin",
    });

    expect(result.ok).toBe(true);
    expect(updateOutreachRecipientDelivery).toHaveBeenCalledWith(
      "33333333-3333-4333-8333-333333333333",
      expect.objectContaining({ deliveryStatus: "failed" })
    );
  });
});
