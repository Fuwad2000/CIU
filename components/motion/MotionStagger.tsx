"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUpVariants,
  itemTransition,
  staggerContainerVariants,
  viewport,
} from "@/components/motion/variants";

export function MotionStagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

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

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      transition={itemTransition}
    >
      {children}
    </motion.div>
  );
}
