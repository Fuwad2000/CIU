import { afterEach, describe, expect, it } from "vitest";

const keys = [
  "ENTRA_TENANT_ID",
  "ENTRA_PORTAL_CLIENT_ID",
  "ENTRA_API_CLIENT_ID",
  "ENTRA_API_SCOPE",
  "NEXT_PUBLIC_ENTRA_TENANT_ID",
  "NEXT_PUBLIC_ENTRA_PORTAL_CLIENT_ID",
  "NEXT_PUBLIC_ENTRA_API_SCOPE",
] as const;

const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));

afterEach(() => {
  for (const key of keys) {
    if (previous[key] === undefined) delete process.env[key];
    else process.env[key] = previous[key];
  }
});

describe("public Entra config", () => {
  it("returns tenant, portal client, and scope from ENTRA_* only", async () => {
    process.env.ENTRA_TENANT_ID = "tenant-1";
    process.env.ENTRA_PORTAL_CLIENT_ID = "portal-1";
    process.env.ENTRA_API_CLIENT_ID = "api-1";
    process.env.ENTRA_API_SCOPE = "api://api-1/access_as_user";
    delete process.env.NEXT_PUBLIC_ENTRA_TENANT_ID;
    delete process.env.NEXT_PUBLIC_ENTRA_PORTAL_CLIENT_ID;
    delete process.env.NEXT_PUBLIC_ENTRA_API_SCOPE;

    const { GET } = await import("@backend/http/admin/entra-public");
    const response = await GET();
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toEqual({
      tenantId: "tenant-1",
      clientId: "portal-1",
      apiScope: "api://api-1/access_as_user",
    });
    expect(body).not.toHaveProperty("apiClientId");
  });
});
