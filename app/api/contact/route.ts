import { formatFormDetails, sendFormSubmissionEmails } from "@/lib/email/form-mail";
import { getPortalBackend } from "@/lib/portal/backend";
import { jsonError, jsonOk, readString } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

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
