const SQL_UNAVAILABLE_MESSAGE =
  "The portal could not reach its database. This is not a Microsoft sign-in problem. Try again in a moment.";

export function isSqlConnectivityError(error: unknown) {
  const seen = new Set<unknown>();
  let current: unknown = error;

  for (let i = 0; i < 6 && current && typeof current === "object" && !seen.has(current); i += 1) {
    seen.add(current);
    const record = current as {
      code?: unknown;
      message?: unknown;
      name?: unknown;
      originalError?: unknown;
    };
    const code = String(record.code ?? "");
    const name = String(record.name ?? "");
    const message = String(record.message ?? "");
    if (
      code === "ETIMEOUT" ||
      code === "ESOCKET" ||
      name === "ConnectionError" ||
      /Failed to connect to /i.test(message) ||
      /Could not obtain an Azure SQL access token/i.test(message)
    ) {
      return true;
    }
    current = record.originalError;
  }

  return false;
}

export function sqlUnavailableMessage() {
  return SQL_UNAVAILABLE_MESSAGE;
}
