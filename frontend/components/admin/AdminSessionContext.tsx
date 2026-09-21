"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AdminMe } from "@shared/admin-me";

type AdminSession = {
  profile: AdminMe;
  onSignOut: () => void;
};

const AdminSessionContext = createContext<AdminSession | null>(null);

export function AdminSessionProvider({
  profile,
  onSignOut,
  children,
}: AdminSession & { children: ReactNode }) {
  return (
    <AdminSessionContext.Provider value={{ profile, onSignOut }}>{children}</AdminSessionContext.Provider>
  );
}

export function useAdminSession() {
  const value = useContext(AdminSessionContext);
  if (!value) {
    throw new Error("useAdminSession must be used inside the staff portal.");
  }
  return value;
}
