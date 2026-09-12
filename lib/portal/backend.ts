import { azureStore } from "@/lib/portal/azure-store";
import { isAzureConfigured } from "@/lib/portal/env";
import { memoryStore } from "@/lib/portal/memory-store";
import type { PortalBackend } from "@/lib/portal/types";

export function getPortalBackend(): PortalBackend {
  return isAzureConfigured() ? azureStore : memoryStore;
}
