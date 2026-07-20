"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function useSubtleMotion() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  return Boolean(reduceMotion || isMobile);
}
