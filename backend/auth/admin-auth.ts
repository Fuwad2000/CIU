export { actorCapabilities, requestedCreateRole } from "@shared/admin-roles";
export type { AdminActor } from "@backend/auth/entra-auth";

import { authenticateAdminRequest } from "@backend/auth/entra-auth";

export async function requireAdminActor(request: Request) {
  return authenticateAdminRequest(request);
}
