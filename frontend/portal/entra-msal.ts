"use client";

import {
  BrowserCacheLocation,
  InteractionRequiredAuthError,
  LogLevel,
  PublicClientApplication,
  type AccountInfo,
  type Configuration,
} from "@azure/msal-browser";

export const ADMIN_REDIRECT_PATH = "/admin";
export const ADMIN_LOGIN_PATH = "/admin/login";
export const POST_LOGOUT_PATH = "/";

export function publicEntraConfig() {
  return {
    tenantId: process.env.NEXT_PUBLIC_ENTRA_TENANT_ID?.trim() ?? "",
    clientId: process.env.NEXT_PUBLIC_ENTRA_PORTAL_CLIENT_ID?.trim() ?? "",
    apiScope: process.env.NEXT_PUBLIC_ENTRA_API_SCOPE?.trim() ?? "",
  };
}

export function isPublicEntraConfigured() {
  const config = publicEntraConfig();
  return Boolean(config.tenantId && config.clientId && config.apiScope);
}

export function entraRedirectUri() {
  if (typeof window === "undefined") return ADMIN_REDIRECT_PATH;
  return `${window.location.origin}${ADMIN_REDIRECT_PATH}`;
}

export function entraPostLogoutRedirectUri() {
  if (typeof window === "undefined") return POST_LOGOUT_PATH;
  return `${window.location.origin}${POST_LOGOUT_PATH}`;
}

export function msalConfig(): Configuration {
  const { tenantId, clientId } = publicEntraConfig();
  return {
    auth: {
      clientId,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      redirectUri: ADMIN_REDIRECT_PATH,
      postLogoutRedirectUri: POST_LOGOUT_PATH,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
    },
    system: {
      loggerOptions: {
        piiLoggingEnabled: false,
        logLevel: LogLevel.Error,
        loggerCallback: () => undefined,
      },
    },
  };
}

export function loginRequest() {
  return {
    scopes: [publicEntraConfig().apiScope],
    redirectUri: entraRedirectUri(),
  };
}

let instance: PublicClientApplication | null = null;

export function getMsalInstance() {
  if (typeof window === "undefined") {
    throw new Error("Microsoft sign-in is only available in the browser.");
  }
  if (!instance) {
    instance = new PublicClientApplication(msalConfig());
  }
  return instance;
}

export function activeAccount(pca: PublicClientApplication): AccountInfo | null {
  return pca.getActiveAccount() ?? pca.getAllAccounts()[0] ?? null;
}

export async function acquireAdminAccessToken() {
  const pca = getMsalInstance();
  const account = activeAccount(pca);
  if (!account) return null;
  pca.setActiveAccount(account);
  try {
    const result = await pca.acquireTokenSilent({
      ...loginRequest(),
      account,
    });
    return result.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      await pca.acquireTokenRedirect({
        ...loginRequest(),
        account,
      });
      return null;
    }
    throw error;
  }
}

export async function signInWithMicrosoft() {
  const pca = getMsalInstance();
  await pca.loginRedirect(loginRequest());
}

export async function signOutWithMicrosoft(options?: { returnToLogin?: boolean }) {
  const pca = getMsalInstance();
  const account = activeAccount(pca);
  if (options?.returnToLogin) {
    await pca.logoutRedirect({
      account: account ?? undefined,
      postLogoutRedirectUri: `${window.location.origin}${ADMIN_LOGIN_PATH}`,
    });
    return;
  }
  await pca.logoutRedirect({
    account: account ?? undefined,
    postLogoutRedirectUri: entraPostLogoutRedirectUri(),
  });
}
