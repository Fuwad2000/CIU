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

export type NewsletterRecord = {
  id: string;
  fullName: string;
  email: string;
  source: "events" | "website";
  agreedToEmails: boolean;
  unsubscribedAt?: string;
  createdAt: string;
};
