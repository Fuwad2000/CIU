import type { AosScrollAnimation } from "@frontend/components/aos/config";
import type { Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const scrollViewport = {
  once: true,
  amount: 0.14,
} as const;

export const mobileScrollViewport = {
  once: true,
  amount: 0.1,
} as const;

export const sectionTransition = {
  duration: 0.65,
  ease: easeOut,
} as const;

export const mobileSectionTransition = {
  duration: 0.52,
  ease: easeOut,
} as const;

export const itemTransition = {
  duration: 0.55,
  ease: easeOut,
} as const;

export const mobileItemTransition = {
  duration: 0.45,
  ease: easeOut,
} as const;

export const staggerChildren = 0.07;
export const mobileStaggerChildren = 0.045;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const fadeDownVariants = {
  hidden: { opacity: 0, y: -18 },
  visible: { opacity: 1, y: 0 },
};

export const subtleFadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

export const zoomInUpVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 22 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export const flipUpVariants = {
  hidden: { opacity: 0, rotateX: 18, y: 16 },
  visible: { opacity: 1, rotateX: 0, y: 0 },
};

const scrollAnimationVariants: Record<AosScrollAnimation, Variants> = {
  "fade-up": fadeUpVariants,
  "fade-in": fadeInVariants,
  "fade-down": fadeDownVariants,
  "zoom-in": scaleInVariants,
  "zoom-in-up": zoomInUpVariants,
  "flip-up": flipUpVariants,
};

export function getScrollAnimationVariants(animation: AosScrollAnimation) {
  return scrollAnimationVariants[animation];
}

export function getStaggerContainerVariants(mobile = false) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mobile ? mobileStaggerChildren : staggerChildren,
      },
    },
  };
}

export const staggerContainerVariants = getStaggerContainerVariants();

export const heroFadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.28, ease: easeOut },
  },
};
