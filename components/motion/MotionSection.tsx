"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUpVariants,
  sectionTransition,
  subtleFadeVariants,
  viewport,
} from "@/components/motion/variants";
import { useIsMobile } from "@/components/motion/useSubtleMotion";

export default function MotionSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduceMotion) {
    return className ? <div className={className}>{children}</div> : children;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={isMobile ? subtleFadeVariants : fadeUpVariants}
      transition={
        isMobile
          ? { duration: 0.5, ease: sectionTransition.ease, delay }
          : { ...sectionTransition, delay }
      }
    >
      {children}
    </motion.div>
  );
}
