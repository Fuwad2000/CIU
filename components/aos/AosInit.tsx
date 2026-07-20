"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { aosDefaults } from "@/components/aos/config";

function shouldDisableAos() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getAosOffset() {
  return window.innerWidth < 768 ? 32 : aosDefaults.offset;
}

function initAos() {
  if (shouldDisableAos()) return;

  AOS.init({
    duration: aosDefaults.duration,
    easing: aosDefaults.easing,
    offset: getAosOffset(),
    once: aosDefaults.once,
    disable: false,
    mirror: false,
    disableMutationObserver: false,
  });
  AOS.refresh();
}

export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    initAos();

    const refreshSoon = window.setTimeout(() => initAos(), 120);
    const refreshLater = window.setTimeout(() => initAos(), 450);

    const handleResize = () => initAos();
    const handleOrientation = () => window.setTimeout(() => initAos(), 100);

    window.addEventListener("load", initAos);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      window.clearTimeout(refreshSoon);
      window.clearTimeout(refreshLater);
      window.removeEventListener("load", initAos);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  useEffect(() => {
    initAos();
  }, [pathname]);

  return null;
}
