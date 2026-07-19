export const easeOut = [0.22, 1, 0.36, 1] as const;

export const viewport = {
  once: true,
  amount: 0.18,
} as const;

export const sectionTransition = {
  duration: 0.55,
  ease: easeOut,
} as const;

export const itemTransition = {
  duration: 0.45,
  ease: easeOut,
} as const;

export const staggerChildren = 0.08;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96 },
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
