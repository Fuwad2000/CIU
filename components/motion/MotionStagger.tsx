"use client";

import { Children, createContext, useContext, type ReactNode } from "react";
import {
  aosDefaults,
  pickScrollAnimation,
  type AosScrollAnimation,
} from "@/components/aos/config";
import { useReducedScrollMotion } from "@/components/motion/useReducedScrollMotion";
import { useAosRefresh } from "@/components/aos/useAosRefresh";

const StaggerIndexContext = createContext(0);

export function MotionStagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedScrollMotion();
  useAosRefresh();
  const items = Children.toArray(children);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {items.map((child, index) => (
        <StaggerIndexContext.Provider key={index} value={index}>
          {child}
        </StaggerIndexContext.Provider>
      ))}
    </div>
  );
}

export function MotionItem({
  children,
  className = "",
  animation,
  delay,
}: {
  children: ReactNode;
  className?: string;
  animation?: AosScrollAnimation;
  delay?: number;
}) {
  const reduceMotion = useReducedScrollMotion();
  const staggerIndex = useContext(StaggerIndexContext);
  const resolvedAnimation = animation ?? pickScrollAnimation(staggerIndex);
  const resolvedDelay = delay ?? staggerIndex * aosDefaults.staggerStep;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      data-aos={resolvedAnimation}
      data-aos-duration={aosDefaults.duration}
      data-aos-delay={resolvedDelay}
      data-aos-easing={aosDefaults.easing}
      data-aos-once="true"
    >
      {children}
    </div>
  );
}
