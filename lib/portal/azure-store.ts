import { azureApiBaseUrl, azureApiKey } from "@/lib/portal/env";
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

async function azureFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  const key = azureApiKey();
  if (key) {
    headers.set("Authorization", `Bearer ${key}`);
    headers.set("x-api-key", key);
  }

  const response = await fetch(`${azureApiBaseUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Azure API ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const azureStore: PortalBackend = {
  listAnnouncements: () => azureFetch<Announcement[]>("/announcements"),
  createAnnouncement: (input: AnnouncementInput) =>
    azureFetch<Announcement>("/announcements", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  updateAnnouncement: (id, input) =>
    azureFetch<Announcement | null>(`/announcements/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  deleteAnnouncement: async (id) => {
    await azureFetch(`/announcements/${id}`, { method: "DELETE" });
    return true;
  },

  listEvents: () => azureFetch<PortalEvent[]>("/events"),
  createEvent: (input: PortalEventInput) =>
    azureFetch<PortalEvent>("/events", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  updateEvent: (id, input) =>
    azureFetch<PortalEvent | null>(`/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  deleteEvent: async (id) => {
    await azureFetch(`/events/${id}`, { method: "DELETE" });
    return true;
  },

  listContacts: () => azureFetch<ContactMessage[]>("/contacts"),
  createContact: (input: ContactInput) =>
    azureFetch<ContactMessage>("/contacts", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  listRegistrations: () => azureFetch<ClassRegistration[]>("/registrations"),
  createRegistration: (input: ClassRegistrationInput) =>
    azureFetch<ClassRegistration>("/registrations", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  listHistory: () => azureFetch<AdminHistoryEntry[]>("/history"),
  createHistory: (input: AdminHistoryInput) =>
    azureFetch<AdminHistoryEntry>("/history", {
      method: "POST",
      body: JSON.stringify(input),
    }),
};
