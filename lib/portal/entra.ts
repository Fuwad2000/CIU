const REQUIRED_SCOPE = "access_as_user";

export function entraTenantId() {
  return process.env.ENTRA_TENANT_ID?.trim() || process.env.NEXT_PUBLIC_ENTRA_TENANT_ID?.trim() || "";
}

export function entraPortalClientId() {
  return (
    process.env.ENTRA_PORTAL_CLIENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_ENTRA_PORTAL_CLIENT_ID?.trim() ||
    ""
  );
}

export function entraApiClientId() {
  return process.env.ENTRA_API_CLIENT_ID?.trim() || "";
}

export function entraApiScope() {
  return process.env.ENTRA_API_SCOPE?.trim() || process.env.NEXT_PUBLIC_ENTRA_API_SCOPE?.trim() || "";
}

export function entraRequiredScope() {
  const scope = entraApiScope();
  const name = scope.split("/").pop()?.trim();
  return name || REQUIRED_SCOPE;
}

export function isEntraConfigured() {
  return Boolean(entraTenantId() && entraPortalClientId() && entraApiClientId() && entraApiScope());
}

export function entraVerifyConfig() {
  return {
    tenantId: entraTenantId(),
    apiClientId: entraApiClientId(),
    portalClientId: entraPortalClientId(),
    requiredScope: entraRequiredScope(),
  };
}

export type EntraVerifyConfig = ReturnType<typeof entraVerifyConfig>;
