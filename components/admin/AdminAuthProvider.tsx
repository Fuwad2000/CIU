"use client";

import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus, type PublicClientApplication } from "@azure/msal-browser";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { useState } from "react";
import AdminAccessDenied from "@/components/admin/AdminAccessDenied";
import { AdminAuthStatus } from "@/components/admin/AdminAuthStatus";
import { AdminSessionProvider } from "@/components/admin/AdminSessionContext";
import AdminShell from "@/components/admin/AdminShell";
import { AdminApiError, adminFetch } from "@/lib/portal/client";
import type { AdminMe } from "@/lib/portal/admin-me";
import {
  ADMIN_LOGIN_PATH,
  getMsalInstance,
  isPublicEntraConfigured,
  signOutWithMicrosoft,
} from "@/lib/portal/entra-msal";

function useBrowserMsal() {
  return useSyncExternalStore(
    () => () => undefined,
    () => getMsalInstance(),
    () => null as PublicClientApplication | null
  );
}

function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [result, setResult] = useState<{
    status: "idle" | "ok" | "denied" | "error";
    profile?: AdminMe;
    error?: string;
  }>({ status: "idle" });

  const msalBusy =
    inProgress === InteractionStatus.Startup || inProgress === InteractionStatus.HandleRedirect;
  const ready = isAuthenticated && !msalBusy;

  useEffect(() => {
    const account = instance.getActiveAccount() ?? accounts[0] ?? null;
    if (account) instance.setActiveAccount(account);
  }, [accounts, instance]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    adminFetch<AdminMe>("/api/me")
      .then((payload) => {
        if (!cancelled) setResult({ status: "ok", profile: payload });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof AdminApiError && err.status === 403) {
          setResult({ status: "denied" });
          return;
        }
        setResult({
          status: "error",
          error:
            err instanceof AdminApiError && err.status === 503
              ? err.message
              : "Please try again in a moment.",
        });
      });
    return () => {
      cancelled = true;
    };
  }, [ready]);

  useEffect(() => {
    if (msalBusy) return;
    if (!isAuthenticated && pathname !== ADMIN_LOGIN_PATH) {
      router.replace(ADMIN_LOGIN_PATH);
    }
    if (isAuthenticated && result.status === "ok" && pathname === ADMIN_LOGIN_PATH) {
      router.replace("/admin");
    }
  }, [isAuthenticated, msalBusy, pathname, result.status, router]);

  const signOut = () => {
    void fetch("/api/admin/identity", { method: "DELETE" }).catch(() => undefined);
    void fetch("/api/admin/session", { method: "DELETE" }).catch(() => undefined);
    void signOutWithMicrosoft();
  };

  if (msalBusy) {
    return <AdminAuthStatus title="Signing you in" description="Just a moment while we open your Microsoft account." />;
  }

  if (!isAuthenticated) {
    if (pathname === ADMIN_LOGIN_PATH) return <>{children}</>;
    return <AdminAuthStatus title="Signing you in" description="Taking you to Microsoft to continue." />;
  }

  if (result.status === "denied") {
    return <AdminAccessDenied onSignOut={signOut} />;
  }

  if (result.status === "error") {
    return (
      <AdminAuthStatus
        title="We couldn’t open the portal"
        description={result.error || "Please try again in a moment."}
      />
    );
  }

  if (result.status !== "ok" || !result.profile) {
    return (
      <AdminAuthStatus
        title="Welcome"
        description="Making sure this account can open the staff portal."
      />
    );
  }

  if (pathname === ADMIN_LOGIN_PATH) {
    return <AdminAuthStatus title="Welcome back" description="Opening the staff portal." />;
  }

  return (
    <AdminSessionProvider profile={result.profile} onSignOut={signOut}>
      <AdminShell>{children}</AdminShell>
    </AdminSessionProvider>
  );
}

export default function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const instance = useBrowserMsal();

  if (!isPublicEntraConfigured()) {
    return (
      <AdminAuthStatus
        title="Sign-in isn’t available right now"
        description="Please try again later, or contact a CIU administrator for help."
      />
    );
  }

  if (!instance) {
    return <AdminAuthStatus title="Signing you in" description="Just a moment." />;
  }

  return (
    <MsalProvider instance={instance}>
      <AdminAuthGate>{children}</AdminAuthGate>
    </MsalProvider>
  );
}
