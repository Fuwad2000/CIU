import { formatFormDetails, sendFormSubmissionEmails } from "@email/form-mail";
import { isSqlConfigured } from "@backend/env";
import { rememberContactPerson } from "@backend/outreach/additional";
import { getPortalBackend } from "@backend/stores/backend";
import { jsonError, jsonOk, readString } from "@backend/http/respond";


export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const firstName = readString(body.firstName);
  const surname = readString(body.surname);
  const email = readString(body.email);
  const phone = readString(body.phone);
  const subject = readString(body.subject);
  const message = readString(body.message);

  if (!firstName || !surname || !email || !phone || !subject || !message) {
    return jsonError("First name, surname, email, phone, subject, and message are required.");
  }

  const record = await getPortalBackend().createContact({
    firstName,
    surname,
    email,
    phone,
    subject,
    message,
  });

  if (isSqlConfigured()) {
    try {
      await rememberContactPerson({
        fullName: `${firstName} ${surname}`,
        email,
        phone,
      });
    } catch {
      // The message is already saved. A missing additional row must not fail the public form.
    }
  }

  await sendFormSubmissionEmails({
    form: "contact",
    submitterName: `${firstName} ${surname}`,
    submitterEmail: email,
    internalDetails: formatFormDetails({
      Name: `${firstName} ${surname}`,
      Email: email,
      Phone: phone,
      Subject: subject,
      Message: message,
    }),
  });

  return jsonOk(record, 201);
}
