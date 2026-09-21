"use client";

import LightboxTrigger from "@frontend/components/lightbox/LightboxTrigger";
import {
  cloudinaryFullSize,
  cloudinaryLightboxPreview,
  isCloudinaryUrl,
} from "@frontend/lib/cloudinary";
import Image, { type ImageProps, type StaticImageData } from "next/image";

export type ZoomableImageProps = ImageProps & {
  zoomable?: boolean;
  caption?: string;
};

function resolveSrc(src: ImageProps["src"]): string {
  if (typeof src === "string") return src;
  return (src as StaticImageData).src;
}

function resolveLightboxSrc(src: ImageProps["src"]): string {
  const resolved = resolveSrc(src);
  return isCloudinaryUrl(resolved) ? cloudinaryFullSize(resolved) : resolved;
}

function resolveLightboxPreviewSrc(src: ImageProps["src"]): string | undefined {
  const resolved = resolveSrc(src);
  if (!isCloudinaryUrl(resolved)) return resolved;
  return cloudinaryLightboxPreview(resolved);
}

export default function ZoomableImage({
  zoomable = true,
  caption,
  className = "",
  alt = "",
  src,
  fill,
  quality = 90,
  ...props
}: ZoomableImageProps) {
  if (!zoomable || !src) {
    return (
      <Image className={className} alt={alt} src={src} fill={fill} quality={quality} {...props} />
    );
  }

  const image = (
    <Image
      className={`${className}${className.includes("pointer-events") ? "" : " pointer-events-none"}`}
      alt={alt}
      src={src}
      fill={fill}
      quality={quality}
      {...props}
    />
  );

  if (fill) {
    return (
      <LightboxTrigger
        src={resolveLightboxSrc(src)}
        previewSrc={resolveLightboxPreviewSrc(src)}
        alt={typeof alt === "string" ? alt : ""}
        caption={caption}
        className="absolute inset-0"
      >
        {image}
      </LightboxTrigger>
    );
  }

  return (
    <LightboxTrigger
      src={resolveLightboxSrc(src)}
      previewSrc={resolveLightboxPreviewSrc(src)}
      alt={typeof alt === "string" ? alt : ""}
      caption={caption}
      className="relative inline-block"
    >
      {image}
    </LightboxTrigger>
  );
}
