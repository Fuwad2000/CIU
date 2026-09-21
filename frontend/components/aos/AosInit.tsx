"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { aosDefaults, getAosDuration, getAosOffset } from "@frontend/components/aos/config";
import {
  clearAosFallback,
  markAosFallback,
  refreshAos,
  scheduleAosRefreshes,
} from "@frontend/lib/aosRefresh";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function shouldDisableAos() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileViewport() {
  return window.innerWidth < 768;
}

function initAos() {
  if (shouldDisableAos()) return;

  AOS.init({
    duration: getAosDuration(isMobileViewport()),
    easing: aosDefaults.easing,
    offset: getAosOffset(isMobileViewport()),
    once: aosDefaults.once,
    disable: false,
    mirror: false,
    disableMutationObserver: false,
    anchorPlacement: "top-bottom",
  });

  document.documentElement.classList.add("aos-ready");
  refreshAos();
}

export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    initAos();

    const refreshSoon = window.setTimeout(() => initAos(), 120);
    const refreshLater = window.setTimeout(() => scheduleAosRefreshes(), 450);
    const fallbackTimer = window.setTimeout(() => markAosFallback(), 2000);

    const handleResize = () => initAos();
    const handleOrientation = () => window.setTimeout(() => scheduleAosRefreshes(), 100);

    const onLoad = () => scheduleAosRefreshes();

    window.addEventListener("load", onLoad);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      window.clearTimeout(refreshSoon);
      window.clearTimeout(refreshLater);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  useEffect(() => {
    clearAosFallback();
    scheduleAosRefreshes();
    const fallbackTimer = window.setTimeout(() => markAosFallback(), 2000);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [pathname]);

  return null;
}
