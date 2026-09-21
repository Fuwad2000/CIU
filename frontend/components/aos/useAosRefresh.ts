"use client";

import { scheduleAosRefreshes } from "@frontend/lib/aosRefresh";
import { useEffect } from "react";

/** Re-register AOS when scroll-animated nodes mount after hydration. */
export function useAosRefresh(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    scheduleAosRefreshes();
  }, [enabled]);
}
