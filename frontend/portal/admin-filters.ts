export const ADMIN_COLUMN_OPS = [
  { value: "contains", label: "Contains" },
  { value: "equals", label: "Equals" },
  { value: "startsWith", label: "Starts with" },
  { value: "endsWith", label: "Ends with" },
  { value: "notContains", label: "Does not contain" },
  { value: "empty", label: "Is empty" },
  { value: "notEmpty", label: "Is not empty" },
] as const;

export type AdminColumnOp = (typeof ADMIN_COLUMN_OPS)[number]["value"];
export type AdminSortDir = "asc" | "desc";

export type AdminColumnFilter = {
  op: AdminColumnOp;
  value: string;
};

export function emptyColumnFilter(): AdminColumnFilter {
  return { op: "contains", value: "" };
}

export function isColumnFilterActive(filter: AdminColumnFilter | undefined) {
  if (!filter) return false;
  if (filter.op === "empty" || filter.op === "notEmpty") return true;
  return Boolean(filter.value.trim());
}

export function matchesColumnFilter(raw: string, filter: AdminColumnFilter | undefined) {
  if (!isColumnFilterActive(filter) || !filter) return true;
  const text = raw.trim().toLowerCase();
  const needle = filter.value.trim().toLowerCase();
  if (filter.op === "empty") return !text;
  if (filter.op === "notEmpty") return Boolean(text);
  if (!needle) return true;
  if (filter.op === "contains") return text.includes(needle);
  if (filter.op === "equals") return text === needle;
  if (filter.op === "startsWith") return text.startsWith(needle);
  if (filter.op === "endsWith") return text.endsWith(needle);
  return !text.includes(needle);
}

export function compareColumnValues(left: string, right: string, dir: AdminSortDir) {
  const result = left.localeCompare(right, "en", { numeric: true, sensitivity: "base" });
  return dir === "asc" ? result : -result;
}

export function applyAdminTable<T>(
  items: T[],
  columns: Record<string, (item: T) => { sort: string; filter: string }>,
  sortKey: string,
  sortDir: AdminSortDir,
  filters: Partial<Record<string, AdminColumnFilter>>
) {
  const next = items.filter((item) =>
    Object.entries(filters).every(([key, filter]) => {
      const column = columns[key];
      if (!column || !filter) return true;
      return matchesColumnFilter(column(item).filter, filter);
    })
  );
  const accessor = columns[sortKey];
  if (!accessor) return next;
  next.sort((left, right) => compareColumnValues(accessor(left).sort, accessor(right).sort, sortDir));
  return next;
}
