import {
  entraApiScope,
  entraPortalClientId,
  entraTenantId,
  isEntraConfigured,
} from "@backend/auth/entra";
import { jsonError, jsonOk } from "@backend/http/respond";
import type { PublicEntraConfig } from "@shared/entra-public";

export async function GET() {
  if (!isEntraConfigured()) {
    return jsonError("Microsoft sign-in is not configured.", 503);
  }

  const config: PublicEntraConfig = {
    tenantId: entraTenantId(),
    clientId: entraPortalClientId(),
    apiScope: entraApiScope(),
  };
  return jsonOk(config);
}
