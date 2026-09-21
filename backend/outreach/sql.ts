export function outreachSqlMessage(error: unknown, fallback: string) {
  const text = error instanceof Error ? error.message : String(error);
  if (/Invalid object name.*outreach_additional/i.test(text)) {
    return "The additional audience table is not installed yet. Run 013_outreach_additional.sql against Azure SQL.";
  }
  if (/Invalid column name.*phone/i.test(text)) {
    return "The contact list phone column is not installed yet. Run 016_outreach_additional_phone.sql against Azure SQL.";
  }
  if (/CK_outreach_recipients_audience/i.test(text)) {
    return "This audience is not allowed in SQL yet. Run 013_outreach_additional.sql against Azure SQL.";
  }
  if (/Invalid object name|outreach_/i.test(text)) {
    return "Outreach tables are not installed yet. Run 011_create_outreach.sql against Azure SQL.";
  }
  return error instanceof Error ? error.message : fallback;
}
