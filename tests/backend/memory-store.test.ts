import { describe, expect, it } from "vitest";
import { memoryStore } from "@backend/stores/memory-store";

const eventInput = {
  title: "White-box event",
  category: "community" as const,
  dateLabel: "Saturday, September 19, 2026",
  date: "2026-09-19",
  time: "7:00 PM",
  location: "CIU",
  description: "Store CRUD test",
  tags: ["test"],
  href: "/Events",
  buttonLabel: "View Details",
  recurring: false,
  featured: false,
};

describe("memory store CRUD", () => {
  it("creates, reads, updates, and deletes announcements", async () => {
    const created = await memoryStore.createAnnouncement({
      message: "White-box ticker",
      href: "/Events",
      active: true,
    });
    expect(created.id).toBeTruthy();
    expect((await memoryStore.listAnnouncements()).some((item) => item.id === created.id)).toBe(true);

    const updated = await memoryStore.updateAnnouncement(created.id, { active: false, message: "Hidden ticker" });
    expect(updated?.active).toBe(false);
    expect(updated?.message).toBe("Hidden ticker");

    expect(await memoryStore.deleteAnnouncement(created.id)).toBe(true);
    expect(await memoryStore.updateAnnouncement(created.id, { active: true })).toBeNull();
    expect(await memoryStore.deleteAnnouncement(created.id)).toBe(false);
  });

  it("creates, reads, updates, and deletes events", async () => {
    const created = await memoryStore.createEvent(eventInput);
    expect((await memoryStore.listEvents()).some((item) => item.id === created.id)).toBe(true);

    const updated = await memoryStore.updateEvent(created.id, { featured: true, title: "Updated event" });
    expect(updated?.featured).toBe(true);
    expect(updated?.title).toBe("Updated event");

    expect(await memoryStore.deleteEvent(created.id)).toBe(true);
    expect(await memoryStore.deleteEvent(created.id)).toBe(false);
  });

  it("creates contacts, registrations, and history", async () => {
    const contact = await memoryStore.createContact({
      firstName: "Amina",
      surname: "Hassan",
      email: "amina@example.com",
      phone: "4165550100",
      subject: "Hall",
      message: "Please call",
    });
    expect(contact.name).toBe("Amina Hassan");
    expect((await memoryStore.listContacts()).some((item) => item.id === contact.id)).toBe(true);

    const registration = await memoryStore.createRegistration({
      program: "quran",
      studentName: "Zayd",
      email: "zayd@example.com",
      phone: "4165550101",
      notes: "White-box",
    });
    expect(registration.program).toBe("quran");
    expect((await memoryStore.listRegistrations()).some((item) => item.id === registration.id)).toBe(true);

    const history = await memoryStore.createHistory({
      adminEmail: " Staff@CIUCanada.ca ",
      action: "created",
      area: "events",
      summary: "Added event",
      entityId: "00000000-0000-0000-0000-000000000001",
    });
    expect(history.adminEmail).toBe("staff@ciucanada.ca");
    expect((await memoryStore.listHistory()).some((item) => item.id === history.id)).toBe(true);
  });
});
