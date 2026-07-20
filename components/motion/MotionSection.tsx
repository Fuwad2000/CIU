"use client";

import {
  aosDefaults,
  type AosScrollAnimation,
} from "@/components/aos/config";
import { useReducedScrollMotion } from "@/components/motion/useReducedScrollMotion";
import { useAosRefresh } from "@/components/aos/useAosRefresh";

export default function MotionSection({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: AosScrollAnimation;
}) {
  const reduceMotion = useReducedScrollMotion();
  useAosRefresh();

  if (reduceMotion) {
    return className ? <div className={className}>{children}</div> : children;
  }

  return (
    <div
      className={className}
      data-aos={animation}
      data-aos-duration={aosDefaults.duration}
      data-aos-delay={delay}
      data-aos-easing={aosDefaults.easing}
      data-aos-once="true"
    >
      {children}
    </div>
  );
}
