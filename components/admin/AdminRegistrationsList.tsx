"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, Users } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminFetch, formatDateTime } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";
import type { ClassRegistration, RegistrationProgram } from "@/lib/portal/types";

const copy: Record<
  RegistrationProgram,
  { title: string; description: string; search: string }
> = {
  quran: {
    title: "Quran class registrations",
    description: "Adult and all-learner sign-ups for Tuesday & Thursday Quran class.",
    search: "Search name, email, or phone",
  },
  kids: {
    title: "Kids program registrations",
    description: "Weekend school sign-ups with grade and parent/guardian details.",
    search: "Search student, parent, or email",
  },
};

export default function AdminRegistrationsList({
  program,
}: {
  program: RegistrationProgram;
}) {
  const [items, setItems] = useState<ClassRegistration[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [error, setError] = useState("");
  const content = copy[program];

  useEffect(() => {
    adminFetch<ClassRegistration[]>("/api/admin/registrations")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = items.filter((item) => {
      if (item.program !== program) return false;
      return [item.studentName, item.parentName, item.email, item.phone, item.grade, item.notes]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
    next.sort((a, b) =>
      sort === "newest"
        ? b.createdAt.localeCompare(a.createdAt)
        : a.createdAt.localeCompare(b.createdAt)
    );
    return next;
  }, [items, program, query, sort]);

  const hasRecords = items.some((item) => item.program === program);

  return (
    <div>
      <AdminPageHeader eyebrow="Registrations" title={content.title} description={content.description} />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={content.search}
          className={formInputClassName}
        />
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as "newest" | "oldest")}
          className={formInputClassName}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {filtered.length === 0 ? (
          <AdminEmptyState
            icon={hasRecords ? Search : program === "quran" ? BookOpen : Users}
            title={hasRecords ? "No matching registrations" : "No registrations yet"}
            description={
              hasRecords
                ? "Try a different name, email, or phone."
                : program === "quran"
                  ? "When someone registers for Quran class, their details will appear here."
                  : "When a family registers for the kids program, their details will appear here."
            }
          />
        ) : program === "quran" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Registered</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 text-muted">{formatDateTime(item.createdAt)}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.studentName}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3 text-muted">{item.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Registered</th>
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Age</th>
                  <th className="px-4 py-3 font-medium">Grade</th>
                  <th className="px-4 py-3 font-medium">Parent / guardian</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 text-muted">{formatDateTime(item.createdAt)}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.studentName}</td>
                    <td className="px-4 py-3">{item.studentAge || "—"}</td>
                    <td className="px-4 py-3">{item.grade ? `Grade ${item.grade}` : "—"}</td>
                    <td className="px-4 py-3">{item.parentName || "—"}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3 text-muted">{item.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
