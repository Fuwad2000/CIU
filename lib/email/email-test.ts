import type { AdminRole } from "@/lib/portal/admin-roles";
import { canSendEmailTest } from "@/lib/portal/admin-roles";
import { EmailConfigError, EmailValidationError } from "@/lib/email/errors";
import { sendMail } from "@/lib/email/send-mail";
import { readString } from "@/lib/portal/http";

export function denyEmailTest(role: AdminRole | null) {
  if (canSendEmailTest(role)) return null;
  return "You do not have permission to send a test email.";
}

export function parseEmailTestBody(body: Record<string, unknown>) {
  if (body.senderAddress !== undefined || body.endpoint !== undefined) {
    return "Sender and Azure configuration cannot be supplied by the client.";
  }

  const to = readString(body.to);
  const subject = readString(body.subject);
  const html = typeof body.html === "string" ? body.html : "";
  const text = typeof body.text === "string" ? body.text : "";

  if (!to || !subject || (!html.trim() && !text.trim())) {
    return "to, subject, and html or text are required.";
  }

  return { to, subject, html, text };
}

type EmailTestSuccess = {
  status: 200;
  data: { sent: true; messageId?: string; status: string };
};

type EmailTestFailure = {
  status: 400 | 403 | 502 | 503;
  error: string;
};

export async function handleEmailTest(
  role: AdminRole | null,
  body: Record<string, unknown>
): Promise<EmailTestSuccess | EmailTestFailure> {
  const denied = denyEmailTest(role);
  if (denied) {
    return { status: 403 as const, error: denied };
  }

  const parsed = parseEmailTestBody(body);
  if (typeof parsed === "string") {
    return { status: 400 as const, error: parsed };
  }

  try {
    const result = await sendMail({
      to: parsed.to,
      subject: parsed.subject,
      html: parsed.html || undefined,
      text: parsed.text || undefined,
      purpose: "admin-test",
    });
    return {
      status: 200 as const,
      data: {
        sent: true,
        messageId: result.messageId,
        status: result.status,
      },
    };
  } catch (error) {
    if (error instanceof EmailValidationError) {
      return { status: 400 as const, error: error.message };
    }
    if (error instanceof EmailConfigError) {
      return { status: 503 as const, error: error.message };
    }
    return { status: 502 as const, error: "The test email could not be sent." };
  }
}
