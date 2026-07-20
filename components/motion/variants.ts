export const easeOut = [0.22, 1, 0.36, 1] as const;

export const viewport = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -48px 0px",
} as const;

export const sectionTransition = {
  duration: 0.7,
  ease: easeOut,
} as const;

export const itemTransition = {
  duration: 0.55,
  ease: easeOut,
} as const;

export const staggerChildren = 0.06;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 14 },
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
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
    },
  },
};

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
