import sql from "mssql";
import { query } from "@backend/db/sql-query";
import { DuplicateEmailError } from "@backend/sql/sql-store";
import { isUsableEmail, normalizeEmail } from "@shared/outreach";
import type { OutreachAdditionalPerson } from "@shared/outreach";

export const CONTACT_FORM_ADDITIONAL_NOTE = "Reached out via the contact form";

type Row = Record<string, unknown>;

function iso(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) return new Date(value).toISOString();
  return "";
}

function asString(value: unknown) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function optionalString(value: unknown) {
  const text = asString(value).trim();
  return text || undefined;
}

function isUuid(value: string | undefined) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      )
  );
}

function mapPerson(row: Row | undefined): OutreachAdditionalPerson | null {
  if (!row) return null;
  return {
    id: asString(row.id),
    fullName: asString(row.fullName),
    email: asString(row.email),
    phone: optionalString(row.phone),
    notes: optionalString(row.notes),
    createdBy: optionalString(row.createdBy),
    createdByName: optionalString(row.createdByName),
    createdAt: iso(row.createdAt),
  };
}

function rethrowDuplicate(error: unknown): never {
  const number =
    typeof error === "object" && error && "number" in error
      ? Number((error as { number?: number }).number)
      : undefined;
  const text = error instanceof Error ? error.message : String(error);
  if (number === 2627 || number === 2601 || /duplicate key|unique index/i.test(text)) {
    throw new DuplicateEmailError("This email is already on the additional audience list.");
  }
  throw error instanceof Error ? error : new Error(text);
}

const personSelect = `
  SELECT a.id, a.fullName, a.email, a.phone, a.notes, a.createdBy, a.createdAt,
         creator.displayName AS createdByName
  FROM dbo.outreach_additional a
  LEFT JOIN dbo.users creator ON creator.id = a.createdBy
`;

export async function listOutreachAdditional(): Promise<OutreachAdditionalPerson[]> {
  const rows = await query<Row>(`${personSelect} ORDER BY a.createdAt DESC`);
  return rows.map((row) => mapPerson(row)!);
}

export async function getOutreachAdditional(id: string): Promise<OutreachAdditionalPerson | null> {
  if (!isUuid(id)) return null;
  const rows = await query<Row>(`${personSelect} WHERE a.id = @id`, (request) => {
    request.input("id", sql.UniqueIdentifier, id);
  });
  return mapPerson(rows[0]);
}

export async function rememberContactPerson(input: {
  fullName: string;
  email: string;
  phone?: string;
}): Promise<boolean> {
  const fullName = input.fullName.trim();
  const email = normalizeEmail(input.email);
  const phone = input.phone?.trim().slice(0, 40) || null;
  if (!fullName || !isUsableEmail(email)) return false;
  try {
    const inserted = await query<{ id: string }>(
      `INSERT INTO dbo.outreach_additional (fullName, email, phone, notes)
       OUTPUT INSERTED.id
       SELECT @fullName, @email, @phone, @notes
       WHERE NOT EXISTS (
         SELECT 1 FROM dbo.outreach_additional WHERE email = @email
       )`,
      (request) => {
        request.input("fullName", sql.NVarChar(200), fullName);
        request.input("email", sql.NVarChar(256), email);
        request.input("phone", sql.NVarChar(40), phone);
        request.input("notes", sql.NVarChar(500), CONTACT_FORM_ADDITIONAL_NOTE);
      }
    );
    return Boolean(inserted[0]?.id);
  } catch (error) {
    const number =
      typeof error === "object" && error && "number" in error
        ? Number((error as { number?: number }).number)
        : undefined;
    const text = error instanceof Error ? error.message : String(error);
    if (number === 2627 || number === 2601 || /duplicate key|unique index/i.test(text)) {
      return false;
    }
    throw error instanceof Error ? error : new Error(text);
  }
}

export async function createOutreachAdditional(input: {
  fullName: string;
  email: string;
  phone?: string;
  notes?: string;
  createdBy?: string;
}): Promise<OutreachAdditionalPerson> {
  try {
    const inserted = await query<{ id: string }>(
      `INSERT INTO dbo.outreach_additional (fullName, email, phone, notes, createdBy)
       OUTPUT INSERTED.id
       VALUES (@fullName, @email, @phone, @notes, @createdBy)`,
      (request) => {
        request.input("fullName", sql.NVarChar(200), input.fullName);
        request.input("email", sql.NVarChar(256), input.email);
        request.input("phone", sql.NVarChar(40), input.phone?.trim() || null);
        request.input("notes", sql.NVarChar(500), input.notes ?? null);
        request.input("createdBy", sql.UniqueIdentifier, isUuid(input.createdBy) ? input.createdBy : null);
      }
    );
    const record = await getOutreachAdditional(asString(inserted[0]?.id));
    if (!record) throw new Error("Could not load the additional person after saving.");
    return record;
  } catch (error) {
    rethrowDuplicate(error);
  }
}

export async function deleteOutreachAdditional(id: string): Promise<OutreachAdditionalPerson | null> {
  const existing = await getOutreachAdditional(id);
  if (!existing) return null;
  await query(
    `DELETE FROM dbo.outreach_additional WHERE id = @id`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, id);
    }
  );
  return existing;
}
