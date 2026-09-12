export function azureApiBaseUrl() {
  return process.env.AZURE_API_BASE_URL?.replace(/\/$/, "") ?? "";
}

export function azureApiKey() {
  return process.env.AZURE_API_KEY ?? "";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function isAzureConfigured() {
  return Boolean(azureApiBaseUrl());
}

export function isAdminConfigured() {
  return Boolean(adminPassword());
}
