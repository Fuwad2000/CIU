import { formatFormDetails, sendFormSubmissionEmails } from "@email/form-mail";
import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk, readString } from "@backend/http/respond";
import { createVolunteer } from "@backend/sql/sql-store";


const ageGroups = new Set(["high-school", "adult", "senior"]);
const availabilities = new Set(["weekdays", "weekends", "evenings", "flexible"]);

export async function POST(request: Request) {
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const fullName = readString(body.fullName);
  const email = readString(body.email).toLowerCase();
  const phone = readString(body.phone);
  const ageGroup = readString(body.ageGroup);
  const availability = readString(body.availability);
  const volunteerHours = readString(body.volunteerHours);
  const message = readString(body.message);
  const roles = Array.isArray(body.roles)
    ? body.roles.map((item) => readString(item)).filter(Boolean)
    : [];

  if (!fullName || !email || !phone || !ageGroups.has(ageGroup) || !availabilities.has(availability)) {
    return jsonError("Full name, email, phone, age group, and availability are required.");
  }
  if (roles.length === 0) {
    return jsonError("Choose at least one volunteer role.");
  }
  if (body.agreement !== true) {
    return jsonError("Agreement is required.");
  }

  try {
    const record = await createVolunteer({
      fullName,
      email,
      phone,
      ageGroup: ageGroup as "high-school" | "adult" | "senior",
      roles,
      availability: availability as "weekdays" | "weekends" | "evenings" | "flexible",
      volunteerHours: volunteerHours || undefined,
      message: message || undefined,
      agreement: true,
    });
    await sendFormSubmissionEmails({
      form: "volunteer",
      submitterName: fullName,
      submitterEmail: email,
      internalDetails: formatFormDetails({
        Name: fullName,
        Email: email,
        Phone: phone,
        "Age group": ageGroup,
        Roles: roles,
        Availability: availability,
        Hours: volunteerHours,
        Message: message,
      }),
    });
    return jsonOk(record, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not save volunteer.", 500);
  }
}
