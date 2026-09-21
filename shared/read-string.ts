export function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
