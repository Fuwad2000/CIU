"use client";

import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus, type PublicClientApplication } from "@azure/msal-browser";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useState } from "react";
import AdminAccessDenied from "@frontend/components/admin/AdminAccessDenied";
import { AdminAuthStatus } from "@frontend/components/admin/AdminAuthStatus";
import { AdminSessionProvider } from "@frontend/components/admin/AdminSessionContext";
import AdminSessionTimeout from "@frontend/components/admin/AdminSessionTimeout";
import AdminShell from "@frontend/components/admin/AdminShell";
import { AdminApiError, adminFetch } from "@frontend/portal/client";
import type { AdminMe } from "@shared/admin-me";
import type { StaffSessionRecord } from "@shared/admin-session";
import {
  ADMIN_LOGIN_PATH,
  getMsalInstance,
  isPublicEntraConfigured,
  signOutWithMicrosoft,
} from "@frontend/portal/entra-msal";

function useBrowserMsal() {
  return useSyncExternalStore(
    () => () => undefined,
    () => getMsalInstance(),
    () => null as PublicClientApplication | null
  );
}

type PrepStep = "microsoft" | "session" | "access" | "opening";

function prepStatus(step: PrepStep) {
  switch (step) {
    case "microsoft":
      return {
        title: "Signing you in",
        description: "Connecting to Microsoft and confirming this account.",
        progress: 20,
      };
    case "session":
      return {
        title: "Starting a new session",
        description: "Closing any previous staff session and opening a fresh one.",
        progress: 50,
      };
    case "access":
      return {
        title: "Checking your access",
        description: "Making sure this Microsoft account can open the staff portal.",
        progress: 75,
      };
    case "opening":
      return {
        title: "Welcome back",
        description: "Opening the staff portal.",
        progress: 95,
      };
  }
}

function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [retryKey, setRetryKey] = useState(0);
  const [prepStep, setPrepStep] = useState<PrepStep>("microsoft");
  const [sessionId, setSessionId] = useState("");
  const [result, setResult] = useState<{
    status: "idle" | "ok" | "denied" | "error";
    profile?: AdminMe;
    error?: string;
  }>({ status: "idle" });

  const msalBusy =
    inProgress === InteractionStatus.Startup || inProgress === InteractionStatus.HandleRedirect;
  const ready = isAuthenticated && !msalBusy;

  const signOut = useCallback(async (options?: { returnToLogin?: boolean }) => {
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } catch {
      // Continue signing out of Microsoft even if the database session is already gone.
    }
    try {
      await fetch("/api/admin/identity", { method: "DELETE" });
    } catch {
      // Cookie cleanup is best-effort.
    }
    await signOutWithMicrosoft({ returnToLogin: options?.returnToLogin });
  }, []);

  const continueSession = useCallback(async () => {
    try {
      const payload = await adminFetch<AdminMe>("/api/me");
      setResult({ status: "ok", profile: payload });
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const account = instance.getActiveAccount() ?? accounts[0] ?? null;
    if (account) instance.setActiveAccount(account);
  }, [accounts, instance]);

  useEffect(() => {
    if (!ready) {
      setPrepStep("microsoft");
      return;
    }
    let cancelled = false;
    setResult({ status: "idle" });
    setPrepStep("session");

    (async () => {
      try {
        const session = await adminFetch<StaffSessionRecord>("/api/admin/session", {
          method: "POST",
          expireOnUnauthorized: false,
        });
        if (cancelled) return;
        setSessionId(session.id || crypto.randomUUID());
        setPrepStep("access");
        const payload = await adminFetch<AdminMe>("/api/me", { expireOnUnauthorized: false });
        if (cancelled) return;
        setResult({ status: "ok", profile: payload });
      } catch (err: unknown) {
        if (cancelled) return;
        if (err instanceof AdminApiError && err.status === 403) {
          setResult({ status: "denied" });
          return;
        }
        if (err instanceof AdminApiError && err.status === 401) {
          void signOut({ returnToLogin: true });
          return;
        }
        setResult({
          status: "error",
          error:
            err instanceof AdminApiError && err.status === 503
              ? err.message
              : "Please try again in a moment.",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, retryKey, signOut]);

  useEffect(() => {
    if (msalBusy) return;
    if (!isAuthenticated && pathname !== ADMIN_LOGIN_PATH) {
      router.replace(ADMIN_LOGIN_PATH);
    }
    if (isAuthenticated && result.status === "ok" && pathname === ADMIN_LOGIN_PATH) {
      setPrepStep("opening");
      router.replace("/admin");
    }
  }, [isAuthenticated, msalBusy, pathname, result.status, router]);

  if (msalBusy) {
    return <AdminAuthStatus {...prepStatus("microsoft")} />;
  }

  if (!isAuthenticated) {
    if (pathname === ADMIN_LOGIN_PATH) return <>{children}</>;
    return (
      <AdminAuthStatus
        title="Signing you in"
        description="Taking you to Microsoft to continue."
        progress={15}
      />
    );
  }

  if (result.status === "denied") {
    return <AdminAccessDenied onSignOut={() => void signOut({ returnToLogin: true })} />;
  }

  if (result.status === "error") {
    return (
      <AdminAuthStatus
        title="We couldn’t open the portal"
        description={result.error || "Please try again in a moment."}
        action={
          <button
            type="button"
            onClick={() => {
              setResult({ status: "idle" });
              setRetryKey((current) => current + 1);
            }}
            className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Try again
          </button>
        }
      />
    );
  }

  if (result.status !== "ok" || !result.profile) {
    return <AdminAuthStatus {...prepStatus(prepStep)} />;
  }

  if (pathname === ADMIN_LOGIN_PATH) {
    return <AdminAuthStatus {...prepStatus("opening")} />;
  }

  return (
    <AdminSessionProvider profile={result.profile} onSignOut={() => void signOut({ returnToLogin: true })}>
      <AdminSessionTimeout
        key={sessionId || result.profile.id}
        onContinue={continueSession}
        onSignOut={() => void signOut({ returnToLogin: true })}
      />
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
    return (
      <AdminAuthStatus
        title="Signing you in"
        description="Starting Microsoft sign-in."
        progress={10}
      />
    );
  }

  return (
    <MsalProvider instance={instance}>
      <AdminAuthGate>{children}</AdminAuthGate>
    </MsalProvider>
  );
}
