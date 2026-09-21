import { generateKeyPair, SignJWT } from "jose";
import { describe, expect, it } from "vitest";
import type { EntraVerifyConfig } from "@backend/auth/entra";
import {
  assertEntraAccessClaims,
  extractBearerToken,
  identityFromRequest,
  tokenHasScope,
  verifyEntraAccessToken,
} from "@backend/auth/entra-token";

const config: EntraVerifyConfig = {
  tenantId: "ea18b4bf-5a29-4855-bb3e-71dba5095a75",
  apiClientId: "eafee8b7-5c7d-403e-a893-6228ec4e48c5",
  portalClientId: "93d5cc19-6d13-47e8-92d1-3f109358b692",
  requiredScope: "access_as_user",
};

const baseClaims = {
  tid: config.tenantId,
  iss: `https://login.microsoftonline.com/${config.tenantId}/v2.0`,
  aud: config.apiClientId,
  scp: "access_as_user",
  azp: config.portalClientId,
  oid: "11111111-1111-1111-1111-111111111111",
  exp: Math.floor(Date.now() / 1000) + 3600,
};

describe("extractBearerToken", () => {
  it("rejects a missing header", () => {
    expect(extractBearerToken(null)).toBeNull();
  });

  it("rejects a malformed header", () => {
    expect(extractBearerToken("Token abc")).toBeNull();
    expect(extractBearerToken("Bearer")).toBeNull();
  });

  it("reads a bearer token", () => {
    expect(extractBearerToken("Bearer abc.def.ghi")).toBe("abc.def.ghi");
  });

  it("rejects a request with no token", async () => {
    await expect(identityFromRequest(new Request("http://localhost/api/me"))).rejects.toMatchObject({
      status: 401,
      message: "Authentication required.",
    });
  });
});

describe("assertEntraAccessClaims", () => {
  it("rejects the wrong tenant", () => {
    expect(() => assertEntraAccessClaims({ ...baseClaims, tid: "other-tenant" }, config)).toThrow(
      "Invalid access token."
    );
  });

  it("rejects the wrong issuer", () => {
    expect(() =>
      assertEntraAccessClaims({ ...baseClaims, iss: "https://login.microsoftonline.com/other/v2.0" }, config)
    ).toThrow("Invalid access token.");
  });

  it("rejects the wrong audience", () => {
    expect(() => assertEntraAccessClaims({ ...baseClaims, aud: "someone-else" }, config)).toThrow(
      "Invalid access token."
    );
  });

  it("rejects a token without access_as_user", () => {
    expect(tokenHasScope("User.Read", "access_as_user")).toBe(false);
    expect(() => assertEntraAccessClaims({ ...baseClaims, scp: "User.Read" }, config)).toThrow(
      "Invalid access token."
    );
  });

  it("rejects a token issued for another application", () => {
    expect(() => assertEntraAccessClaims({ ...baseClaims, azp: "other-client" }, config)).toThrow(
      "Invalid access token."
    );
  });

  it("accepts a valid delegated access token", () => {
    expect(assertEntraAccessClaims(baseClaims, config)).toEqual({
      oid: baseClaims.oid,
      email: undefined,
      name: undefined,
    });
  });
});

describe("verifyEntraAccessToken", () => {
  async function signedToken(claims: Record<string, unknown>, privateKey: CryptoKey) {
    return new SignJWT(claims)
      .setProtectedHeader({ alg: "RS256", kid: "test" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(privateKey);
  }

  it("rejects an invalid signature", async () => {
    const { privateKey } = await generateKeyPair("RS256");
    const other = await generateKeyPair("RS256");
    const token = await signedToken(
      {
        ...baseClaims,
        iss: baseClaims.iss,
        aud: baseClaims.aud,
      },
      privateKey
    );
    await expect(verifyEntraAccessToken(token, { config, key: other.publicKey })).rejects.toThrow(
      "Invalid access token."
    );
  });

  it("rejects an expired token", async () => {
    const { publicKey, privateKey } = await generateKeyPair("RS256");
    const token = await new SignJWT({
      ...baseClaims,
      exp: Math.floor(Date.now() / 1000) - 120,
    })
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt(Math.floor(Date.now() / 1000) - 3600)
      .setExpirationTime(Math.floor(Date.now() / 1000) - 120)
      .setIssuer(baseClaims.iss)
      .setAudience(baseClaims.aud)
      .sign(privateKey);

    await expect(verifyEntraAccessToken(token, { config, key: publicKey })).rejects.toThrow(
      "Invalid access token."
    );
  });

  it("rejects the wrong audience", async () => {
    const { publicKey, privateKey } = await generateKeyPair("RS256");
    const token = await new SignJWT({ ...baseClaims, aud: "wrong-api" })
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setIssuer(baseClaims.iss)
      .setAudience("wrong-api")
      .sign(privateKey);

    await expect(verifyEntraAccessToken(token, { config, key: publicKey })).rejects.toThrow(
      "Invalid access token."
    );
  });

  it("accepts a locally signed token with the expected claims", async () => {
    const { publicKey, privateKey } = await generateKeyPair("RS256");
    const token = await new SignJWT({
      ...baseClaims,
      preferred_username: "fuwad.oladega@ciucanada.ca",
    })
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setIssuer(baseClaims.iss)
      .setAudience(baseClaims.aud)
      .sign(privateKey);

    await expect(verifyEntraAccessToken(token, { config, key: publicKey })).resolves.toMatchObject({
      oid: baseClaims.oid,
      email: "fuwad.oladega@ciucanada.ca",
    });
  });
});
