"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Users } from "lucide-react";
import { AdminColumnHeaders, AdminTableEmptyRow } from "@frontend/components/admin/AdminColumnHeader";
import AdminEmptyState from "@frontend/components/admin/AdminEmptyState";
import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import { adminFetch, formatDateTime } from "@frontend/portal/client";
import { useAdminTable } from "@frontend/portal/use-admin-table";
import type { ClassRegistration, RegistrationProgram } from "@shared/types";

const copy: Record<RegistrationProgram, { title: string; description: string }> = {
  quran: {
    title: "Quran class registrations",
    description: "Adult and all-learner sign-ups for Tuesday & Thursday Quran class. Sort or filter from a column heading.",
  },
  kids: {
    title: "Kids program registrations",
    description: "Weekend school sign-ups with grade and parent/guardian details. Sort or filter from a column heading.",
  },
};

type QuranKey = "registered" | "name" | "email" | "phone" | "notes";
type KidsKey = "registered" | "student" | "age" | "grade" | "parent" | "email" | "phone" | "notes";

const quranAccessors: Record<QuranKey, (item: ClassRegistration) => { sort: string; filter: string }> = {
  registered: (item) => ({ sort: item.createdAt, filter: formatDateTime(item.createdAt) }),
  name: (item) => ({ sort: item.studentName, filter: item.studentName }),
  email: (item) => ({ sort: item.email, filter: item.email }),
  phone: (item) => ({ sort: item.phone, filter: item.phone }),
  notes: (item) => ({ sort: item.notes || "", filter: item.notes || "" }),
};

const kidsAccessors: Record<KidsKey, (item: ClassRegistration) => { sort: string; filter: string }> = {
  registered: (item) => ({ sort: item.createdAt, filter: formatDateTime(item.createdAt) }),
  student: (item) => ({ sort: item.studentName, filter: item.studentName }),
  age: (item) => ({ sort: item.studentAge || "", filter: item.studentAge || "" }),
  grade: (item) => ({ sort: item.grade || "", filter: item.grade ? `Grade ${item.grade}` : "" }),
  parent: (item) => ({ sort: item.parentName || "", filter: item.parentName || "" }),
  email: (item) => ({ sort: item.email, filter: item.email }),
  phone: (item) => ({ sort: item.phone, filter: item.phone }),
  notes: (item) => ({ sort: item.notes || "", filter: item.notes || "" }),
};

const quranHeaders: Array<{ key: QuranKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "registered", label: "Registered", sort: true },
  { key: "name", label: "Name", sort: true, filter: true },
  { key: "email", label: "Email", sort: true, filter: true },
  { key: "phone", label: "Phone", filter: true },
  { key: "notes", label: "Notes" },
];

const kidsHeaders: Array<{ key: KidsKey; label: string; sort?: boolean; filter?: boolean }> = [
  { key: "registered", label: "Registered", sort: true },
  { key: "student", label: "Student", sort: true, filter: true },
  { key: "age", label: "Age", sort: true, filter: true },
  { key: "grade", label: "Grade", sort: true, filter: true },
  { key: "parent", label: "Parent / guardian", sort: true, filter: true },
  { key: "email", label: "Email", sort: true, filter: true },
  { key: "phone", label: "Phone", filter: true },
  { key: "notes", label: "Notes" },
];

function QuranTable({ items }: { items: ClassRegistration[] }) {
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(
    items,
    quranAccessors,
    "registered"
  );
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm xl:text-base">
        <thead className="border-b border-border bg-background text-muted">
          <tr>
            <AdminColumnHeaders
              columns={quranHeaders}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={toggleSort}
              filters={filters}
              onFilterChange={setFilter}
            />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? <AdminTableEmptyRow colSpan={quranHeaders.length} /> : null}
          {rows.map((item) => (
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
  );
}

function KidsTable({ items }: { items: ClassRegistration[] }) {
  const { rows, sortKey, sortDir, toggleSort, filters, setFilter } = useAdminTable(
    items,
    kidsAccessors,
    "registered"
  );
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm xl:text-base">
        <thead className="border-b border-border bg-background text-muted">
          <tr>
            <AdminColumnHeaders
              columns={kidsHeaders}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={toggleSort}
              filters={filters}
              onFilterChange={setFilter}
            />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? <AdminTableEmptyRow colSpan={kidsHeaders.length} /> : null}
          {rows.map((item) => (
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
  );
}

export default function AdminRegistrationsList({
  program,
}: {
  program: RegistrationProgram;
}) {
  const [items, setItems] = useState<ClassRegistration[]>([]);
  const [error, setError] = useState("");
  const content = copy[program];
  const programItems = useMemo(() => items.filter((item) => item.program === program), [items, program]);

  useEffect(() => {
    adminFetch<ClassRegistration[]>("/api/admin/registrations")
      .then(setItems)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div>
      <AdminPageHeader eyebrow="Registration" title={content.title} description={content.description} />
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            { id: "quran", href: "/admin/registrations/quran", label: "Quran class" },
            { id: "kids", href: "/admin/registrations/kids", label: "Kids program" },
          ] as const
        ).map((item) => {
          const selected = item.id === program;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "bg-brand text-white"
                  : "border border-border bg-background text-muted hover:border-brand/35 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {programItems.length === 0 ? (
          <AdminEmptyState
            icon={program === "quran" ? BookOpen : Users}
            title="No registrations yet"
            description={
              program === "quran"
                ? "When someone registers for Quran class, their details will appear here."
                : "When a family registers for the kids program, their details will appear here."
            }
          />
        ) : program === "quran" ? (
          <QuranTable items={programItems} />
        ) : (
          <KidsTable items={programItems} />
        )}
      </div>
    </div>
  );
}
