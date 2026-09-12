export type Announcement = {
  id: string;
  message: string;
  href?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AnnouncementInput = {
  message: string;
  href?: string;
  active?: boolean;
};

export type PortalEventCategory =
  | "education"
  | "youth"
  | "family"
  | "community"
  | "spiritual"
  | "volunteer";

export type PortalEvent = {
  id: string;
  title: string;
  category: PortalEventCategory;
  dateLabel: string;
  date?: string;
  time: string;
  location: string;
  description: string;
  tags: string[];
  href: string;
  buttonLabel: string;
  image?: string;
  recurring?: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PortalEventInput = {
  title: string;
  category: PortalEventCategory;
  dateLabel: string;
  date?: string;
  time: string;
  location: string;
  description: string;
  tags: string[];
  href: string;
  buttonLabel: string;
  image?: string;
  recurring?: boolean;
  featured?: boolean;
};

export type ContactMessage = {
  id: string;
  firstName: string;
  surname: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type ContactInput = {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type RegistrationProgram = "quran" | "kids";

export type ClassRegistration = {
  id: string;
  program: RegistrationProgram;
  studentName: string;
  studentAge: string;
  grade?: string;
  parentName?: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
};

export type ClassRegistrationInput = {
  program: RegistrationProgram;
  studentName: string;
  studentAge?: string;
  grade?: string;
  parentName?: string;
  email: string;
  phone: string;
  notes?: string;
};

export type AdminHistoryAction =
  | "authenticated"
  | "signed-out"
  | "created"
  | "updated"
  | "deleted";

export type AdminHistoryArea =
  | "session"
  | "announcements"
  | "events"
  | "contacts"
  | "registrations";

export type AdminHistoryEntry = {
  id: string;
  adminEmail: string;
  action: AdminHistoryAction;
  area: AdminHistoryArea;
  summary: string;
  entityId?: string;
  createdAt: string;
};

export type AdminHistoryInput = {
  adminEmail: string;
  action: AdminHistoryAction;
  area: AdminHistoryArea;
  summary: string;
  entityId?: string;
};

export type PortalBackend = {
  listAnnouncements: () => Promise<Announcement[]>;
  createAnnouncement: (input: AnnouncementInput) => Promise<Announcement>;
  updateAnnouncement: (id: string, input: Partial<AnnouncementInput>) => Promise<Announcement | null>;
  deleteAnnouncement: (id: string) => Promise<boolean>;

  listEvents: () => Promise<PortalEvent[]>;
  createEvent: (input: PortalEventInput) => Promise<PortalEvent>;
  updateEvent: (id: string, input: Partial<PortalEventInput>) => Promise<PortalEvent | null>;
  deleteEvent: (id: string) => Promise<boolean>;

  listContacts: () => Promise<ContactMessage[]>;
  createContact: (input: ContactInput) => Promise<ContactMessage>;

  listRegistrations: () => Promise<ClassRegistration[]>;
  createRegistration: (input: ClassRegistrationInput) => Promise<ClassRegistration>;

  listHistory: () => Promise<AdminHistoryEntry[]>;
  createHistory: (input: AdminHistoryInput) => Promise<AdminHistoryEntry>;
};
