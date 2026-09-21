"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ADMIN_IDLE_WARNING_MS,
  ADMIN_SESSION_EXPIRED_EVENT,
  adminSessionPhase,
  adminSessionWarningRemainingMs,
  formatSessionCountdown,
  type AdminSessionPhase,
} from "@frontend/portal/admin-session-timeout";

const ACTIVITY_EVENTS = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"] as const;

export default function AdminSessionTimeout({
  onContinue,
  onSignOut,
}: {
  onContinue: () => Promise<boolean>;
  onSignOut: () => void;
}) {
  const lastActivityAt = useRef(Date.now());
  const [phase, setPhase] = useState<AdminSessionPhase>("active");
  const [remainingMs, setRemainingMs] = useState(ADMIN_IDLE_WARNING_MS);
  const [continuing, setContinuing] = useState(false);

  const expire = useCallback(() => {
    setPhase("expired");
    setRemainingMs(0);
  }, []);

  useEffect(() => {
    const markActivity = () => {
      const now = Date.now();
      if (adminSessionPhase({ now, lastActivityAt: lastActivityAt.current }) !== "active") return;
      lastActivityAt.current = now;
    };

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, markActivity, { passive: true });
    }
    return () => {
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, markActivity);
      }
    };
  }, []);

  useEffect(() => {
    const sync = () => {
      const now = Date.now();
      const next = adminSessionPhase({ now, lastActivityAt: lastActivityAt.current });
      const remaining = adminSessionWarningRemainingMs({ now, lastActivityAt: lastActivityAt.current });
      setPhase(next);
      setRemainingMs(remaining);
    };

    sync();
    const timer = window.setInterval(sync, 250);
    const onExpired = () => expire();
    window.addEventListener(ADMIN_SESSION_EXPIRED_EVENT, onExpired);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener(ADMIN_SESSION_EXPIRED_EVENT, onExpired);
    };
  }, [expire]);

  const continueSession = async () => {
    setContinuing(true);
    try {
      const ok = await onContinue();
      if (!ok) {
        expire();
        return;
      }
      lastActivityAt.current = Date.now();
      setPhase("active");
      setRemainingMs(ADMIN_IDLE_WARNING_MS);
    } catch {
      expire();
    } finally {
      setContinuing(false);
    }
  };

  if (phase === "active") return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-session-title"
        aria-describedby="admin-session-copy"
        className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-xl"
      >
        {phase === "warning" ? (
          <>
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Session</p>
            <h2 id="admin-session-title" className="mt-2 text-xl font-semibold text-foreground">
              Stay signed in?
            </h2>
            <p id="admin-session-copy" className="mt-3 text-sm leading-relaxed text-muted">
              This page has been idle for a while. Continue to keep working, or sign out now.
            </p>
            <p className="mt-5 rounded-2xl bg-brand/5 px-4 py-3 text-center text-sm font-semibold text-foreground">
              Session ends in {formatSessionCountdown(remainingMs)}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onSignOut}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                Sign out
              </button>
              <button
                type="button"
                onClick={() => void continueSession()}
                disabled={continuing}
                className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {continuing ? "Continuing…" : "Continue"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Session expired</p>
            <h2 id="admin-session-title" className="mt-2 text-xl font-semibold text-foreground">
              You were signed out
            </h2>
            <p id="admin-session-copy" className="mt-3 text-sm leading-relaxed text-muted">
              The staff portal session ended after a period of inactivity. Sign in again to continue.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onSignOut}
                className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white"
              >
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
