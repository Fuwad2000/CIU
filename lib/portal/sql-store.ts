import sql from "mssql";
import {
  flagsForRole,
  isCreatableAdminRole,
  type CreatableAdminRole,
} from "@/lib/portal/admin-roles";
import { getSqlPool } from "@/lib/portal/db";
import type {
  AdminHistoryEntry,
  AdminHistoryInput,
  Announcement,
  AnnouncementInput,
  ClassRegistration,
  ClassRegistrationInput,
  ContactInput,
  ContactMessage,
  PortalBackend,
  PortalEvent,
  PortalEventInput,
} from "@/lib/portal/types";

function iso(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) return new Date(value).toISOString();
  return "";
}

function dateOnly(value: unknown) {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const text = String(value);
  return text.slice(0, 10) || undefined;
}

function asBool(value: unknown) {
  return value === true || value === 1 || value === "1" || value === "true";
}

function asString(value: unknown) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function optionalString(value: unknown) {
  const text = asString(value).trim();
  return text || undefined;
}

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  const text = asString(value).trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    return text.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function isUuid(value: string | undefined) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      )
  );
}

type Row = Record<string, unknown>;

async function query<T extends object>(
  text: string,
  bind?: (request: sql.Request) => void
) {
  const pool = await getSqlPool();
  const request = pool.request();
  bind?.(request);
  const result = await request.query<T>(text);
  return result.recordset;
}

export class DuplicateEmailError extends Error {
  constructor(message = "This email is already on the list.") {
    super(message);
    this.name = "DuplicateEmailError";
  }
}

function rethrowDuplicate(error: unknown, message: string): never {
  const number =
    typeof error === "object" && error && "number" in error
      ? Number((error as { number?: number }).number)
      : undefined;
  const text = error instanceof Error ? error.message : String(error);
  if (number === 2627 || number === 2601 || /duplicate key|unique index/i.test(text)) {
    throw new DuplicateEmailError(message);
  }
  throw error instanceof Error ? error : new Error(text);
}

function mapAnnouncement(row: Row): Announcement {
  return {
    id: asString(row.id),
    message: asString(row.message),
    href: optionalString(row.href),
    active: asBool(row.active),
    createdAt: iso(row.createdAt),
    updatedAt: iso(row.updatedAt),
  };
}

function mapEvent(row: Row): PortalEvent {
  return {
    id: asString(row.id),
    title: asString(row.title),
    category: asString(row.category) as PortalEvent["category"],
    dateLabel: asString(row.dateLabel),
    date: dateOnly(row.date),
    time: asString(row.time),
    location: asString(row.location),
    description: asString(row.description),
    tags: parseJsonArray(row.tags),
    href: asString(row.href),
    buttonLabel: asString(row.buttonLabel) || "View Details",
    image: optionalString(row.image),
    recurring: asBool(row.recurring),
    featured: asBool(row.featured),
    createdAt: iso(row.createdAt),
    updatedAt: iso(row.updatedAt),
  };
}

function mapContact(row: Row): ContactMessage {
  return {
    id: asString(row.id),
    firstName: asString(row.firstName),
    surname: asString(row.surname),
    name: asString(row.name),
    email: asString(row.email),
    phone: asString(row.phone),
    subject: asString(row.subject),
    message: asString(row.message),
    createdAt: iso(row.createdAt),
  };
}

function mapRegistration(row: Row): ClassRegistration {
  return {
    id: asString(row.id),
    program: asString(row.program) as ClassRegistration["program"],
    studentName: asString(row.studentName),
    studentAge: asString(row.studentAge),
    grade: optionalString(row.grade),
    parentName: optionalString(row.parentName),
    email: asString(row.email),
    phone: asString(row.phone),
    notes: asString(row.notes),
    createdAt: iso(row.createdAt),
  };
}

function mapHistory(row: Row): AdminHistoryEntry {
  return {
    id: asString(row.id),
    userId: optionalString(row.userId),
    adminEmail: asString(row.adminEmail),
    action: asString(row.action) as AdminHistoryEntry["action"],
    area: asString(row.area) as AdminHistoryEntry["area"],
    summary: asString(row.summary),
    entityId: optionalString(row.entityId),
    createdAt: iso(row.createdAt),
  };
}

export const sqlStore: PortalBackend = {
  async listAnnouncements() {
    const rows = await query<Row>(
      `SELECT id, message, href, active, createdAt, updatedAt
       FROM dbo.announcements
       ORDER BY createdAt DESC`
    );
    return rows.map(mapAnnouncement);
  },

  async createAnnouncement(input: AnnouncementInput) {
    const rows = await query<Row>(
      `INSERT INTO dbo.announcements (message, href, active)
       OUTPUT INSERTED.id, INSERTED.message, INSERTED.href, INSERTED.active, INSERTED.createdAt, INSERTED.updatedAt
       VALUES (@message, @href, @active)`,
      (request) => {
        request.input("message", sql.NVarChar(500), input.message.trim());
        request.input("href", sql.NVarChar(500), input.href?.trim() || null);
        request.input("active", sql.Bit, input.active ?? true);
      }
    );
    return mapAnnouncement(rows[0]);
  },

  async updateAnnouncement(id, input: Partial<AnnouncementInput>) {
    const rows = await query<Row>(
      `UPDATE dbo.announcements
       SET
         message = COALESCE(@message, message),
         href = CASE WHEN @hrefSet = 1 THEN @href ELSE href END,
         active = COALESCE(@active, active),
         updatedAt = SYSUTCDATETIME()
       OUTPUT INSERTED.id, INSERTED.message, INSERTED.href, INSERTED.active, INSERTED.createdAt, INSERTED.updatedAt
       WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, id);
        request.input(
          "message",
          sql.NVarChar(500),
          input.message !== undefined ? input.message.trim() : null
        );
        request.input("hrefSet", sql.Bit, input.href !== undefined);
        request.input(
          "href",
          sql.NVarChar(500),
          input.href !== undefined ? input.href.trim() || null : null
        );
        request.input(
          "active",
          sql.Bit,
          input.active === undefined ? null : input.active
        );
      }
    );
    return rows[0] ? mapAnnouncement(rows[0]) : null;
  },

  async deleteAnnouncement(id) {
    const pool = await getSqlPool();
    const result = await pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .query(`DELETE FROM dbo.announcements WHERE id = @id`);
    return (result.rowsAffected[0] ?? 0) > 0;
  },

  async listEvents() {
    const rows = await query<Row>(
      `SELECT id, title, category, dateLabel, [date], [time], location, description, tags,
              href, buttonLabel, image, recurring, featured, createdAt, updatedAt
       FROM dbo.events
       ORDER BY featured DESC,
                CASE WHEN recurring = 1 THEN 1 ELSE 0 END,
                COALESCE([date], CAST(createdAt AS date)) ASC,
                createdAt DESC`
    );
    return rows.map(mapEvent);
  },

  async createEvent(input: PortalEventInput) {
    const rows = await query<Row>(
      `INSERT INTO dbo.events
         (title, category, dateLabel, [date], [time], location, description, tags, href, buttonLabel, image, recurring, featured)
       OUTPUT INSERTED.id, INSERTED.title, INSERTED.category, INSERTED.dateLabel, INSERTED.[date], INSERTED.[time],
              INSERTED.location, INSERTED.description, INSERTED.tags, INSERTED.href, INSERTED.buttonLabel, INSERTED.image,
              INSERTED.recurring, INSERTED.featured, INSERTED.createdAt, INSERTED.updatedAt
       VALUES (@title, @category, @dateLabel, @date, @time, @location, @description, @tags, @href, @buttonLabel, @image, @recurring, @featured)`,
      (request) => bindEvent(request, input)
    );
    return mapEvent(rows[0]);
  },

  async updateEvent(id, input: Partial<PortalEventInput>) {
    const current = (await query<Row>(
      `SELECT id, title, category, dateLabel, [date], [time], location, description, tags,
              href, buttonLabel, image, recurring, featured, createdAt, updatedAt
       FROM dbo.events WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, id);
      }
    ))[0];
    if (!current) return null;

    const merged: PortalEventInput = {
      ...mapEvent(current),
      ...input,
      tags: input.tags ?? mapEvent(current).tags,
    };

    const rows = await query<Row>(
      `UPDATE dbo.events
       SET title = @title,
           category = @category,
           dateLabel = @dateLabel,
           [date] = @date,
           [time] = @time,
           location = @location,
           description = @description,
           tags = @tags,
           href = @href,
           buttonLabel = @buttonLabel,
           image = @image,
           recurring = @recurring,
           featured = @featured,
           updatedAt = SYSUTCDATETIME()
       OUTPUT INSERTED.id, INSERTED.title, INSERTED.category, INSERTED.dateLabel, INSERTED.[date], INSERTED.[time],
              INSERTED.location, INSERTED.description, INSERTED.tags, INSERTED.href, INSERTED.buttonLabel, INSERTED.image,
              INSERTED.recurring, INSERTED.featured, INSERTED.createdAt, INSERTED.updatedAt
       WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, id);
        bindEvent(request, merged);
      }
    );
    return rows[0] ? mapEvent(rows[0]) : null;
  },

  async deleteEvent(id) {
    const pool = await getSqlPool();
    const result = await pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .query(`DELETE FROM dbo.events WHERE id = @id`);
    return (result.rowsAffected[0] ?? 0) > 0;
  },

  async listContacts() {
    const rows = await query<Row>(
      `SELECT id, firstName, surname, name, email, phone, subject, message, createdAt
       FROM dbo.contacts
       ORDER BY createdAt DESC`
    );
    return rows.map(mapContact);
  },

  async createContact(input: ContactInput) {
    const firstName = input.firstName.trim();
    const surname = input.surname.trim();
    const name = `${firstName} ${surname}`.trim();
    const rows = await query<Row>(
      `INSERT INTO dbo.contacts (firstName, surname, name, email, phone, subject, message)
       OUTPUT INSERTED.id, INSERTED.firstName, INSERTED.surname, INSERTED.name, INSERTED.email,
              INSERTED.phone, INSERTED.subject, INSERTED.message, INSERTED.createdAt
       VALUES (@firstName, @surname, @name, @email, @phone, @subject, @message)`,
      (request) => {
        request.input("firstName", sql.NVarChar(100), firstName);
        request.input("surname", sql.NVarChar(100), surname);
        request.input("name", sql.NVarChar(200), name);
        request.input("email", sql.NVarChar(256), input.email.trim());
        request.input("phone", sql.NVarChar(40), input.phone.trim());
        request.input("subject", sql.NVarChar(200), input.subject.trim());
        request.input("message", sql.NVarChar(sql.MAX), input.message.trim());
      }
    );
    return mapContact(rows[0]);
  },

  async listRegistrations() {
    const rows = await query<Row>(
      `SELECT id, program, studentName, studentAge, grade, parentName, email, phone, notes, createdAt
       FROM dbo.registrations
       ORDER BY createdAt DESC`
    );
    return rows.map(mapRegistration);
  },

  async createRegistration(input: ClassRegistrationInput) {
    const rows = await query<Row>(
      `INSERT INTO dbo.registrations (program, studentName, studentAge, grade, parentName, email, phone, notes)
       OUTPUT INSERTED.id, INSERTED.program, INSERTED.studentName, INSERTED.studentAge, INSERTED.grade,
              INSERTED.parentName, INSERTED.email, INSERTED.phone, INSERTED.notes, INSERTED.createdAt
       VALUES (@program, @studentName, @studentAge, @grade, @parentName, @email, @phone, @notes)`,
      (request) => {
        request.input("program", sql.NVarChar(16), input.program);
        request.input("studentName", sql.NVarChar(200), input.studentName.trim());
        request.input(
          "studentAge",
          sql.NVarChar(20),
          input.program === "kids" ? input.studentAge?.trim() || null : input.studentAge?.trim() || null
        );
        request.input(
          "grade",
          sql.NVarChar(8),
          input.program === "kids" ? input.grade?.trim() || null : null
        );
        request.input(
          "parentName",
          sql.NVarChar(200),
          input.program === "kids" ? input.parentName?.trim() || null : null
        );
        request.input("email", sql.NVarChar(256), input.email.trim());
        request.input("phone", sql.NVarChar(40), input.phone.trim());
        request.input("notes", sql.NVarChar(sql.MAX), input.notes?.trim() || null);
      }
    );
    return mapRegistration(rows[0]);
  },

  async listHistory() {
    const rows = await query<Row>(
      `SELECT id, userId, adminEmail, action, area, summary, entityId, createdAt
       FROM dbo.history
       ORDER BY createdAt DESC`
    );
    return rows.map(mapHistory);
  },

  async createHistory(input: AdminHistoryInput) {
    const adminEmail = input.adminEmail.trim().toLowerCase();
    const userRows = await query<Row>(
      `SELECT TOP 1 id FROM dbo.users WHERE LOWER(email) = @email AND isActive = 1`,
      (request) => {
        request.input("email", sql.NVarChar(256), adminEmail);
      }
    );
    const userId = optionalString(userRows[0]?.id);
    const entityId = isUuid(input.entityId) ? input.entityId : undefined;

    const rows = await query<Row>(
      `INSERT INTO dbo.history (userId, adminEmail, action, area, summary, entityId)
       OUTPUT INSERTED.id, INSERTED.userId, INSERTED.adminEmail, INSERTED.action, INSERTED.area,
              INSERTED.summary, INSERTED.entityId, INSERTED.createdAt
       VALUES (@userId, @adminEmail, @action, @area, @summary, @entityId)`,
      (request) => {
        request.input("userId", sql.UniqueIdentifier, userId ?? null);
        request.input("adminEmail", sql.NVarChar(256), adminEmail);
        request.input("action", sql.NVarChar(32), input.action);
        request.input("area", sql.NVarChar(32), input.area);
        request.input("summary", sql.NVarChar(500), input.summary.trim());
        request.input("entityId", sql.UniqueIdentifier, entityId ?? null);
      }
    );
    return mapHistory(rows[0]);
  },
};

function bindEvent(request: sql.Request, input: PortalEventInput) {
  request.input("title", input.title.trim());
  request.input("category", input.category);
  request.input("dateLabel", input.dateLabel.trim() || null);
  request.input("date", input.date?.trim() || null);
  request.input("time", input.time.trim());
  request.input("location", input.location.trim());
  request.input("description", input.description.trim());
  request.input(
    "tags",
    JSON.stringify(input.tags.map((tag) => tag.trim()).filter(Boolean))
  );
  request.input("href", input.href.trim());
  request.input("buttonLabel", input.buttonLabel.trim() || "View Details");
  request.input("image", input.image?.trim() || null);
  request.input("recurring", Boolean(input.recurring));
  request.input("featured", Boolean(input.featured));
}

export type MemberRecord = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  membershipType: "individual" | "family";
  emailTopics: string[];
  notes?: string;
  agreedToEmails: boolean;
  unsubscribedAt?: string;
  source: "membership" | "events-newsletter";
  createdAt: string;
};

export type VolunteerRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  ageGroup: "high-school" | "adult" | "senior";
  roles: string[];
  availability: "weekdays" | "weekends" | "evenings" | "flexible";
  volunteerHours?: string;
  message?: string;
  agreement: boolean;
  createdAt: string;
};

export type StaffUserRecord = {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
  isOwner: boolean;
  canManageAdmins: boolean;
  entraObjectId?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
};

export const PRIMARY_OWNER = {
  displayName: "Fuwad Oladega",
  email: "fuwad.oladega@ciucanada.ca",
} as const;

function mapStaffUser(row: Row): StaffUserRecord {
  return {
    id: asString(row.id),
    email: asString(row.email),
    displayName: asString(row.displayName),
    role: asString(row.role),
    isActive: asBool(row.isActive),
    isOwner: asBool(row.isOwner),
    canManageAdmins: asBool(row.canManageAdmins),
    entraObjectId: optionalString(row.entraObjectId),
    lastLoginAt: row.lastLoginAt ? iso(row.lastLoginAt) : undefined,
    createdAt: iso(row.createdAt),
    updatedAt: iso(row.updatedAt),
  };
}

export async function getStaffUserById(id: string) {
  if (!isUuid(id)) return null;
  const rows = await query<Row>(
    `SELECT ${staffUserColumns}
     FROM dbo.users
     WHERE id = @id`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, id);
    }
  );
  return rows[0] ? mapStaffUser(rows[0]) : null;
}

export async function listMembers(source?: MemberRecord["source"]) {
  const rows = await query<Row>(
    `SELECT id, fullName, email, phone, city, membershipType, emailTopics, notes, agreedToEmails, unsubscribedAt, source, createdAt
     FROM dbo.members
     ${source ? "WHERE source = @source" : ""}
     ORDER BY createdAt DESC`,
    source
      ? (request) => {
          request.input("source", sql.NVarChar(40), source);
        }
      : undefined
  );
  return rows.map(
    (row): MemberRecord => ({
      id: asString(row.id),
      fullName: asString(row.fullName),
      email: asString(row.email),
      phone: optionalString(row.phone),
      city: optionalString(row.city),
      membershipType: asString(row.membershipType) as MemberRecord["membershipType"],
      emailTopics: parseJsonArray(row.emailTopics),
      notes: optionalString(row.notes),
      agreedToEmails: asBool(row.agreedToEmails),
      unsubscribedAt: row.unsubscribedAt ? iso(row.unsubscribedAt) : undefined,
      source: asString(row.source) as MemberRecord["source"],
      createdAt: iso(row.createdAt),
    })
  );
}

export async function createMember(input: {
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  membershipType: "individual" | "family";
  emailTopics?: string[];
  notes?: string;
  agreement: boolean;
  source?: "membership" | "events-newsletter";
}) {
  if (!input.agreement) {
    throw new Error("Membership requires agreement to receive emails.");
  }
  try {
    const rows = await query<Row>(
    `INSERT INTO dbo.members (fullName, email, phone, city, membershipType, emailTopics, notes, agreedToEmails, source)
     OUTPUT INSERTED.id, INSERTED.fullName, INSERTED.email, INSERTED.phone, INSERTED.city, INSERTED.membershipType,
            INSERTED.emailTopics, INSERTED.notes, INSERTED.agreedToEmails, INSERTED.unsubscribedAt, INSERTED.source, INSERTED.createdAt
     VALUES (@fullName, @email, @phone, @city, @membershipType, @emailTopics, @notes, 1, @source)`,
    (request) => {
      request.input("fullName", sql.NVarChar(200), input.fullName.trim());
      request.input("email", sql.NVarChar(256), input.email.trim().toLowerCase());
      request.input("phone", sql.NVarChar(40), input.phone?.trim() || null);
      request.input("city", sql.NVarChar(100), input.city?.trim() || null);
      request.input("membershipType", sql.NVarChar(20), input.membershipType);
      request.input(
        "emailTopics",
        sql.NVarChar(sql.MAX),
        JSON.stringify(input.emailTopics ?? [])
      );
      request.input("notes", sql.NVarChar(sql.MAX), input.notes?.trim() || null);
      request.input("source", sql.NVarChar(40), input.source ?? "membership");
    }
  );
  const row = rows[0];
  return (await listMembers()).find((item) => item.id === asString(row.id))!;
  } catch (error) {
    rethrowDuplicate(error, "This email is already on the membership list.");
  }
}

export async function listVolunteers() {
  const rows = await query<Row>(
    `SELECT id, fullName, email, phone, ageGroup, roles, availability, volunteerHours, message, agreement, createdAt
     FROM dbo.volunteers
     ORDER BY createdAt DESC`
  );
  return rows.map(
    (row): VolunteerRecord => ({
      id: asString(row.id),
      fullName: asString(row.fullName),
      email: asString(row.email),
      phone: asString(row.phone),
      ageGroup: asString(row.ageGroup) as VolunteerRecord["ageGroup"],
      roles: parseJsonArray(row.roles),
      availability: asString(row.availability) as VolunteerRecord["availability"],
      volunteerHours: optionalString(row.volunteerHours),
      message: optionalString(row.message),
      agreement: asBool(row.agreement),
      createdAt: iso(row.createdAt),
    })
  );
}

export async function createVolunteer(input: {
  fullName: string;
  email: string;
  phone: string;
  ageGroup: VolunteerRecord["ageGroup"];
  roles: string[];
  availability: VolunteerRecord["availability"];
  volunteerHours?: string;
  message?: string;
  agreement: boolean;
}) {
  if (!input.agreement) {
    throw new Error("Volunteer registration requires agreement.");
  }
  const rows = await query<Row>(
    `INSERT INTO dbo.volunteers (fullName, email, phone, ageGroup, roles, availability, volunteerHours, message, agreement)
     OUTPUT INSERTED.id
     VALUES (@fullName, @email, @phone, @ageGroup, @roles, @availability, @volunteerHours, @message, 1)`,
    (request) => {
      request.input("fullName", sql.NVarChar(200), input.fullName.trim());
      request.input("email", sql.NVarChar(256), input.email.trim().toLowerCase());
      request.input("phone", sql.NVarChar(40), input.phone.trim());
      request.input("ageGroup", sql.NVarChar(20), input.ageGroup);
      request.input("roles", sql.NVarChar(sql.MAX), JSON.stringify(input.roles));
      request.input("availability", sql.NVarChar(20), input.availability);
      request.input(
        "volunteerHours",
        sql.NVarChar(8),
        input.volunteerHours?.trim() || null
      );
      request.input("message", sql.NVarChar(sql.MAX), input.message?.trim() || null);
    }
  );
  const id = asString(rows[0].id);
  return (await listVolunteers()).find((item) => item.id === id)!;
}

export type NewsletterRecord = {
  id: string;
  fullName: string;
  email: string;
  source: "events" | "website";
  agreedToEmails: boolean;
  unsubscribedAt?: string;
  createdAt: string;
};

function mapNewsletter(row: Row): NewsletterRecord {
  return {
    id: asString(row.id),
    fullName: asString(row.fullName),
    email: asString(row.email),
    source: asString(row.source) as NewsletterRecord["source"],
    agreedToEmails: asBool(row.agreedToEmails),
    unsubscribedAt: row.unsubscribedAt ? iso(row.unsubscribedAt) : undefined,
    createdAt: iso(row.createdAt),
  };
}

export async function listNewsletter() {
  const rows = await query<Row>(
    `SELECT id, fullName, email, source, agreedToEmails, unsubscribedAt, createdAt
     FROM dbo.newsletter
     WHERE unsubscribedAt IS NULL
     ORDER BY createdAt DESC`
  );
  return rows.map(mapNewsletter);
}

export async function createNewsletter(input: {
  fullName: string;
  email: string;
  source?: NewsletterRecord["source"];
  agreement: boolean;
}) {
  if (!input.agreement) {
    throw new Error("Newsletter sign-up requires agreement to receive emails.");
  }
  try {
    const rows = await query<Row>(
      `INSERT INTO dbo.newsletter (fullName, email, source, agreedToEmails)
       OUTPUT INSERTED.id, INSERTED.fullName, INSERTED.email, INSERTED.source,
              INSERTED.agreedToEmails, INSERTED.unsubscribedAt, INSERTED.createdAt
       VALUES (@fullName, @email, @source, 1)`,
      (request) => {
        request.input("fullName", sql.NVarChar(200), input.fullName.trim());
        request.input("email", sql.NVarChar(256), input.email.trim().toLowerCase());
        request.input("source", sql.NVarChar(40), input.source ?? "events");
      }
    );
    return mapNewsletter(rows[0]);
  } catch (error) {
    rethrowDuplicate(error, "This email is already on the newsletter list.");
  }
}

const staffUserColumns = `
  id, email, displayName, role, isActive, isOwner, canManageAdmins, entraObjectId, lastLoginAt, createdAt, updatedAt
`;

export async function listStaffUsers() {
  const rows = await query<Row>(
    `SELECT ${staffUserColumns}
     FROM dbo.users
     ORDER BY CASE
       WHEN role = 'superadmin' THEN 0
       WHEN role = 'intermediateadmin' THEN 1
       ELSE 2
     END, displayName ASC`
  );
  return rows.map(mapStaffUser);
}

export async function getStaffUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  const rows = await query<Row>(
    `SELECT ${staffUserColumns}
     FROM dbo.users
     WHERE LOWER(email) = @email`,
    (request) => {
      request.input("email", normalized);
    }
  );
  return rows[0] ? mapStaffUser(rows[0]) : null;
}

export async function getStaffUserByEntraObjectId(oid: string) {
  const normalized = oid.trim().toLowerCase();
  if (!normalized) return null;
  const rows = await query<Row>(
    `SELECT ${staffUserColumns}
     FROM dbo.users
     WHERE LOWER(entraObjectId) = @oid`,
    (request) => {
      request.input("oid", normalized);
    }
  );
  return rows[0] ? mapStaffUser(rows[0]) : null;
}

export async function bindEntraObjectId(userId: string, oid: string) {
  const normalized = oid.trim();
  if (!isUuid(userId) || !normalized) return null;
  const rows = await query<Row>(
    `UPDATE dbo.users
     SET entraObjectId = @oid,
         updatedAt = SYSUTCDATETIME()
     OUTPUT INSERTED.id, INSERTED.email, INSERTED.displayName, INSERTED.role, INSERTED.isActive,
            INSERTED.isOwner, INSERTED.canManageAdmins, INSERTED.entraObjectId, INSERTED.lastLoginAt,
            INSERTED.createdAt, INSERTED.updatedAt
     WHERE id = @id AND entraObjectId IS NULL`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, userId);
      request.input("oid", sql.NVarChar(64), normalized);
    }
  );
  return rows[0] ? mapStaffUser(rows[0]) : getStaffUserById(userId);
}

export async function findAdminByEntraIdentity(oid: string, email?: string) {
  const byOid = await getStaffUserByEntraObjectId(oid);
  if (byOid) return byOid;
  if (!email) return null;
  const byEmail = await getStaffUserByEmail(email);
  if (!byEmail || byEmail.entraObjectId) return null;
  return bindEntraObjectId(byEmail.id, oid);
}

export async function touchStaffUserLogin(id: string) {
  if (!isUuid(id)) return;
  await query(
    `UPDATE dbo.users
     SET lastLoginAt = SYSUTCDATETIME(),
         updatedAt = SYSUTCDATETIME()
     WHERE id = @id`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, id);
    }
  );
}

export async function listHistoryForAdmin(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return [];
  const rows = await query<Row>(
    `SELECT id, userId, adminEmail, action, area, summary, entityId, createdAt
     FROM dbo.history
     WHERE LOWER(adminEmail) = @email
     ORDER BY createdAt DESC`,
    (request) => {
      request.input("email", normalized);
    }
  );
  return rows.map(mapHistory);
}

export async function ensurePrimaryOwner() {
  const existing = await getStaffUserByEmail(PRIMARY_OWNER.email);
  if (existing) {
    if (
      existing.role === "superadmin" &&
      existing.isOwner &&
      existing.canManageAdmins &&
      existing.isActive
    ) {
      return existing;
    }

    const rows = await query<Row>(
      `UPDATE dbo.users
       SET displayName = @displayName,
           role = 'superadmin',
           isActive = 1,
           isOwner = 1,
           canManageAdmins = 1,
           updatedAt = SYSUTCDATETIME()
       OUTPUT INSERTED.id, INSERTED.email, INSERTED.displayName, INSERTED.role, INSERTED.isActive,
              INSERTED.isOwner, INSERTED.canManageAdmins, INSERTED.lastLoginAt, INSERTED.createdAt, INSERTED.updatedAt
       WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, existing.id);
        request.input("displayName", sql.NVarChar(200), PRIMARY_OWNER.displayName);
      }
    );
    return mapStaffUser(rows[0]);
  }

  const rows = await query<Row>(
    `INSERT INTO dbo.users (email, displayName, role, isActive, isOwner, canManageAdmins)
     OUTPUT INSERTED.id, INSERTED.email, INSERTED.displayName, INSERTED.role, INSERTED.isActive,
            INSERTED.isOwner, INSERTED.canManageAdmins, INSERTED.lastLoginAt, INSERTED.createdAt, INSERTED.updatedAt
     VALUES (@email, @displayName, 'superadmin', 1, 1, 1)`,
    (request) => {
      request.input("email", sql.NVarChar(256), PRIMARY_OWNER.email);
      request.input("displayName", sql.NVarChar(200), PRIMARY_OWNER.displayName);
    }
  );
  return mapStaffUser(rows[0]);
}

export async function createStaffUser(input: {
  email: string;
  displayName: string;
  role: CreatableAdminRole;
  createdBy?: string;
}) {
  const email = input.email.trim().toLowerCase();
  const displayName = input.displayName.trim();
  if (!isCreatableAdminRole(input.role)) {
    throw new Error("The application cannot create a super admin.");
  }
  if (!email.includes("@") || !displayName) {
    throw new Error("Name and a valid email are required.");
  }
  if (await getStaffUserByEmail(email)) {
    throw new Error("A user with that email already exists.");
  }

  const flags = flagsForRole(input.role);
  const rows = await query<Row>(
    `INSERT INTO dbo.users (email, displayName, role, isActive, isOwner, canManageAdmins, createdBy)
     OUTPUT INSERTED.id, INSERTED.email, INSERTED.displayName, INSERTED.role, INSERTED.isActive,
            INSERTED.isOwner, INSERTED.canManageAdmins, INSERTED.lastLoginAt, INSERTED.createdAt, INSERTED.updatedAt
     VALUES (@email, @displayName, @role, 1, @isOwner, @canManageAdmins, @createdBy)`,
    (request) => {
      request.input("email", sql.NVarChar(256), email);
      request.input("displayName", sql.NVarChar(200), displayName);
      request.input("role", sql.NVarChar(32), input.role);
      request.input("isOwner", sql.Bit, flags.isOwner);
      request.input("canManageAdmins", sql.Bit, flags.canManageAdmins);
      request.input(
        "createdBy",
        sql.UniqueIdentifier,
        isUuid(input.createdBy) ? input.createdBy : null
      );
    }
  );
  return mapStaffUser(rows[0]);
}

export async function updateStaffUserAccess(
  id: string,
  patch: { role?: CreatableAdminRole; isActive?: boolean }
) {
  const current = await getStaffUserById(id);
  if (!current) return null;
  if (current.role === "superadmin" || current.isOwner) {
    throw new Error("Super admin accounts cannot be modified through the API.");
  }

  const nextRole = patch.role ?? current.role;
  if (!isCreatableAdminRole(nextRole)) {
    throw new Error("The application cannot assign the super admin role.");
  }

  const flags = flagsForRole(nextRole);
  const isActive = patch.isActive ?? current.isActive;
  const rows = await query<Row>(
    `UPDATE dbo.users
     SET role = @role,
         isActive = @isActive,
         isOwner = @isOwner,
         canManageAdmins = @canManageAdmins,
         updatedAt = SYSUTCDATETIME()
     OUTPUT INSERTED.id, INSERTED.email, INSERTED.displayName, INSERTED.role, INSERTED.isActive,
            INSERTED.isOwner, INSERTED.canManageAdmins, INSERTED.lastLoginAt, INSERTED.createdAt, INSERTED.updatedAt
     WHERE id = @id`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, current.id);
      request.input("role", sql.NVarChar(32), nextRole);
      request.input("isActive", sql.Bit, isActive);
      request.input("isOwner", sql.Bit, flags.isOwner);
      request.input("canManageAdmins", sql.Bit, flags.canManageAdmins);
    }
  );
  return rows[0] ? mapStaffUser(rows[0]) : null;
}
