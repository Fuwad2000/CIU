export function azureApiBaseUrl() {
  return process.env.AZURE_API_BASE_URL?.replace(/\/$/, "") ?? "";
}

export function azureApiKey() {
  return process.env.AZURE_API_KEY ?? "";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function sqlServer() {
  return process.env.SQL_SERVER?.trim() ?? "";
}

export function sqlDatabase() {
  return process.env.SQL_DATABASE?.trim() ?? "";
}

export function sqlPort() {
  const port = Number(process.env.SQL_PORT ?? "1433");
  return Number.isFinite(port) && port > 0 ? port : 1433;
}

export function sqlEncrypt() {
  return process.env.SQL_ENCRYPT !== "false";
}

export function isSqlConfigured() {
  return Boolean(sqlServer() && sqlDatabase());
}

export function isAzureConfigured() {
  return Boolean(azureApiBaseUrl());
}

export function isAdminConfigured() {
  return Boolean(adminPassword());
}

export function acsEndpoint() {
  return process.env.AZURE_COMMUNICATION_SERVICES_ENDPOINT?.trim() ?? "";
}

export function emailSender() {
  return process.env.AZURE_EMAIL_SENDER?.trim() ?? "";
}

export function isEmailConfigured() {
  return Boolean(acsEndpoint() && emailSender());
}

export function portalBackendName() {
  if (isSqlConfigured()) return "sql" as const;
  if (isAzureConfigured()) return "azure-api" as const;
  return "memory" as const;
}
