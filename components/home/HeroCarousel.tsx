"use client";

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
import { heroSlides, type HeroSlide } from "@/content/HomeContent";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 50;

function slideButtonClass(variant: "primary" | "gold") {
  if (variant === "gold") {
    return "inline-flex items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base";
  }

  return "inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand shadow-sm transition hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base";
}

function SlideContent({ slide }: { slide: HeroSlide }) {
  return (
    <div className="max-w-2xl">
      {slide.label ? (
        <p className="text-sm font-semibold tracking-[0.16em] text-brand-light uppercase sm:text-base">
          {slide.label}
        </p>
      ) : null}
      <h1
        className={`${slide.label ? "mt-3" : ""} text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl`}
      >
        {slide.heading}
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
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
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
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const timer = window.setInterval(nextSlide, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, reduceMotion, nextSlide]);

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
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;

    const delta = touchStartX.current - event.changedTouches[0].clientX;
    touchStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) nextSlide();
    else previousSlide();
  };

  const currentSlide = heroSlides[activeIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative h-[560px] overflow-hidden sm:h-[620px] lg:h-[700px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          } ${reduceMotion ? "transition-none" : ""}`}
        >
          <Image
            src={slide.imageSrc}
            alt={slide.imageAlt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      <SectionContainer className="relative z-10 flex h-full items-center py-10">
        <div aria-live="off">
          <SlideContent slide={currentSlide} />
        </div>
      </SectionContainer>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={previousSlide}
        className="absolute top-1/2 left-3 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5 sm:h-12 sm:w-12"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={nextSlide}
        className="absolute top-1/2 right-3 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:h-12 sm:w-12"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}: ${slide.heading}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              index === activeIndex
                ? "w-8 bg-white"
                : "w-2.5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
