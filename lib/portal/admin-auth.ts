export { actorCapabilities, requestedCreateRole } from "@/lib/portal/admin-roles";
export type { AdminActor } from "@/lib/portal/entra-auth";

import { authenticateAdminRequest } from "@/lib/portal/entra-auth";

export async function requireAdminActor(request: Request) {
  return authenticateAdminRequest(request);
}
