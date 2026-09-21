import { jsonError, jsonOk, recordHistory } from "@backend/http/respond";
import { requireSubscriptionDelete } from "@backend/http/admin/subscription-delete";
import { deleteNewsletter } from "@backend/sql/sql-store";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, context: Context) {
  const auth = await requireSubscriptionDelete(request);
  if (auth.error) return auth.error;

  const { id } = await context.params;
  try {
    const record = await deleteNewsletter(id);
    if (!record) return jsonError("Newsletter sign-up not found.", 404);
    await recordHistory(request, {
      action: "deleted",
      area: "newsletter",
      summary: `Removed newsletter: ${record.fullName} (${record.email})`,
      entityId: record.id,
    });
    return jsonOk({ ok: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not remove this newsletter sign-up.", 500);
  }
}
