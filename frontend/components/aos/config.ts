/** Vertical and opacity-only AOS animations — no left/right to avoid horizontal overflow. */
export const aosScrollAnimations = [
  "fade-up",
  "fade-in",
  "zoom-in",
  "fade-down",
  "zoom-in-up",
  "flip-up",
] as const;

/** Safer subset on small screens — subtle motion, no flips or large zoom. */
export const aosMobileScrollAnimations = ["fade-up", "fade-in", "fade-down"] as const;

export type AosScrollAnimation = (typeof aosScrollAnimations)[number];

export const aosDefaults = {
  duration: 650,
  mobileDuration: 520,
  easing: "ease-out-cubic",
  offset: 56,
  mobileOffset: 28,
  once: true,
  staggerStep: 70,
  mobileStaggerStep: 45,
} as const;

export function pickScrollAnimation(index: number, mobile = false): AosScrollAnimation {
  const pool = mobile ? aosMobileScrollAnimations : aosScrollAnimations;
  return pool[index % pool.length];
}

export function getAosDuration(mobile = false) {
  return mobile ? aosDefaults.mobileDuration : aosDefaults.duration;
}

export function getAosOffset(mobile = false) {
  return mobile ? aosDefaults.mobileOffset : aosDefaults.offset;
}

export function getAosStaggerStep(mobile = false) {
  return mobile ? aosDefaults.mobileStaggerStep : aosDefaults.staggerStep;
}
