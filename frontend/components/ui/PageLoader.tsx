"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ciuLogoSrc, siteContent } from "@frontend/content/SiteContent";

type PageLoaderProps = {
  fullScreen?: boolean;
};

export function PageLoader({ fullScreen = true }: PageLoaderProps) {
  const containerClass = fullScreen
    ? "fixed inset-0 z-[300] flex items-center justify-center bg-background/95 backdrop-blur-md"
    : "flex min-h-[50vh] w-full items-center justify-center py-16";

  return (
    <div className={containerClass} role="status" aria-live="polite" aria-label="Loading page">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 px-6"
      >
        <div className="relative">
          <motion.span
            aria-hidden="true"
            className="absolute -inset-5 rounded-full border border-brand/15 bg-brand/5"
            animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-brand/10 bg-surface p-3 shadow-premium-lg">
            <Image
              src={ciuLogoSrc}
              alt={siteContent.logoAlt}
              width={80}
              height={80}
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="gold-accent-bar gold-accent-bar-lg" aria-hidden="true" />
          <div className="relative h-1.5 w-52 overflow-hidden rounded-full bg-brand-light sm:w-60">
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-brand-gradient"
              animate={{ x: ["-120%", "280%"] }}
              transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Loading
          </p>
        </div>
      </motion.div>
    </div>
  );
}
