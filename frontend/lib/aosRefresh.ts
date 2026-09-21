import AOS from "aos";

function shouldSkipAos() {
  return (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Reveal in-viewport elements AOS missed — prevents blank sections on mobile nav. */
export function revealStuckAosElements() {
  if (shouldSkipAos()) return;

  const viewportHeight = window.innerHeight;

  document
    .querySelectorAll<HTMLElement>("[data-aos].aos-init:not(.aos-animate)")
    .forEach((element) => {
      const rect = element.getBoundingClientRect();
      const inView = rect.top < viewportHeight * 0.92 && rect.bottom > 0;

      if (inView) {
        element.classList.add("aos-animate");
      }
    });
}

/** Re-scan the DOM and trigger in-view AOS animations. */
export function refreshAos() {
  if (shouldSkipAos()) return;

  try {
    AOS.refresh();
  } catch {
    // AOS may not be initialized yet on the first pass.
  }

  revealStuckAosElements();
}

/** Run several refreshes so late-mounted [data-aos] nodes still animate in. */
export function scheduleAosRefreshes() {
  if (shouldSkipAos()) return;

  refreshAos();

  requestAnimationFrame(() => {
    requestAnimationFrame(refreshAos);
  });

  for (const delay of [50, 150, 350, 700, 1200, 1800]) {
    window.setTimeout(refreshAos, delay);
  }
}

export function markAosFallback() {
  if (shouldSkipAos()) return;
  revealStuckAosElements();
  document.documentElement.classList.add("aos-fallback");
}

export function clearAosFallback() {
  document.documentElement.classList.remove("aos-fallback");
}
