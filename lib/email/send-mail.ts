import { EmailClient, type EmailMessage } from "@azure/communication-email";
import { DefaultAzureCredential } from "@azure/identity";
import { acsEndpoint, emailSender } from "@/lib/portal/env";
import { EmailConfigError, EmailValidationError } from "@/lib/email/errors";

export type EmailPurpose =
  | "admin-test"
  | "form-internal"
  | "form-confirmation";

export type SendMailInput = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  purpose?: EmailPurpose | string;
};

export type SendMailResult = {
  messageId?: string;
  status: string;
};

export type EmailTransport = {
  send: (message: {
    senderAddress: string;
    to: string[];
    subject: string;
    html?: string;
    text?: string;
    purpose?: string;
  }) => Promise<SendMailResult>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type GlobalEmail = {
  ciuEmailClient?: EmailClient;
  ciuEmailCredential?: DefaultAzureCredential;
  ciuEmailTransport?: EmailTransport;
};

const globalEmail = globalThis as typeof globalThis & GlobalEmail;

export function normalizeEmailAddress(value: string) {
  return value.trim().toLowerCase();
}

export function isValidEmailAddress(value: string) {
  const email = normalizeEmailAddress(value);
  return EMAIL_PATTERN.test(email);
}

export function setEmailTransportForTests(transport: EmailTransport | undefined) {
  globalEmail.ciuEmailTransport = transport;
}

function requireConfig() {
  const endpoint = acsEndpoint();
  const sender = emailSender();
  if (!endpoint) {
    throw new EmailConfigError(
      "Azure Communication Services is not configured. Set AZURE_COMMUNICATION_SERVICES_ENDPOINT."
    );
  }
  if (!sender || !isValidEmailAddress(sender)) {
    throw new EmailConfigError("Azure email sender is not configured. Set AZURE_EMAIL_SENDER.");
  }
  return { endpoint, sender };
}

function normalizeRecipients(to: string | string[]) {
  const values = (Array.isArray(to) ? to : [to]).map(normalizeEmailAddress).filter(Boolean);
  if (values.length === 0) {
    throw new EmailValidationError("At least one recipient is required.");
  }
  const invalid = values.find((email) => !isValidEmailAddress(email));
  if (invalid) {
    throw new EmailValidationError("A recipient email address is not valid.");
  }
  return [...new Set(values)];
}

function getAcsClient(endpoint: string) {
  globalEmail.ciuEmailCredential ??= new DefaultAzureCredential();
  globalEmail.ciuEmailClient ??= new EmailClient(endpoint, globalEmail.ciuEmailCredential);
  return globalEmail.ciuEmailClient;
}

async function sendWithAcs(message: {
  senderAddress: string;
  to: string[];
  subject: string;
  html?: string;
  text?: string;
}): Promise<SendMailResult> {
  const { endpoint } = requireConfig();
  const content =
    message.html && message.text
      ? { subject: message.subject, html: message.html, plainText: message.text }
      : message.html
        ? { subject: message.subject, html: message.html }
        : { subject: message.subject, plainText: message.text ?? "" };

  const emailMessage: EmailMessage = {
    senderAddress: message.senderAddress,
    content,
    recipients: {
      to: message.to.map((address) => ({ address })),
    },
  };

  const poller = await getAcsClient(endpoint).beginSend(emailMessage);
  const result = await poller.pollUntilDone();
  return {
    messageId: result.id,
    status: String(result.status ?? "unknown"),
  };
}

export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  const { sender } = requireConfig();
  const to = normalizeRecipients(input.to);
  const subject = input.subject.trim();
  const html = input.html?.trim();
  const text = input.text?.trim();

  if (!subject) {
    throw new EmailValidationError("Subject is required.");
  }
  if (!html && !text) {
    throw new EmailValidationError("Email content is required.");
  }

  const payload = {
    senderAddress: sender,
    to,
    subject,
    html: html || undefined,
    text: text || undefined,
    purpose: input.purpose,
  };

  try {
    const transport = globalEmail.ciuEmailTransport ?? { send: sendWithAcs };
    return await transport.send(payload);
  } catch (error) {
    if (error instanceof EmailConfigError || error instanceof EmailValidationError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error("[ciu-email] send failed", {
      purpose: input.purpose ?? "unspecified",
      recipientCount: to.length,
      message,
    });
    throw new Error("The email could not be sent.");
  }
}
