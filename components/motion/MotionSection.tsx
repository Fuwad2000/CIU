"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUpVariants,
  sectionTransition,
  viewport,
} from "@/components/motion/variants";

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

  if (reduceMotion) {
    return className ? <div className={className}>{children}</div> : children;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUpVariants}
      transition={{ ...sectionTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
