"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

type ToastItem = {
  id: number;
  message: string;
};

const TOAST_DURATION_MS = 3000;

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: number) => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string) => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message }]);

      const timeout = setTimeout(() => dismissToast(id), TOAST_DURATION_MS);
      timeoutsRef.current.set(id, timeout);
    },
    [dismissToast]
  );

  useEffect(
    () => () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
    },
    []
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed inset-x-0 top-0 z-[200] flex flex-col items-center gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))]"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              role="status"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="pointer-events-auto w-full max-w-lg overflow-hidden rounded-2xl border border-brand/15 bg-surface shadow-premium-lg"
            >
              <div className="h-1 bg-brand-gradient" aria-hidden="true" />
              <div className="relative flex items-start gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
                <span className="inline-flex shrink-0 rounded-xl bg-brand/10 p-2 text-brand">
                  <CheckCircle2 className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2} aria-hidden="true" />
                </span>
                <p className="flex-1 pt-0.5 text-sm leading-relaxed text-foreground sm:text-base">
                  {toast.message}
                </p>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Dismiss notification"
                  className="inline-flex shrink-0 rounded-lg p-1.5 text-brand/70 transition hover:bg-brand/10 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand/25"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: TOAST_DURATION_MS / 1000, ease: "linear" }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
