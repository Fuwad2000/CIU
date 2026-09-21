import { describe, expect, it } from "vitest";
import {
  applyAdminTable,
  compareColumnValues,
  isColumnFilterActive,
  matchesColumnFilter,
} from "@frontend/portal/admin-filters";

describe("column filters", () => {
  it("supports contains, equals, and the other match options", () => {
    expect(matchesColumnFilter("Updated", { op: "contains", value: "date" })).toBe(true);
    expect(matchesColumnFilter("Updated", { op: "equals", value: "updated" })).toBe(true);
    expect(matchesColumnFilter("Updated", { op: "equals", value: "created" })).toBe(false);
    expect(matchesColumnFilter("Announcements", { op: "startsWith", value: "Ann" })).toBe(true);
    expect(matchesColumnFilter("Announcements", { op: "endsWith", value: "ments" })).toBe(true);
    expect(matchesColumnFilter("Events", { op: "notContains", value: "user" })).toBe(true);
    expect(matchesColumnFilter("", { op: "empty", value: "" })).toBe(true);
    expect(matchesColumnFilter("Events", { op: "notEmpty", value: "" })).toBe(true);
    expect(isColumnFilterActive({ op: "contains", value: "" })).toBe(false);
    expect(isColumnFilterActive({ op: "empty", value: "" })).toBe(true);
  });

  it("filters and sorts rows by the selected column", () => {
    const rows = [
      { name: "Zainab", service: "Events" },
      { name: "Amina", service: "Announcements" },
      { name: "Bilal", service: "Events" },
    ];
    const columns = {
      name: (item: (typeof rows)[number]) => ({ sort: item.name, filter: item.name }),
      service: (item: (typeof rows)[number]) => ({ sort: item.service, filter: item.service }),
    };
    const filtered = applyAdminTable(rows, columns, "name", "asc", {
      service: { op: "equals", value: "Events" },
    });
    expect(filtered.map((item) => item.name)).toEqual(["Bilal", "Zainab"]);
    expect(compareColumnValues("created", "updated", "asc")).toBeLessThan(0);
  });
});
