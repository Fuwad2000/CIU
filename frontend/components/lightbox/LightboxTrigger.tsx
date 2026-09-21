"use client";

import { useLightbox } from "@frontend/components/lightbox/LightboxProvider";
import { prefetchLightboxImage } from "@frontend/lib/lightboxPrefetch";
import type { KeyboardEvent, MouseEvent, ReactNode, TouchEvent } from "react";

type LightboxTriggerProps = {
  src: string;
  alt: string;
  caption?: string;
  previewSrc?: string;
  className?: string;
  children: ReactNode;
};

export default function LightboxTrigger({
  src,
  alt,
  caption,
  previewSrc,
  className = "",
  children,
}: LightboxTriggerProps) {
  const { openLightbox } = useLightbox();

  const prefetch = () => {
    prefetchLightboxImage(src);
    if (previewSrc) prefetchLightboxImage(previewSrc);
  };

  const open = () => {
    prefetch();
    openLightbox({ src, alt, caption, previewSrc });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  };

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    open();
  };

  const onPointerEnter = () => {
    prefetch();
  };

  const onTouchStart = (_event: TouchEvent<HTMLDivElement>) => {
    prefetch();
  };

  const onFocus = () => {
    prefetch();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View larger image: ${alt}`}
      className={`cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onPointerEnter={onPointerEnter}
      onTouchStart={onTouchStart}
      onFocus={onFocus}
    >
      {children}
    </div>
  );
}
