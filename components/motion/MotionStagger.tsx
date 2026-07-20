"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUpVariants,
  itemTransition,
  staggerContainerVariants,
  subtleFadeVariants,
  viewport,
} from "@/components/motion/variants";
import { useIsMobile } from "@/components/motion/useSubtleMotion";

export function MotionStagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={isMobile ? subtleFadeVariants : fadeUpVariants}
      transition={
        isMobile ? { duration: 0.45, ease: itemTransition.ease } : itemTransition
      }
    >
      {children}
    </motion.div>
  );
}
