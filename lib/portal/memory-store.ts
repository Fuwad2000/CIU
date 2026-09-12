import { announcementContent } from "@/content/AnnouncementContent";
import { upcomingEvents } from "@/content/EventsContent";
import type {
  Announcement,
  AnnouncementInput,
  ClassRegistration,
  ClassRegistrationInput,
  ContactInput,
  ContactMessage,
  AdminHistoryEntry,
  AdminHistoryInput,
  PortalBackend,
  PortalEvent,
  PortalEventInput,
} from "@/lib/portal/types";

function nowIso() {
  return new Date().toISOString();
}

function newId() {
  return crypto.randomUUID();
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

const announcements: Announcement[] = announcementContent.items.map((message, index) => ({
  id: `announcement-${index + 1}`,
  message,
  active: true,
  createdAt: nowIso(),
  updatedAt: nowIso(),
}));

const events: PortalEvent[] = upcomingEvents.map((event) => ({
  ...event,
  createdAt: nowIso(),
  updatedAt: nowIso(),
}));

const contacts: ContactMessage[] = [];
const registrations: ClassRegistration[] = [];
const history: AdminHistoryEntry[] = [];

export const memoryStore: PortalBackend = {
  async listAnnouncements() {
    return clone(announcements).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async createAnnouncement(input: AnnouncementInput) {
    const record: Announcement = {
      id: newId(),
      message: input.message.trim(),
      href: input.href?.trim() || undefined,
      active: input.active ?? true,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    announcements.unshift(record);
    return clone(record);
  },
  async updateAnnouncement(id, input) {
    const current = announcements.find((item) => item.id === id);
    if (!current) return null;
    if (input.message !== undefined) current.message = input.message.trim();
    if (input.href !== undefined) current.href = input.href.trim() || undefined;
    if (input.active !== undefined) current.active = input.active;
    current.updatedAt = nowIso();
    return clone(current);
  },
  async deleteAnnouncement(id) {
    const index = announcements.findIndex((item) => item.id === id);
    if (index === -1) return false;
    announcements.splice(index, 1);
    return true;
  },

  async listEvents() {
    return clone(events).sort((a, b) => {
      const aDate = a.date ?? a.createdAt;
      const bDate = b.date ?? b.createdAt;
      return bDate.localeCompare(aDate);
    });
  },
  async createEvent(input: PortalEventInput) {
    const record: PortalEvent = {
      id: newId(),
      ...normalizeEventInput(input),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    events.unshift(record);
    return clone(record);
  },
  async updateEvent(id, input) {
    const current = events.find((item) => item.id === id);
    if (!current) return null;
    Object.assign(current, normalizeEventInput({ ...current, ...input }));
    current.updatedAt = nowIso();
    return clone(current);
  },
  async deleteEvent(id) {
    const index = events.findIndex((item) => item.id === id);
    if (index === -1) return false;
    events.splice(index, 1);
    return true;
  },

  async listContacts() {
    return clone(contacts).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async createContact(input: ContactInput) {
    const firstName = input.firstName.trim();
    const surname = input.surname.trim();
    const record: ContactMessage = {
      id: newId(),
      firstName,
      surname,
      name: `${firstName} ${surname}`.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      subject: input.subject.trim(),
      message: input.message.trim(),
      createdAt: nowIso(),
    };
    contacts.unshift(record);
    return clone(record);
  },

  async listRegistrations() {
    return clone(registrations).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async createRegistration(input: ClassRegistrationInput) {
    const record: ClassRegistration = {
      id: newId(),
      program: input.program,
      studentName: input.studentName.trim(),
      studentAge: input.studentAge?.trim() ?? "",
      grade: input.grade?.trim() || undefined,
      parentName: input.parentName?.trim() || undefined,
      email: input.email.trim(),
      phone: input.phone.trim(),
      notes: input.notes?.trim() ?? "",
      createdAt: nowIso(),
    };
    registrations.unshift(record);
    return clone(record);
  },

  async listHistory() {
    return clone(history).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async createHistory(input: AdminHistoryInput) {
    const record: AdminHistoryEntry = {
      id: newId(),
      adminEmail: input.adminEmail.trim().toLowerCase(),
      action: input.action,
      area: input.area,
      summary: input.summary.trim(),
      entityId: input.entityId,
      createdAt: nowIso(),
    };
    history.unshift(record);
    return clone(record);
  },
};

function normalizeEventInput(input: PortalEventInput): PortalEventInput {
  return {
    title: input.title.trim(),
    category: input.category,
    dateLabel: input.dateLabel.trim(),
    date: input.date?.trim() || undefined,
    time: input.time.trim(),
    location: input.location.trim(),
    description: input.description.trim(),
    tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
    href: input.href.trim(),
    buttonLabel: input.buttonLabel.trim() || "View Details",
    image: input.image?.trim() || undefined,
    recurring: Boolean(input.recurring),
    featured: Boolean(input.featured),
  };
}
