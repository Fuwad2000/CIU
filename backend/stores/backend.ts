import { azureStore } from "@backend/stores/azure-store";
import { isAzureConfigured, isSqlConfigured } from "@backend/env";
import { memoryStore } from "@backend/stores/memory-store";
import { sqlStore } from "@backend/sql/sql-store";
import type { PortalBackend } from "@shared/types";

export function getPortalBackend(): PortalBackend {
  if (isSqlConfigured()) return sqlStore;
  if (isAzureConfigured()) return azureStore;
  return memoryStore;
}
