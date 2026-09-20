import { describe, expect, it } from "vitest";
import { isSqlConnectivityError } from "@/lib/portal/sql-unavailable";

describe("sql connectivity errors", () => {
  it("treats Azure SQL timeouts as database outages, not auth failures", () => {
    const error = Object.assign(new Error("Failed to connect to ciu-sql-dev.database.windows.net:1433 in 15000ms"), {
      name: "ConnectionError",
      code: "ETIMEOUT",
      originalError: { code: "ETIMEOUT" },
    });
    expect(isSqlConnectivityError(error)).toBe(true);
  });

  it("does not treat a missing Entra token as a SQL outage", () => {
    expect(isSqlConnectivityError(new Error("Authentication required."))).toBe(false);
  });
});
