import { jsonError, jsonOk, recordHistory } from "@backend/http/respond";
import { requireSubscriptionDelete } from "@backend/http/admin/subscription-delete";
import { outreachSqlMessage } from "@backend/outreach/sql";
import { deleteOutreachAdditional } from "@backend/outreach/additional";


type Context = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, context: Context) {
  const auth = await requireSubscriptionDelete(request);
  if (auth.error) return auth.error;

  const { id } = await context.params;
  try {
    const record = await deleteOutreachAdditional(id);
    if (!record) return jsonError("Person not found.", 404);
    await recordHistory(request, {
      action: "deleted",
      area: "outreach",
      summary: `Removed contact list: ${record.fullName} (${record.email})`,
      entityId: record.id,
    });
    return jsonOk({ ok: true });
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not remove this person."), 500);
  }
}
