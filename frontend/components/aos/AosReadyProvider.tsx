"use client";

import { scheduleAosRefreshes } from "@frontend/lib/aosRefresh";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const AosReadyContext = createContext(false);

export function useAosReady() {
  return useContext(AosReadyContext);
}

export function AosReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    scheduleAosRefreshes();
  }, [ready]);

  return <AosReadyContext.Provider value={ready}>{children}</AosReadyContext.Provider>;
}
