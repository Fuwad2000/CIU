import { requireAdminActor } from "@/lib/portal/admin-auth";
import { denyUpdateAdmin } from "@/lib/portal/admin-policy";
import { isCreatableAdminRole, requestedCreateRole, resolveAdminRole } from "@/lib/portal/admin-roles";
import { jsonError, jsonOk, recordHistory, requireAdmin } from "@/lib/portal/http";
import { getStaffUserById, updateStaffUserAccess } from "@/lib/portal/sql-store";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;

  const { id } = await params;
  const target = await getStaffUserById(id);
  if (!target) return jsonError("User not found.", 404);

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const denied = denyUpdateAdmin(auth.actor, target, body);
  if (denied) {
    const status = denied === "No admin changes were requested." || denied === "isActive must be true or false." ? 400 : 403;
    return jsonError(denied, status);
  }

  const targetRole = resolveAdminRole(target)!;
  const nextRole = Object.prototype.hasOwnProperty.call(body, "role")
    ? requestedCreateRole(body.role)
    : targetRole;
  if (!isCreatableAdminRole(nextRole)) {
    return jsonError("The application cannot assign the super admin role.", 403);
  }

  const nextActive = Object.prototype.hasOwnProperty.call(body, "isActive")
    ? Boolean(body.isActive)
    : target.isActive;

  try {
    const updated = await updateStaffUserAccess(id, {
      role: nextRole,
      isActive: nextActive,
    });
    if (!updated) return jsonError("User not found.", 404);

    await recordHistory(request, {
      action: "updated",
      area: "users",
      summary:
        nextActive === target.isActive
          ? `Changed ${updated.displayName} to ${updated.role}`
          : `${updated.isActive ? "Restored" : "Deactivated"} admin: ${updated.displayName} (${updated.email})`,
      entityId: updated.id,
    });

    return jsonOk(updated);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not update user.", 500);
  }
}
