"use client";

import { useEffect } from "react";
import AOS from "aos";

/** Re-register AOS when scroll-animated nodes mount after hydration. */
export function useAosRefresh() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frame = requestAnimationFrame(() => {
      AOS.refresh();
    });

    return () => cancelAnimationFrame(frame);
  }, []);
}
