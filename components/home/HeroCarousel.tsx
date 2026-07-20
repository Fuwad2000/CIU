"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/home/icons";
import { useIsMobile } from "@/components/motion/useSubtleMotion";
import { useReducedMotion } from "framer-motion";
import { heroSlides, type HeroSlide } from "@/content/HomeContent";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 56;

/** Slow, elegant easing for hero typography. */
const majesticEase = [0.16, 1, 0.3, 1] as const;

function createHeroVariants(isMobile: boolean) {
  const wordLift = isMobile ? 20 : 34;
  const labelLift = isMobile ? 14 : 22;
  const stagger = isMobile ? 0.09 : 0.13;
  const wordStagger = isMobile ? 0.07 : 0.11;

  return {
    slideContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          delayChildren: 0.12,
        },
      },
      exit: {
        opacity: 0,
        y: -12,
        transition: { duration: 0.35, ease: majesticEase },
      },
    },
    label: {
      hidden: { opacity: 0, y: labelLift, scale: 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: isMobile ? 0.75 : 0.95, ease: majesticEase },
      },
    },
    accentBar: {
      hidden: { opacity: 0, scaleX: 0 },
      visible: {
        opacity: 1,
        scaleX: 1,
        transition: {
          duration: isMobile ? 0.8 : 1.05,
          ease: majesticEase,
          delay: 0.08,
        },
      },
    },
    headingContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: wordStagger, delayChildren: 0.06 },
      },
    },
    headingWord: {
      hidden: { opacity: 0, y: wordLift, scale: 0.94 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: isMobile ? 0.72 : 0.92,
          ease: majesticEase,
        },
      },
    },
    text: {
      hidden: { opacity: 0, y: isMobile ? 14 : 22, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: isMobile ? 0.7 : 0.88,
          ease: majesticEase,
          delay: 0.04,
        },
      },
    },
    buttonsContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.06 },
      },
    },
    button: {
      hidden: { opacity: 0, y: isMobile ? 12 : 18, scale: 0.94 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: majesticEase },
      },
    },
  };
}

function isArabicText(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

function arabicLabelClassName() {
  return "w-fit max-w-full text-left font-[family-name:var(--font-arabic)] text-2xl font-semibold text-brand-light drop-shadow-sm sm:text-4xl lg:text-5xl xl:text-6xl";
}

function slideButtonClass(variant: "primary" | "gold") {
  if (variant === "gold") {
    return "inline-flex w-full items-center justify-center rounded-xl bg-gold px-7 py-4 text-sm font-semibold text-white shadow-premium-lg transition hover:bg-gold-dark hover:shadow-premium-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:text-base";
  }

  return "inline-flex w-full items-center justify-center rounded-xl bg-white px-7 py-4 text-sm font-semibold text-brand shadow-premium-lg transition hover:bg-brand-light hover:shadow-premium-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:text-base";
}

function SlideContent({
  slide,
  isMobile,
  staticOnly = false,
}: {
  slide: HeroSlide;
  isMobile: boolean;
  staticOnly?: boolean;
}) {
  const variants = createHeroVariants(isMobile);
  const headingWords = slide.heading.split(" ");
  const arabicLabel = slide.label ? isArabicText(slide.label) : false;

  const content = (
    <div className="max-w-3xl">
      {slide.label ? (
        <p
          dir={arabicLabel ? "rtl" : "ltr"}
          lang={arabicLabel ? "ar" : "en"}
          className={
            arabicLabel
              ? arabicLabelClassName()
              : "text-sm font-semibold tracking-[0.16em] text-brand-light uppercase sm:text-base"
          }
        >
          {arabicLabel ? (
            <span className="sr-only">As-salamu alaykum. </span>
          ) : null}
          {slide.label}
        </p>
      ) : null}
      <div
        className={`gold-accent-bar origin-left ${slide.label ? "mt-4 sm:mt-5" : ""}`}
        aria-hidden="true"
      />
      <h1
        className={`${slide.label ? "mt-4 sm:mt-5" : "mt-4"} text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl`}
      >
        {headingWords.map((word, index) => (
          <span key={`${word}-${index}`} className="mr-[0.28em] inline-block">
            {word}
          </span>
        ))}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg lg:text-xl">
        {slide.text}
      </p>
      <div className="mt-5 flex flex-col gap-3 pb-1 sm:mt-6 sm:flex-row sm:flex-wrap sm:pb-0">
        <Link href={slide.primaryButton.href} className={slideButtonClass(slide.primaryButton.variant)}>
          {slide.primaryButton.label}
        </Link>
        {slide.secondaryButton ? (
          <Link
            href={slide.secondaryButton.href}
            className={slideButtonClass(slide.secondaryButton.variant)}
          >
            {slide.secondaryButton.label}
          </Link>
        ) : null}
      </div>
    </div>
  );

  if (staticOnly) {
    return content;
  }

  return (
    <motion.div
      variants={variants.slideContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-3xl [perspective:900px]"
    >
      {slide.label ? (
        <>
          <motion.p
            variants={variants.label}
            dir={arabicLabel ? "rtl" : "ltr"}
            lang={arabicLabel ? "ar" : "en"}
            className={
              arabicLabel
                ? arabicLabelClassName()
                : "text-sm font-semibold tracking-[0.16em] text-brand-light uppercase sm:text-base"
            }
          >
            {arabicLabel ? (
              <span className="sr-only">As-salamu alaykum. </span>
            ) : null}
            {slide.label}
          </motion.p>
          <motion.div
            variants={variants.accentBar}
            className="gold-accent-bar mt-4 origin-left sm:mt-5"
            aria-hidden="true"
          />
        </>
      ) : (
        <motion.div
          variants={variants.accentBar}
          className="gold-accent-bar origin-left"
          aria-hidden="true"
        />
      )}

      <motion.h1
        variants={variants.headingContainer}
        className={`${slide.label ? "mt-4 sm:mt-5" : "mt-4"} text-2xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl`}
      >
        {headingWords.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={variants.headingWord}
            className="mr-[0.28em] inline-block origin-bottom will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        variants={variants.text}
        className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-4 sm:text-base lg:text-lg"
      >
        {slide.text}
      </motion.p>

      <motion.div
        variants={variants.buttonsContainer}
        className="mt-5 flex flex-col gap-3 pb-1 sm:mt-6 sm:flex-row sm:flex-wrap sm:pb-0"
      >
        <motion.div variants={variants.button}>
          <Link
            href={slide.primaryButton.href}
            className={slideButtonClass(slide.primaryButton.variant)}
          >
            {slide.primaryButton.label}
          </Link>
        </motion.div>
        {slide.secondaryButton ? (
          <motion.div variants={variants.button}>
            <Link
              href={slide.secondaryButton.href}
              className={slideButtonClass(slide.secondaryButton.variant)}
            >
              {slide.secondaryButton.label}
            </Link>
          </motion.div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

const heroContentShellClass =
  "relative z-10 mx-auto h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8";

function HeroCarouselNav({
  activeIndex,
  totalSlides,
  isPaused,
  reduceMotion,
  onPrevious,
  onNext,
  onGoTo,
}: {
  activeIndex: number;
  totalSlides: number;
  isPaused: boolean;
  reduceMotion: boolean | null;
  onPrevious: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}) {
  const navButtonClass =
    "group flex h-10 w-10 items-center justify-center rounded-xl transition duration-300 hover:bg-white/10 sm:h-11 sm:w-11";

  return (
    <div
      className="mt-7 inline-flex max-w-full flex-wrap items-center gap-2.5 rounded-2xl border border-white/15 bg-black/35 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:mt-8 sm:gap-3 sm:p-2.5"
      aria-label="Carousel controls"
    >
      <button
        type="button"
        aria-label="Previous slide"
        onClick={onPrevious}
        className={navButtonClass}
      >
        <ChevronLeftIcon
          className="h-5 w-5 text-brand-light transition duration-300 group-hover:-translate-x-0.5 group-hover:text-white sm:h-[1.35rem] sm:w-[1.35rem]"
          strokeWidth={1.5}
        />
      </button>

      <div
        className="hidden h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:block"
        aria-hidden="true"
      />

      <div className="flex items-center gap-2 px-1 sm:gap-2.5 sm:px-2">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}: ${slide.heading}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onGoTo(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light ${
                isActive
                  ? "h-2 w-9 bg-gold-gradient shadow-[0_0_14px_rgba(184,137,31,0.55)]"
                  : "h-2 w-2 bg-white/35 hover:scale-110 hover:bg-white/65"
              }`}
            >
              {isActive && !reduceMotion ? (
                <span
                  key={`dot-progress-${activeIndex}-${isPaused ? "paused" : "running"}`}
                  className="absolute inset-y-0 left-0 w-full origin-left animate-hero-progress bg-white/35"
                  style={{ animationPlayState: isPaused ? "paused" : "running" }}
                  aria-hidden="true"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className="hidden h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:block"
        aria-hidden="true"
      />

      <div className="hidden items-baseline gap-1.5 px-1 sm:flex">
        <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
          Slide
        </span>
        <span className="text-sm font-semibold tabular-nums text-white">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="text-white/35"> / </span>
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>

      <div
        className="hidden h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:block"
        aria-hidden="true"
      />

      <button
        type="button"
        aria-label="Next slide"
        onClick={onNext}
        className={navButtonClass}
      >
        <ChevronRightIcon
          className="h-5 w-5 text-brand-light transition duration-300 group-hover:translate-x-0.5 group-hover:text-white sm:h-[1.35rem] sm:w-[1.35rem]"
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
}

function supportsFinePointerHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isPausedRef = useRef(false);
  const totalSlides = heroSlides.length;

  const setPaused = useCallback((paused: boolean) => {
    isPausedRef.current = paused;
    setIsPaused(paused);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (reduceMotion) return;

    const handleVisibilityChange = () => {
      setPaused(document.hidden);
    };

    const timer = window.setInterval(() => {
      if (isPausedRef.current) return;
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, AUTOPLAY_MS);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeIndex, reduceMotion, setPaused, totalSlides]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previousSlide();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.targetTouches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (!touchStart.current) return;

    const touch = event.changedTouches[0];
    if (!touch) {
      touchStart.current = null;
      return;
    }

    const deltaX = touchStart.current.x - touch.clientX;
    const deltaY = touchStart.current.y - touch.clientY;
    touchStart.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX > 0) nextSlide();
    else previousSlide();
  };

  const currentSlide = heroSlides[activeIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative h-[min(88svh,580px)] touch-pan-y overflow-hidden sm:h-[min(78vh,680px)] lg:h-[min(82vh,760px)] xl:h-[820px]"
      onMouseEnter={() => {
        if (supportsFinePointerHover()) setPaused(true);
      }}
      onMouseLeave={() => {
        if (supportsFinePointerHover()) setPaused(false);
      }}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.imageSrc}
            alt={slide.imageAlt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover ${
              index === activeIndex && !isMobile && !reduceMotion
                ? "animate-hero-ken-burns"
                : ""
            }`}
          />
          <div className="absolute inset-0 bg-hero-carousel-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        </div>
      ))}

      <div className={heroContentShellClass}>
        <div className="flex h-full flex-col justify-start pt-[clamp(5rem,19vh,8.75rem)] pb-[clamp(3.5rem,9vh,5.5rem)]">
          <div aria-live="polite" className="w-full max-w-3xl">
            {reduceMotion ? (
              <SlideContent slide={currentSlide} isMobile={isMobile} staticOnly />
            ) : (
              <AnimatePresence mode="sync">
                <SlideContent
                  key={activeIndex}
                  slide={currentSlide}
                  isMobile={isMobile}
                />
              </AnimatePresence>
            )}
          </div>

          <HeroCarouselNav
            activeIndex={activeIndex}
            totalSlides={totalSlides}
            isPaused={isPaused}
            reduceMotion={reduceMotion}
            onPrevious={previousSlide}
            onNext={nextSlide}
            onGoTo={goToSlide}
          />
        </div>
      </div>

      {!reduceMotion ? (
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-0.5 bg-white/10"
          aria-hidden="true"
        >
          <div
            key={`progress-${activeIndex}`}
            className="h-full w-full animate-hero-progress bg-gold-gradient"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          />
        </div>
      ) : null}
    </section>
  );
}
