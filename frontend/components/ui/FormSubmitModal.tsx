"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";

export type FormSubmitPhase = "idle" | "submitting" | "success" | "error";

type OverlayState = {
  phase: FormSubmitPhase;
  title: string;
  message: string;
};

const idleState: OverlayState = { phase: "idle", title: "", message: "" };

export function useFormSubmitModal() {
  const [state, setState] = useState<OverlayState>(idleState);
  const inFlightRef = useRef(false);

  const begin = useCallback(
    (
      title = "Sending",
      message = "Please wait. This can take a few seconds — do not click again."
    ) => {
      if (inFlightRef.current) return false;
      inFlightRef.current = true;
      setState({ phase: "submitting", title, message });
      return true;
    },
    []
  );

  const succeed = useCallback((title: string, message: string) => {
    setState({ phase: "success", title, message });
  }, []);

  const fail = useCallback((title: string, message: string) => {
    inFlightRef.current = false;
    setState({ phase: "error", title, message });
  }, []);

  const close = useCallback(() => {
    setState((current) => {
      if (current.phase === "submitting") return current;
      inFlightRef.current = false;
      return idleState;
    });
  }, []);

  return {
    phase: state.phase,
    title: state.title,
    message: state.message,
    busy: state.phase !== "idle",
    begin,
    succeed,
    fail,
    close,
  };
}

export function FormSubmitModal({
  phase,
  title,
  message,
  onClose,
}: {
  phase: FormSubmitPhase;
  title: string;
  message: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const messageId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (phase === "idle") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "success" || phase === "error") {
      closeRef.current?.focus();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "success" && phase !== "error") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, onClose]);

  if (!mounted) return null;

  const sending = phase === "submitting";
  const icon = sending ? (
    <LoaderCircle className="h-7 w-7 animate-spin" strokeWidth={2} aria-hidden="true" />
  ) : phase === "success" ? (
    <CheckCircle2 className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
  ) : (
    <AlertCircle className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
  );

  return createPortal(
    <AnimatePresence>
      {phase === "idle" ? null : (
        <motion.div
          key="form-submit-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={messageId}
          aria-busy={sending}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-center justify-center px-4 py-8"
        >
          <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-premium-xl"
          >
            <div className="h-1 bg-brand-gradient" aria-hidden="true" />
            <div className="px-6 py-8 text-center sm:px-8">
              <span
                className={`mx-auto inline-flex rounded-2xl p-3 ${
                  phase === "error" ? "bg-gold/15 text-gold-dark" : "bg-brand/10 text-brand"
                }`}
              >
                {icon}
              </span>
              <h2 id={titleId} className="mt-5 text-xl font-semibold text-foreground sm:text-2xl">
                {title}
              </h2>
              <p id={messageId} className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {message}
              </p>
              {sending ? null : (
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="mt-7 inline-flex min-w-36 items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {phase === "error" ? "Try again" : "Close"}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
