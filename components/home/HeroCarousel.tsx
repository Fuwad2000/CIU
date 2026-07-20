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
import SectionContainer from "@/components/home/SectionContainer";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/home/icons";
import { easeOut } from "@/components/motion/variants";
import { useSubtleMotion } from "@/components/motion/useSubtleMotion";
import { heroSlides, type HeroSlide } from "@/content/HomeContent";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 56;

const heroSpring = { type: "spring" as const, stiffness: 110, damping: 22 };

const slideContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.24, ease: easeOut },
  },
};

const labelVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const headingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

const headingWordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: heroSpring,
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const buttonsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.02 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

function isArabicText(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

function arabicLabelClassName() {
  return "w-fit max-w-full text-left font-[family-name:var(--font-arabic)] text-3xl font-semibold text-brand-light drop-shadow-sm sm:text-4xl lg:text-5xl";
}

function slideButtonClass(variant: "primary" | "gold") {
  if (variant === "gold") {
    return "inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold text-white shadow-premium-lg transition hover:bg-gold-dark hover:shadow-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base";
  }

  return "inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand shadow-premium-lg transition hover:bg-brand-light hover:shadow-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base";
}

function SlideContent({
  slide,
  simpleMotion,
}: {
  slide: HeroSlide;
  simpleMotion: boolean;
}) {
  const headingWords = slide.heading.split(" ");
  const arabicLabel = slide.label ? isArabicText(slide.label) : false;

  const content = (
    <div className="max-w-2xl">
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
      <h1
        className={`${slide.label ? "mt-5" : ""} text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl`}
      >
        {headingWords.map((word, index) => (
          <span key={`${word}-${index}`} className="mr-[0.28em] inline-block">
            {word}
          </span>
        ))}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/92 sm:text-base lg:text-lg">
        {slide.text}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

  if (simpleMotion) {
    return content;
  }

  return (
    <motion.div
      variants={slideContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {slide.label ? (
        <motion.p
          variants={labelVariants}
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
      ) : null}

      <motion.h1
        variants={headingContainerVariants}
        className={`${slide.label ? "mt-5" : ""} text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl`}
      >
        {headingWords.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={headingWordVariants}
            className="mr-[0.28em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        variants={textVariants}
        className="mt-4 max-w-xl text-sm leading-relaxed text-white/92 sm:text-base lg:text-lg"
      >
        {slide.text}
      </motion.p>

      <motion.div
        variants={buttonsContainerVariants}
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      >
        <motion.div variants={buttonVariants}>
          <Link
            href={slide.primaryButton.href}
            className={slideButtonClass(slide.primaryButton.variant)}
          >
            {slide.primaryButton.label}
          </Link>
        </motion.div>
        {slide.secondaryButton ? (
          <motion.div variants={buttonVariants}>
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

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const simpleMotion = useSubtleMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const totalSlides = heroSlides.length;

  const goToSlide = useCallback((index: number) => {
    setActiveIndex((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const previousSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (isPaused || simpleMotion) return;

    const timer = window.setInterval(nextSlide, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, simpleMotion, nextSlide]);

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
      className="relative h-[560px] touch-pan-y overflow-hidden sm:h-[620px] lg:h-[700px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          } ${simpleMotion ? "transition-none" : "ease-in-out"}`}
        >
          <Image
            src={slide.imageSrc}
            alt={slide.imageAlt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover ${
              index === activeIndex && !simpleMotion ? "animate-hero-ken-burns" : ""
            }`}
          />
          <div className="absolute inset-0 bg-hero-carousel-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        </div>
      ))}

      <SectionContainer className="relative z-10 flex h-full items-center py-10">
        <div aria-live="polite">
          {simpleMotion ? (
            <SlideContent slide={currentSlide} simpleMotion />
          ) : (
            <AnimatePresence initial={false} mode="sync">
              <SlideContent
                key={activeIndex}
                slide={currentSlide}
                simpleMotion={false}
              />
            </AnimatePresence>
          )}
        </div>
      </SectionContainer>

      {!simpleMotion ? (
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/10"
          aria-hidden="true"
        >
          <div
            key={`progress-${activeIndex}`}
            className="h-full w-full animate-hero-progress bg-gold"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          />
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={previousSlide}
        className="absolute top-1/2 left-3 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white shadow-premium backdrop-blur-md transition hover:border-white/50 hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={nextSlide}
        className="absolute top-1/2 right-3 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white shadow-premium backdrop-blur-md transition hover:border-white/50 hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 sm:bottom-10">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}: ${slide.heading}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              index === activeIndex
                ? "h-2.5 w-10 bg-white shadow-premium"
                : "h-2.5 w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
