import { formatFormDetails, sendFormSubmissionEmails } from "@email/form-mail";
import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk, readString } from "@backend/http/respond";
import { DuplicateEmailError, createMember } from "@backend/sql/sql-store";


const membershipTypes = new Set(["individual", "family"]);
const sources = new Set(["membership", "events-newsletter"]);

export async function POST(request: Request) {
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const fullName = readString(body.fullName);
  const email = readString(body.email).toLowerCase();
  const phone = readString(body.phone);
  const city = readString(body.city);
  const notes = readString(body.message || body.notes);
  const membershipType = readString(body.membershipType);
  const source = readString(body.source) || "membership";
  const emailTopics = Array.isArray(body.emailTopics)
    ? body.emailTopics.map((item) => readString(item)).filter(Boolean)
    : [];

  if (!fullName || !email || !membershipTypes.has(membershipType)) {
    return jsonError("Full name, email, and membership type are required.");
  }
  if (!sources.has(source)) {
    return jsonError("Source must be membership or events-newsletter.");
  }
  if (body.agreement !== true) {
    return jsonError("Agreement is required.");
  }

  try {
    const record = await createMember({
      fullName,
      email,
      phone: phone || undefined,
      city: city || undefined,
      membershipType: membershipType as "individual" | "family",
      emailTopics,
      notes: notes || undefined,
      agreement: true,
      source: source as "membership" | "events-newsletter",
    });
    await sendFormSubmissionEmails({
      form: "membership",
      submitterName: fullName,
      submitterEmail: email,
      internalDetails: formatFormDetails({
        Name: fullName,
        Email: email,
        Phone: phone,
        City: city,
        Type: membershipType,
        Topics: emailTopics,
        Source: source,
        Notes: notes,
      }),
    });
    return jsonOk(record, 201);
  } catch (error) {
    if (error instanceof DuplicateEmailError) return jsonError(error.message, 409);
    return jsonError(error instanceof Error ? error.message : "Could not save member.", 500);
  }
}
