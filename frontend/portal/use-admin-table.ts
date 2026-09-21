"use client";

import { useMemo, useState } from "react";
import {
  applyAdminTable,
  type AdminColumnFilter,
  type AdminSortDir,
} from "@frontend/portal/admin-filters";

const DATE_KEYS = new Set(["date", "when", "added", "sent", "updated", "registered"]);

type ColumnAccessor<T> = (item: T) => { sort: string; filter: string };

export function useAdminTable<T, C extends Record<string, ColumnAccessor<T>>>(
  items: T[],
  columns: C,
  defaultSort: keyof C & string,
  defaultDir: AdminSortDir = "desc"
) {
  type K = keyof C & string;
  const [sortKey, setSortKey] = useState<K>(defaultSort);
  const [sortDir, setSortDir] = useState<AdminSortDir>(defaultDir);
  const [filters, setFilters] = useState<Partial<Record<K, AdminColumnFilter>>>({});

  const toggleSort = (key: K) => {
    if (sortKey === key) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(DATE_KEYS.has(key) ? "desc" : "asc");
  };

  const setFilter = (key: K, filter: AdminColumnFilter | undefined) => {
    setFilters((current) => {
      const next = { ...current };
      if (filter) next[key] = filter;
      else delete next[key];
      return next;
    });
  };

  const rows = useMemo(
    () => applyAdminTable(items, columns, sortKey, sortDir, filters),
    [items, columns, sortKey, sortDir, filters]
  );

  return { rows, sortKey, sortDir, toggleSort, filters, setFilter };
}
