import { createRemoteJWKSet, jwtVerify, type JWTPayload, type JWTVerifyGetKey } from "jose";
import { entraVerifyConfig, type EntraVerifyConfig } from "@backend/auth/entra";

export class EntraAuthError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.name = "EntraAuthError";
    this.status = status;
  }
}

export type EntraIdentity = {
  oid: string;
  email?: string;
  name?: string;
};

const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

export function extractBearerToken(authorization: string | null | undefined) {
  if (!authorization) return null;
  const [scheme, token] = authorization.trim().split(/\s+/);
  if (!scheme || !token || scheme.toLowerCase() !== "bearer") return null;
  return token;
}

export function expectedIssuers(tenantId: string) {
  return [
    `https://login.microsoftonline.com/${tenantId}/v2.0`,
    `https://sts.windows.net/${tenantId}/`,
  ];
}

export function expectedAudiences(apiClientId: string) {
  return [apiClientId, `api://${apiClientId}`];
}

export function tokenHasScope(scp: unknown, required: string) {
  if (typeof scp !== "string" || !required) return false;
  return scp.split(/\s+/).includes(required);
}

export function tokenEmail(payload: JWTPayload) {
  const candidates = [payload.preferred_username, payload.upn, payload.email];
  for (const value of candidates) {
    if (typeof value === "string" && value.includes("@")) {
      return value.trim().toLowerCase();
    }
  }
  return undefined;
}

function audienceValues(aud: unknown) {
  if (typeof aud === "string") return [aud];
  if (Array.isArray(aud)) return aud.filter((value): value is string => typeof value === "string");
  return [];
}

export function assertEntraAccessClaims(payload: JWTPayload, config: EntraVerifyConfig): EntraIdentity {
  if (payload.tid !== config.tenantId) {
    throw new EntraAuthError("Invalid access token.");
  }

  const issuers = expectedIssuers(config.tenantId);
  if (typeof payload.iss !== "string" || !issuers.includes(payload.iss)) {
    throw new EntraAuthError("Invalid access token.");
  }

  const audiences = audienceValues(payload.aud);
  if (!expectedAudiences(config.apiClientId).some((value) => audiences.includes(value))) {
    throw new EntraAuthError("Invalid access token.");
  }

  if (!tokenHasScope(payload.scp, config.requiredScope)) {
    throw new EntraAuthError("Invalid access token.");
  }

  const authorizedParty =
    (typeof payload.azp === "string" && payload.azp) ||
    (typeof payload.appid === "string" && payload.appid) ||
    "";
  if (config.portalClientId && authorizedParty !== config.portalClientId) {
    throw new EntraAuthError("Invalid access token.");
  }

  const oid = typeof payload.oid === "string" ? payload.oid.trim() : "";
  if (!oid) {
    throw new EntraAuthError("Invalid access token.");
  }

  const exp = typeof payload.exp === "number" ? payload.exp : 0;
  if (exp && exp * 1000 < Date.now() - 60_000) {
    throw new EntraAuthError("Invalid access token.");
  }

  return {
    oid,
    email: tokenEmail(payload),
    name: typeof payload.name === "string" ? payload.name : undefined,
  };
}

function jwksForTenant(tenantId: string) {
  const cached = jwksCache.get(tenantId);
  if (cached) return cached;
  const jwks = createRemoteJWKSet(
    new URL(`https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`)
  );
  jwksCache.set(tenantId, jwks);
  return jwks;
}

export async function verifyEntraAccessToken(
  token: string,
  options?: {
    config?: EntraVerifyConfig;
    key?: JWTVerifyGetKey | CryptoKey;
  }
): Promise<EntraIdentity> {
  const config = options?.config ?? entraVerifyConfig();
  if (!config.tenantId || !config.apiClientId) {
    throw new EntraAuthError("Microsoft Entra is not configured.", 503);
  }

  try {
    const { payload } = await jwtVerify(token, options?.key ?? jwksForTenant(config.tenantId), {
      issuer: expectedIssuers(config.tenantId),
      audience: expectedAudiences(config.apiClientId),
      clockTolerance: 60,
    });
    return assertEntraAccessClaims(payload, config);
  } catch (error) {
    if (error instanceof EntraAuthError) throw error;
    throw new EntraAuthError("Invalid access token.");
  }
}

export async function identityFromRequest(request: Request, options?: Parameters<typeof verifyEntraAccessToken>[1]) {
  const token = extractBearerToken(request.headers.get("authorization"));
  if (!token) {
    throw new EntraAuthError("Authentication required.");
  }
  return verifyEntraAccessToken(token, options);
}
