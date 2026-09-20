import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DefaultAzureCredential } from "@azure/identity";
import sql from "mssql";

for (const file of [".env.local", ".env"]) {
  try {
    const text = readFileSync(resolve(process.cwd(), file), "utf8");
    for (const line of text.split("\n")) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim();
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    // Optional env file.
  }
}

const server = process.env.SQL_SERVER;
const database = process.env.SQL_DATABASE;
const port = Number(process.env.SQL_PORT ?? "1433");
const stamp = Date.now();
const tag = `ciu-crud-test-${stamp}`;

const results = [];

function record(table, op, ok, detail = "") {
  results.push({ table, op, ok, detail });
  const mark = ok ? "PASS" : "FAIL";
  console.log(`${mark.padEnd(4)} ${table.padEnd(22)} ${op.padEnd(8)} ${detail}`);
}

async function runOp(table, op, fn) {
  try {
    await fn();
    record(table, op, true);
  } catch (error) {
    record(table, op, false, error instanceof Error ? error.message : String(error));
  }
}

async function connect() {
  const credential = new DefaultAzureCredential();
  const token = await credential.getToken("https://database.windows.net/.default");
  if (!token?.token) {
    throw new Error("No Entra token. Run `az login` first.");
  }

  const pool = new sql.ConnectionPool({
    server,
    database,
    port,
    options: {
      encrypt: process.env.SQL_ENCRYPT !== "false",
      trustServerCertificate: false,
      enableArithAbort: true,
    },
    authentication: {
      type: "azure-active-directory-access-token",
      options: { token: token.token },
    },
  });
  await pool.connect();
  return pool;
}

async function scalar(pool, query, bind) {
  const request = pool.request();
  bind?.(request);
  const result = await request.query(query);
  return result.recordset[0];
}

async function exec(pool, query, bind) {
  const request = pool.request();
  bind?.(request);
  return request.query(query);
}

async function main() {
  if (!server || !database) {
    throw new Error("SQL_SERVER and SQL_DATABASE must be set.");
  }

  console.log(`Testing CRUD on ${server}/${database}\n`);
  const pool = await connect();
  console.log("PASS connect           auth     Entra access token\n");

  let userId;

  await runOp("users", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.users (email, displayName, role, isActive, entraObjectId)
       OUTPUT INSERTED.id
       VALUES (@email, @displayName, 'regularadmin', 1, @oid)`,
      (request) => {
        request.input("email", sql.NVarChar(256), `${tag}@ciucanada.test`);
        request.input("displayName", sql.NVarChar(200), tag);
        request.input("oid", sql.NVarChar(64), `test-${stamp}`);
      }
    );
    userId = row.id;
  });
  await runOp("users", "read", async () => {
    const row = await scalar(pool, `SELECT id, email FROM dbo.users WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, userId);
    });
    if (!row) throw new Error("Inserted user not found.");
  });
  await runOp("users", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.users SET displayName = @name, updatedAt = SYSUTCDATETIME() WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, userId);
        request.input("name", sql.NVarChar(200), `${tag}-updated`);
      }
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No user row updated.");
  });

  let announcementId;
  await runOp("announcements", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.announcements (message, href, active)
       OUTPUT INSERTED.id VALUES (@message, @href, 1)`,
      (request) => {
        request.input("message", sql.NVarChar(500), tag);
        request.input("href", sql.NVarChar(500), "/Events");
      }
    );
    announcementId = row.id;
  });
  await runOp("announcements", "read", async () => {
    const row = await scalar(pool, `SELECT id FROM dbo.announcements WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, announcementId);
    });
    if (!row) throw new Error("Inserted announcement not found.");
  });
  await runOp("announcements", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.announcements SET active = 0, updatedAt = SYSUTCDATETIME() WHERE id = @id`,
      (request) => request.input("id", sql.UniqueIdentifier, announcementId)
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No announcement row updated.");
  });

  let eventId;
  await runOp("events", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.events
         (title, category, dateLabel, [date], [time], location, description, tags, href, buttonLabel, recurring, featured)
       OUTPUT INSERTED.id
       VALUES (@title, 'community', @dateLabel, @date, @time, @location, @description, @tags, @href, 'View Details', 0, 0)`,
      (request) => {
        request.input("title", sql.NVarChar(200), tag);
        request.input("dateLabel", sql.NVarChar(120), "Test date");
        request.input("date", sql.Date, "2026-09-19");
        request.input("time", sql.NVarChar(80), "7:00 PM");
        request.input("location", sql.NVarChar(200), "CIU");
        request.input("description", sql.NVarChar(sql.MAX), "CRUD test event");
        request.input("tags", sql.NVarChar(sql.MAX), JSON.stringify(["test"]));
        request.input("href", sql.NVarChar(500), "/Events");
      }
    );
    eventId = row.id;
  });
  await runOp("events", "read", async () => {
    const row = await scalar(pool, `SELECT id FROM dbo.events WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, eventId);
    });
    if (!row) throw new Error("Inserted event not found.");
  });
  await runOp("events", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.events SET featured = 1, updatedAt = SYSUTCDATETIME() WHERE id = @id`,
      (request) => request.input("id", sql.UniqueIdentifier, eventId)
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No event row updated.");
  });

  let contactId;
  await runOp("contacts", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.contacts (firstName, surname, name, email, phone, subject, message)
       OUTPUT INSERTED.id
       VALUES (@firstName, @surname, @name, @email, @phone, @subject, @message)`,
      (request) => {
        request.input("firstName", sql.NVarChar(100), "Test");
        request.input("surname", sql.NVarChar(100), "User");
        request.input("name", sql.NVarChar(200), "Test User");
        request.input("email", sql.NVarChar(256), `${tag}@contact.test`);
        request.input("phone", sql.NVarChar(40), "905-555-0100");
        request.input("subject", sql.NVarChar(200), tag);
        request.input("message", sql.NVarChar(sql.MAX), "CRUD test contact");
      }
    );
    contactId = row.id;
  });
  await runOp("contacts", "read", async () => {
    const row = await scalar(pool, `SELECT id FROM dbo.contacts WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, contactId);
    });
    if (!row) throw new Error("Inserted contact not found.");
  });
  await runOp("contacts", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.contacts SET subject = @subject WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, contactId);
        request.input("subject", sql.NVarChar(200), `${tag}-updated`);
      }
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No contact row updated.");
  });

  let registrationId;
  await runOp("registrations", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.registrations (program, studentName, email, phone, notes)
       OUTPUT INSERTED.id
       VALUES ('quran', @studentName, @email, @phone, @notes)`,
      (request) => {
        request.input("studentName", sql.NVarChar(200), tag);
        request.input("email", sql.NVarChar(256), `${tag}@reg.test`);
        request.input("phone", sql.NVarChar(40), "416-555-0101");
        request.input("notes", sql.NVarChar(sql.MAX), "CRUD test");
      }
    );
    registrationId = row.id;
  });
  await runOp("registrations", "read", async () => {
    const row = await scalar(pool, `SELECT id FROM dbo.registrations WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, registrationId);
    });
    if (!row) throw new Error("Inserted registration not found.");
  });
  await runOp("registrations", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.registrations SET notes = @notes WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, registrationId);
        request.input("notes", sql.NVarChar(sql.MAX), "CRUD test updated");
      }
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No registration row updated.");
  });

  let memberId;
  await runOp("members", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.members (fullName, email, membershipType, emailTopics, agreedToEmails, source)
       OUTPUT INSERTED.id
       VALUES (@fullName, @email, 'individual', @topics, 1, 'membership')`,
      (request) => {
        request.input("fullName", sql.NVarChar(200), tag);
        request.input("email", sql.NVarChar(256), `${tag}@member.test`);
        request.input("topics", sql.NVarChar(sql.MAX), JSON.stringify(["events"]));
      }
    );
    memberId = row.id;
  });
  await runOp("members", "read", async () => {
    const row = await scalar(pool, `SELECT id FROM dbo.members WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, memberId);
    });
    if (!row) throw new Error("Inserted member not found.");
  });
  await runOp("members", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.members SET city = @city WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, memberId);
        request.input("city", sql.NVarChar(100), "Mississauga");
      }
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No member row updated.");
  });

  let volunteerId;
  await runOp("volunteers", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.volunteers (fullName, email, phone, ageGroup, roles, availability, agreement)
       OUTPUT INSERTED.id
       VALUES (@fullName, @email, @phone, 'adult', @roles, 'flexible', 1)`,
      (request) => {
        request.input("fullName", sql.NVarChar(200), tag);
        request.input("email", sql.NVarChar(256), `${tag}@volunteer.test`);
        request.input("phone", sql.NVarChar(40), "905-555-0102");
        request.input("roles", sql.NVarChar(sql.MAX), JSON.stringify(["admin-support"]));
      }
    );
    volunteerId = row.id;
  });
  await runOp("volunteers", "read", async () => {
    const row = await scalar(pool, `SELECT id FROM dbo.volunteers WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, volunteerId);
    });
    if (!row) throw new Error("Inserted volunteer not found.");
  });
  await runOp("volunteers", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.volunteers SET availability = 'weekends' WHERE id = @id`,
      (request) => request.input("id", sql.UniqueIdentifier, volunteerId)
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No volunteer row updated.");
  });

  let newsletterId;
  await runOp("newsletter", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.newsletter (fullName, email, source, agreedToEmails)
       OUTPUT INSERTED.id
       VALUES (@fullName, @email, 'events', 1)`,
      (request) => {
        request.input("fullName", sql.NVarChar(200), tag);
        request.input("email", sql.NVarChar(256), `${tag}@newsletter.test`);
      }
    );
    newsletterId = row.id;
  });
  await runOp("newsletter", "read", async () => {
    const row = await scalar(pool, `SELECT id FROM dbo.newsletter WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, newsletterId);
    });
    if (!row) throw new Error("Inserted newsletter row not found.");
  });
  await runOp("newsletter", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.newsletter SET fullName = @name WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, newsletterId);
        request.input("name", sql.NVarChar(200), `${tag}-updated`);
      }
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No newsletter row updated.");
  });

  let outreachCampaignId;
  await runOp("outreach_campaigns", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.outreach_campaigns (type, subject, content, status, audiences, eventId, createdBy)
       OUTPUT INSERTED.id
       VALUES ('marketing', @subject, @content, 'draft', @audiences, @eventId, @createdBy)`,
      (request) => {
        request.input("subject", sql.NVarChar(200), tag);
        request.input("content", sql.NVarChar(sql.MAX), "CRUD test campaign");
        request.input("audiences", sql.NVarChar(sql.MAX), JSON.stringify(["quran", "kids"]));
        request.input("eventId", sql.UniqueIdentifier, eventId ?? null);
        request.input("createdBy", sql.UniqueIdentifier, userId);
      }
    );
    outreachCampaignId = row.id;
  });
  await runOp("outreach_campaigns", "read", async () => {
    const row = await scalar(pool, `SELECT id, type, status FROM dbo.outreach_campaigns WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, outreachCampaignId);
    });
    if (!row) throw new Error("Inserted outreach campaign not found.");
  });
  await runOp("outreach_campaigns", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.outreach_campaigns
       SET subject = @subject, updatedAt = SYSUTCDATETIME()
       WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, outreachCampaignId);
        request.input("subject", sql.NVarChar(200), `${tag}-updated`);
      }
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No outreach campaign row updated.");
  });

  let outreachRecipientId;
  await runOp("outreach_recipients", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.outreach_campaign_recipients (campaignId, email, displayName, audience, deliveryStatus)
       OUTPUT INSERTED.id
       VALUES (@campaignId, @email, @displayName, 'quran', 'pending')`,
      (request) => {
        request.input("campaignId", sql.UniqueIdentifier, outreachCampaignId);
        request.input("email", sql.NVarChar(256), `${tag}@quran.test`);
        request.input("displayName", sql.NVarChar(200), tag);
      }
    );
    outreachRecipientId = row.id;
  });
  await runOp("outreach_recipients", "read", async () => {
    const row = await scalar(
      pool,
      `SELECT id FROM dbo.outreach_campaign_recipients WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, outreachRecipientId);
      }
    );
    if (!row) throw new Error("Inserted outreach recipient not found.");
  });
  await runOp("outreach_recipients", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.outreach_campaign_recipients SET deliveryStatus = 'skipped' WHERE id = @id`,
      (request) => request.input("id", sql.UniqueIdentifier, outreachRecipientId)
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No outreach recipient row updated.");
  });

  let historyId;
  await runOp("history", "create", async () => {
    const row = await scalar(
      pool,
      `INSERT INTO dbo.history (userId, adminEmail, action, area, summary, entityId)
       OUTPUT INSERTED.id
       VALUES (@userId, @email, 'created', 'users', @summary, @entityId)`,
      (request) => {
        request.input("userId", sql.UniqueIdentifier, userId ?? null);
        request.input("email", sql.NVarChar(256), `${tag}@ciucanada.test`);
        request.input("summary", sql.NVarChar(500), `CRUD test ${tag}`);
        request.input("entityId", sql.UniqueIdentifier, userId ?? null);
      }
    );
    historyId = row.id;
  });
  await runOp("history", "read", async () => {
    const row = await scalar(pool, `SELECT id FROM dbo.history WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, historyId);
    });
    if (!row) throw new Error("Inserted history not found.");
  });
  await runOp("history", "update", async () => {
    const result = await exec(
      pool,
      `UPDATE dbo.history SET summary = @summary WHERE id = @id`,
      (request) => {
        request.input("id", sql.UniqueIdentifier, historyId);
        request.input("summary", sql.NVarChar(500), `CRUD test updated ${tag}`);
      }
    );
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No history row updated.");
  });

  await runOp("history", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.history WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, historyId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No history row deleted.");
  });
  await runOp("outreach_recipients", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.outreach_campaign_recipients WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, outreachRecipientId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No outreach recipient row deleted.");
  });
  await runOp("outreach_campaigns", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.outreach_campaigns WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, outreachCampaignId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No outreach campaign row deleted.");
  });
  await runOp("newsletter", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.newsletter WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, newsletterId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No newsletter row deleted.");
  });
  await runOp("volunteers", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.volunteers WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, volunteerId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No volunteer row deleted.");
  });
  await runOp("members", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.members WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, memberId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No member row deleted.");
  });
  await runOp("registrations", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.registrations WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, registrationId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No registration row deleted.");
  });
  await runOp("contacts", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.contacts WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, contactId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No contact row deleted.");
  });
  await runOp("events", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.events WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, eventId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No event row deleted.");
  });
  await runOp("announcements", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.announcements WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, announcementId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No announcement row deleted.");
  });
  await runOp("users", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.users WHERE id = @id`, (request) => {
      request.input("id", sql.UniqueIdentifier, userId);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("No user row deleted.");
  });

  const baseUrl = process.env.CRUD_API_BASE ?? "http://localhost:3000";
  console.log(`\nTesting HTTP endpoints on ${baseUrl}\n`);

  async function postJson(path, body) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(`${response.status} ${payload.error || JSON.stringify(payload)}`);
    }
    return payload;
  }

  async function getJson(path) {
    const response = await fetch(`${baseUrl}${path}`);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(`${response.status} ${payload.error || JSON.stringify(payload)}`);
    }
    return payload;
  }

  const httpTag = `${tag}-http`;
  const httpIds = {};

  await runOp("/api/events", "read", async () => {
    const payload = await getJson("/api/events");
    if (!Array.isArray(payload)) throw new Error("Events endpoint did not return a list.");
  });
  await runOp("/api/announcements", "read", async () => {
    const payload = await getJson("/api/announcements");
    if (!Array.isArray(payload)) throw new Error("Announcements endpoint did not return a list.");
  });
  await runOp("/api/members", "create", async () => {
    const payload = await postJson("/api/members", {
      fullName: httpTag,
      email: `${httpTag}@member.test`,
      membershipType: "individual",
      emailTopics: ["events"],
      agreement: true,
      source: "membership",
    });
    httpIds.member = payload.id;
  });
  await runOp("/api/volunteers", "create", async () => {
    const payload = await postJson("/api/volunteers", {
      fullName: httpTag,
      email: `${httpTag}@volunteer.test`,
      phone: "905-555-0199",
      ageGroup: "adult",
      roles: ["admin-support"],
      availability: "flexible",
      agreement: true,
    });
    httpIds.volunteer = payload.id;
  });
  await runOp("/api/newsletter", "create", async () => {
    const payload = await postJson("/api/newsletter", {
      fullName: httpTag,
      email: `${httpTag}@newsletter.test`,
      source: "events",
      agreement: true,
    });
    httpIds.newsletter = payload.id;
  });
  await runOp("/api/contact", "create", async () => {
    const payload = await postJson("/api/contact", {
      firstName: "Test",
      surname: "User",
      email: `${httpTag}@contact.test`,
      phone: "905-555-0188",
      subject: httpTag,
      message: "HTTP CRUD test",
    });
    httpIds.contact = payload.id;
  });
  await runOp("/api/registrations", "create", async () => {
    const payload = await postJson("/api/registrations", {
      program: "quran",
      studentName: httpTag,
      email: `${httpTag}@reg.test`,
      phone: "416-555-0177",
      notes: "HTTP CRUD test",
    });
    httpIds.registration = payload.id;
  });

  await runOp("/api/members", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.members WHERE email = @email`, (request) => {
      request.input("email", sql.NVarChar(256), `${httpTag}@member.test`);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("HTTP member row not cleaned up.");
  });
  await runOp("/api/volunteers", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.volunteers WHERE email = @email`, (request) => {
      request.input("email", sql.NVarChar(256), `${httpTag}@volunteer.test`);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("HTTP volunteer row not cleaned up.");
  });
  await runOp("/api/newsletter", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.newsletter WHERE email = @email`, (request) => {
      request.input("email", sql.NVarChar(256), `${httpTag}@newsletter.test`);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("HTTP newsletter row not cleaned up.");
  });
  await runOp("/api/contact", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.contacts WHERE email = @email`, (request) => {
      request.input("email", sql.NVarChar(256), `${httpTag}@contact.test`);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("HTTP contact row not cleaned up.");
  });
  await runOp("/api/registrations", "delete", async () => {
    const result = await exec(pool, `DELETE FROM dbo.registrations WHERE email = @email`, (request) => {
      request.input("email", sql.NVarChar(256), `${httpTag}@reg.test`);
    });
    if ((result.rowsAffected[0] ?? 0) !== 1) throw new Error("HTTP registration row not cleaned up.");
  });

  await pool.close();

  const passed = results.filter((item) => item.ok).length;
  const failed = results.filter((item) => !item.ok).length;
  console.log(`\n${passed} passed, ${failed} failed, ${results.length} total`);
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error("\nCould not run CRUD tests:");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
