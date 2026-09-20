export function outreachSqlMessage(error: unknown, fallback: string) {
  const text = error instanceof Error ? error.message : String(error);
  if (/Invalid object name|outreach_/i.test(text)) {
    return "Outreach tables are not installed yet. Run 011_create_outreach.sql against Azure SQL.";
  }
  return error instanceof Error ? error.message : fallback;
}
