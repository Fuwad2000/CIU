import { describe, expect, it } from "vitest";
import {
  ADMIN_IDLE_TIMEOUT_MS,
  ADMIN_IDLE_WARNING_MS,
  adminSessionPhase,
  adminSessionWarningRemainingMs,
  formatSessionCountdown,
} from "@frontend/portal/admin-session-timeout";

const lastActivityAt = 1_000_000;

describe("admin session timeout", () => {
  it("stays active until the idle window ends", () => {
    expect(
      adminSessionPhase({
        now: lastActivityAt + ADMIN_IDLE_TIMEOUT_MS - 1,
        lastActivityAt,
      })
    ).toBe("active");
  });

  it("warns during the countdown window", () => {
    expect(
      adminSessionPhase({
        now: lastActivityAt + ADMIN_IDLE_TIMEOUT_MS,
        lastActivityAt,
      })
    ).toBe("warning");
    expect(
      adminSessionPhase({
        now: lastActivityAt + ADMIN_IDLE_TIMEOUT_MS + ADMIN_IDLE_WARNING_MS - 1,
        lastActivityAt,
      })
    ).toBe("warning");
    expect(
      adminSessionWarningRemainingMs({
        now: lastActivityAt + ADMIN_IDLE_TIMEOUT_MS + 15_000,
        lastActivityAt,
      })
    ).toBe(105_000);
  });

  it("expires after the countdown and formats the clock", () => {
    expect(
      adminSessionPhase({
        now: lastActivityAt + ADMIN_IDLE_TIMEOUT_MS + ADMIN_IDLE_WARNING_MS,
        lastActivityAt,
      })
    ).toBe("expired");
    expect(formatSessionCountdown(120_000)).toBe("2:00");
    expect(formatSessionCountdown(60_000)).toBe("1:00");
    expect(formatSessionCountdown(5_000)).toBe("0:05");
    expect(formatSessionCountdown(0)).toBe("0:00");
  });
});

describe("sign-in progress", () => {
  it("keeps the percentage on a 0-100 scale", async () => {
    const { clampAuthProgress } = await import("@frontend/portal/admin-session-timeout");
    expect(clampAuthProgress(-10)).toBe(0);
    expect(clampAuthProgress(47.6)).toBe(48);
    expect(clampAuthProgress(140)).toBe(100);
  });
});
