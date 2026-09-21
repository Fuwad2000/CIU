"use client";

import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import AdminAuthFrame, { MicrosoftMark } from "@frontend/components/admin/AdminAuthFrame";
import AdminBrandMark from "@frontend/components/admin/AdminBrandMark";
import { isPublicEntraConfigured, signInWithMicrosoft } from "@frontend/portal/entra-msal";

export default function AdminLoginForm() {
  const { inProgress } = useMsal();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const configured = isPublicEntraConfigured();

  const handleSignIn = async () => {
    setError("");
    setSubmitting(true);
    try {
      await signInWithMicrosoft();
    } catch {
      setSubmitting(false);
      setError("We couldn't start sign-in. Please try again.");
    }
  };

  return (
    <AdminAuthFrame>
      <div className="hidden items-center gap-3 lg:flex">
        <AdminBrandMark size={44} />
        <p className="text-sm font-semibold tracking-wide text-muted">Canadian Islamic Union</p>
      </div>
      <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-brand uppercase lg:mt-10">Staff portal</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Welcome back</h1>
      <div className="gold-accent-bar mt-4" />
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        Sign in with your CIU Microsoft account to continue.
      </p>
      {!configured ? (
        <p className="mt-6 text-sm text-danger">Sign-in isn’t available right now. Please try again later.</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
      <button
        type="button"
        onClick={() => void handleSignIn()}
        disabled={submitting || !configured || inProgress !== "none"}
        className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand px-5 py-3.5 text-sm font-semibold text-white shadow-premium transition hover:bg-brand-dark disabled:opacity-70 sm:text-base"
      >
        {submitting ? (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
          />
        ) : (
          <MicrosoftMark />
        )}
        {submitting ? "Opening Microsoft…" : "Continue with Microsoft"}
      </button>
      <p className="mt-5 text-center text-xs text-muted sm:text-sm">
        Only CIU staff with access can open this portal.
      </p>
    </AdminAuthFrame>
  );
}
