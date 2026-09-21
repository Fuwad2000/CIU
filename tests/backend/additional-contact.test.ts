import { beforeEach, describe, expect, it, vi } from "vitest";

const query = vi.fn();

vi.mock("@backend/db/sql-query", () => ({
  query: (...args: unknown[]) => query(...args),
}));

describe("rememberContactPerson", () => {
  beforeEach(() => {
    query.mockReset();
  });

  it("inserts a unique contact-form sender and ignores a second write of the same email", async () => {
    const { CONTACT_FORM_ADDITIONAL_NOTE, rememberContactPerson } = await import(
      "@backend/outreach/additional"
    );

    query.mockResolvedValueOnce([{ id: "person-1" }]);
    await expect(
      rememberContactPerson({
        fullName: " Amina Hassan ",
        email: " Amina@Example.com ",
        phone: " 4165550100 ",
      })
    ).resolves.toBe(true);

    const binder = query.mock.calls[0]?.[1] as (request: {
      input: (name: string, type: unknown, value: unknown) => void;
    }) => void;
    const saved: Record<string, unknown> = {};
    binder({
      input(name, _type, value) {
        saved[name] = value;
      },
    });
    expect(saved).toEqual({
      fullName: "Amina Hassan",
      email: "amina@example.com",
      phone: "4165550100",
      notes: CONTACT_FORM_ADDITIONAL_NOTE,
    });

    query.mockResolvedValueOnce([]);
    await expect(
      rememberContactPerson({ fullName: "Amina H.", email: "amina@example.com" })
    ).resolves.toBe(false);
  });

  it("treats a unique-index race as already stored", async () => {
    query.mockRejectedValueOnce({ number: 2627, message: "Violation of UNIQUE KEY constraint" });
    const { rememberContactPerson } = await import("@backend/outreach/additional");
    await expect(
      rememberContactPerson({ fullName: "Amina Hassan", email: "amina@example.com" })
    ).resolves.toBe(false);
  });
});
