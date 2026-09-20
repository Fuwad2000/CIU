import { requireAdminActor } from "@/lib/portal/admin-auth";
import { handleEmailTest } from "@/lib/email/email-test";
import { jsonError, jsonOk } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const result = await handleEmailTest(auth.actor.adminRole, body);
  if (result.status !== 200) return jsonError(result.error, result.status);
  return jsonOk(result.data);
}
