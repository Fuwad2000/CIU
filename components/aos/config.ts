/** Vertical and opacity-only AOS animations — no left/right to avoid horizontal overflow. */
export const aosScrollAnimations = [
  "fade-up",
  "fade-in",
  "zoom-in",
  "fade-down",
  "zoom-in-up",
  "flip-up",
] as const;

export type AosScrollAnimation = (typeof aosScrollAnimations)[number];

export const aosDefaults = {
  duration: 650,
  easing: "ease-out-cubic",
  offset: 56,
  once: true,
  staggerStep: 70,
} as const;

export function pickScrollAnimation(index: number): AosScrollAnimation {
  return aosScrollAnimations[index % aosScrollAnimations.length];
}
