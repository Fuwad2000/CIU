import { formatFormDetails, sendFormSubmissionEmails } from "@email/form-mail";
import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk, readString } from "@backend/http/respond";
import { DuplicateEmailError, createNewsletter } from "@backend/sql/sql-store";


const sources = new Set(["events", "website"]);

export async function POST(request: Request) {
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const fullName = readString(body.fullName);
  const email = readString(body.email).toLowerCase();
  const source = readString(body.source) || "events";

  if (!fullName || !email) {
    return jsonError("Full name and email are required.");
  }
  if (!sources.has(source)) {
    return jsonError("Source must be events or website.");
  }
  if (body.agreement !== true) {
    return jsonError("Agreement is required.");
  }

  try {
    const record = await createNewsletter({
      fullName,
      email,
      source: source as "events" | "website",
      agreement: true,
    });
    await sendFormSubmissionEmails({
      form: "newsletter",
      submitterName: fullName,
      submitterEmail: email,
      internalDetails: formatFormDetails({
        Name: fullName,
        Email: email,
        Source: source,
      }),
    });
    return jsonOk(record, 201);
  } catch (error) {
    if (error instanceof DuplicateEmailError) return jsonError(error.message, 409);
    return jsonError(error instanceof Error ? error.message : "Could not save newsletter sign-up.", 500);
  }
}
