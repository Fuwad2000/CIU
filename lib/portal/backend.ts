import { azureStore } from "@/lib/portal/azure-store";
import { isAzureConfigured, isSqlConfigured } from "@/lib/portal/env";
import { memoryStore } from "@/lib/portal/memory-store";
import { sqlStore } from "@/lib/portal/sql-store";
import type { PortalBackend } from "@/lib/portal/types";

export function getPortalBackend(): PortalBackend {
  if (isSqlConfigured()) return sqlStore;
  if (isAzureConfigured()) return azureStore;
  return memoryStore;
}
