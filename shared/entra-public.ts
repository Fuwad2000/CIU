export type PublicEntraConfig = {
  tenantId: string;
  clientId: string;
  apiScope: string;
};

export function isCompletePublicEntraConfig(value: PublicEntraConfig | null | undefined) {
  return Boolean(value?.tenantId && value.clientId && value.apiScope);
}
