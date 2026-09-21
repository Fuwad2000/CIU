import { LightboxProvider } from "@frontend/components/lightbox/LightboxProvider";
import { ToastProvider } from "@frontend/components/ui/ToastProvider";
import type { ReactNode } from "react";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <LightboxProvider>{children}</LightboxProvider>
    </ToastProvider>
  );
}
