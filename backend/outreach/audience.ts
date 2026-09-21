import {
  emptyAudienceCounts,
  mergeAudienceRecipients,
  type OutreachAudienceId,
  type OutreachPreview,
  type OutreachResolvedRecipient,
} from "@shared/outreach";
import { query } from "@backend/db/sql-query";

type NamedEmail = { email: string; displayName: string };

async function listNewsletterAudience(): Promise<NamedEmail[]> {
  const rows = await query<NamedEmail>(
    `SELECT email, fullName AS displayName
     FROM dbo.newsletter
     WHERE unsubscribedAt IS NULL
       AND agreedToEmails = 1
     ORDER BY createdAt DESC`
  );
  return rows;
}

async function listMembersAudience(): Promise<NamedEmail[]> {
  const rows = await query<NamedEmail>(
    `SELECT email, fullName AS displayName
     FROM dbo.members
     WHERE source = 'membership'
       AND unsubscribedAt IS NULL
     ORDER BY createdAt DESC`
  );
  return rows;
}

async function listVolunteersAudience(): Promise<NamedEmail[]> {
  const rows = await query<NamedEmail>(
    `SELECT email, fullName AS displayName
     FROM dbo.volunteers
     ORDER BY createdAt DESC`
  );
  return rows;
}

async function listAdminsAudience(): Promise<NamedEmail[]> {
  const rows = await query<NamedEmail>(
    `SELECT email, displayName
     FROM dbo.users
     WHERE isActive = 1
     ORDER BY displayName ASC`
  );
  return rows;
}

async function listClassAudience(program: "quran" | "kids"): Promise<NamedEmail[]> {
  const rows = await query<NamedEmail>(
    `SELECT email,
            COALESCE(NULLIF(LTRIM(RTRIM(parentName)), ''), studentName) AS displayName
     FROM dbo.registrations
     WHERE program = @program
     ORDER BY createdAt DESC`,
    (request) => {
      request.input("program", program);
    }
  );
  return rows;
}

async function listContactsAudience(): Promise<NamedEmail[]> {
  const rows = await query<NamedEmail>(
    `SELECT email,
            COALESCE(NULLIF(LTRIM(RTRIM(name)), ''), CONCAT(firstName, ' ', surname)) AS displayName
     FROM dbo.contacts
     ORDER BY createdAt DESC`
  );
  return rows;
}

async function listAdditionalAudience(): Promise<NamedEmail[]> {
  const rows = await query<NamedEmail>(
    `SELECT email, fullName AS displayName
     FROM dbo.outreach_additional
     ORDER BY createdAt DESC`
  );
  return rows;
}

const providers: Record<OutreachAudienceId, () => Promise<NamedEmail[]>> = {
  newsletter: listNewsletterAudience,
  members: listMembersAudience,
  volunteers: listVolunteersAudience,
  contacts: listContactsAudience,
  additional: listAdditionalAudience,
  quran: () => listClassAudience("quran"),
  kids: () => listClassAudience("kids"),
  admins: listAdminsAudience,
};

export async function resolveAudience(id: OutreachAudienceId): Promise<NamedEmail[]> {
  return providers[id]();
}

export async function resolveAudiences(ids: OutreachAudienceId[]): Promise<{
  recipients: OutreachResolvedRecipient[];
  preview: OutreachPreview;
}> {
  const countsByAudience = emptyAudienceCounts();

  const groups: Array<{ audience: OutreachAudienceId; recipients: NamedEmail[] }> = [];
  for (const id of ids) {
    const recipients = await resolveAudience(id);
    countsByAudience[id] = recipients.filter((item) => item.email.trim()).length;
    groups.push({ audience: id, recipients });
  }

  const merged = mergeAudienceRecipients(groups);
  return {
    recipients: merged,
    preview: {
      audiences: ids,
      uniqueCount: merged.length,
      countsByAudience,
    },
  };
}

export async function audienceEligibleCounts(ids: OutreachAudienceId[]) {
  const counts = emptyAudienceCounts();
  await Promise.all(
    ids.map(async (id) => {
      counts[id] = (await resolveAudience(id)).length;
    })
  );
  return counts;
}
