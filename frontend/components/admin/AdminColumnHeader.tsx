"use client";

import { ChevronDown, ChevronUp, Funnel } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formInputClassName } from "@frontend/lib/formStyles";
import {
  ADMIN_COLUMN_OPS,
  emptyColumnFilter,
  isColumnFilterActive,
  type AdminColumnFilter,
  type AdminSortDir,
} from "@frontend/portal/admin-filters";

export function AdminTableEmptyRow({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center text-muted">
        No matching rows. Clear a column filter or try a different match.
      </td>
    </tr>
  );
}

export type AdminColumnConfig<K extends string> = {
  key: K;
  label: string;
  sort?: boolean;
  filter?: boolean;
};

export function AdminColumnHeaders<K extends string>({
  columns,
  sortKey,
  sortDir,
  onSort,
  filters,
  onFilterChange,
}: {
  columns: Array<AdminColumnConfig<K>>;
  sortKey: K;
  sortDir: AdminSortDir;
  onSort: (key: K) => void;
  filters: Partial<Record<K, AdminColumnFilter>>;
  onFilterChange: (key: K, filter: AdminColumnFilter | undefined) => void;
}) {
  return (
    <>
      {columns.map((column) => (
        <AdminColumnHeader
          key={column.key}
          label={column.label}
          sortDir={column.sort && sortKey === column.key ? sortDir : null}
          onSort={column.sort ? () => onSort(column.key) : undefined}
          filter={column.filter ? filters[column.key] : undefined}
          onFilterChange={column.filter ? (next) => onFilterChange(column.key, next) : undefined}
        />
      ))}
    </>
  );
}

export default function AdminColumnHeader({
  label,
  sortDir,
  onSort,
  filter,
  onFilterChange,
}: {
  label: string;
  sortDir?: AdminSortDir | null;
  onSort?: () => void;
  filter?: AdminColumnFilter;
  onFilterChange?: (filter: AdminColumnFilter | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<AdminColumnFilter>(filter ?? emptyColumnFilter());
  const [panel, setPanel] = useState({ top: 0, left: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active = isColumnFilterActive(filter);
  const needsValue = draft.op !== "empty" && draft.op !== "notEmpty";

  useEffect(() => {
    if (!open) return;
    setDraft(filter ?? emptyColumnFilter());
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, filter]);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const width = 256;
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
      setPanel({ top: rect.bottom + 4, left });
    }
    setOpen(true);
  };

  return (
    <th className="relative px-4 py-3 font-medium">
      <div ref={rootRef} className="flex items-center gap-1">
        {onSort ? (
          <button
            type="button"
            onClick={onSort}
            className={`inline-flex items-center gap-1 transition hover:text-foreground ${
              sortDir ? "text-foreground" : ""
            }`}
            aria-label={`Sort by ${label}`}
          >
            {label}
            {sortDir === "asc" ? (
              <ChevronUp className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <ChevronDown className={`h-4 w-4 ${sortDir ? "" : "opacity-40"}`} strokeWidth={1.75} />
            )}
          </button>
        ) : (
          <span>{label}</span>
        )}
        {onFilterChange ? (
          <button
            ref={buttonRef}
            type="button"
            onClick={toggleOpen}
            aria-expanded={open}
            aria-label={`Filter ${label}`}
            className={`rounded-md p-1 transition hover:bg-background hover:text-foreground ${
              open || active ? "text-brand" : "text-muted"
            }`}
          >
            <Funnel className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        ) : null}
        {open && onFilterChange ? (
          <div
            className="fixed z-50 w-64 rounded-xl border border-border bg-surface p-3 text-left shadow-lg"
            style={{ top: panel.top, left: panel.left }}
          >
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold tracking-[0.12em] text-muted uppercase">Match</span>
              <select
                value={draft.op}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, op: event.target.value as AdminColumnFilter["op"] }))
                }
                className={formInputClassName}
              >
                {ADMIN_COLUMN_OPS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {needsValue ? (
              <label className="mt-3 block">
                <span className="mb-1.5 block text-xs font-semibold tracking-[0.12em] text-muted uppercase">Search</span>
                <input
                  value={draft.value}
                  onChange={(event) => setDraft((current) => ({ ...current, value: event.target.value }))}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter") return;
                    onFilterChange(isColumnFilterActive(draft) ? draft : undefined);
                    setOpen(false);
                  }}
                  placeholder={`${label}…`}
                  className={formInputClassName}
                />
              </label>
            ) : null}
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  onFilterChange(undefined);
                  setDraft(emptyColumnFilter());
                  setOpen(false);
                }}
                className="text-sm font-medium text-muted hover:text-foreground"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  onFilterChange(isColumnFilterActive(draft) ? draft : undefined);
                  setOpen(false);
                }}
                className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white"
              >
                Apply
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </th>
  );
}
