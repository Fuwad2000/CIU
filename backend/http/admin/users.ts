import { actorCapabilities, requireAdminActor } from "@backend/auth/admin-auth";
import { canViewAdmins, isCreatableAdminRole, requestedCreateRole } from "@shared/admin-roles";
import { denyCreateAdmin } from "@backend/auth/admin-policy";
import { jsonError, jsonOk, readString, recordHistory, requireAdmin } from "@backend/http/respond";
import { createStaffUser, listStaffUsers } from "@backend/sql/sql-store";


export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!canViewAdmins(auth.actor.adminRole)) {
    return jsonError("You do not have permission to view administrators.", 403);
  }

  try {
    const users = await listStaffUsers();
    return jsonOk({
      users,
      viewer: {
        id: auth.actor.id,
        email: auth.actor.email,
        displayName: auth.actor.displayName,
        ...actorCapabilities(auth.actor.adminRole),
      },
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load users.", 500);
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const denied = denyCreateAdmin(auth.actor.adminRole, body);
  if (denied) return jsonError(denied, 403);

  const requestedRole = requestedCreateRole(body.role);
  if (!isCreatableAdminRole(requestedRole)) {
    return jsonError("You do not have permission to create that admin level.", 403);
  }

  try {
    const record = await createStaffUser({
      displayName: readString(body.displayName),
      email: readString(body.email),
      role: requestedRole,
      createdBy: auth.actor.id,
    });

    await recordHistory(request, {
      action: "created",
      area: "users",
      summary: `Added ${record.role}: ${record.displayName} (${record.email})`,
      entityId: record.id,
    });

    return jsonOk(record, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not add user.", 500);
  }
}
