"use client";

import Image from "next/image";
import { useEffect, type ReactNode } from "react";
import AdminBrandMark from "@/components/admin/AdminBrandMark";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";
import { applyAdminTheme, readStoredAdminTheme } from "@/lib/portal/admin-theme";

const heroImage =
  "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785021386/about-community_peqwp7.jpg";
const mosaicImages = [
  {
    src: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020442/home_hero1_xnh8ra.png",
    alt: "Community gathering at CIU",
  },
  {
    src: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785028168/kids-01_oldgl7.jpg",
    alt: "Children in a CIU class",
  },
  {
    src: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020760/IMG_4997_plqf9s.jpg",
    alt: "Families gathering at CIU",
  },
];

export default function AdminAuthFrame({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("admin-type");
    applyAdminTheme(readStoredAdminTheme());
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(28rem,1fr)]">
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <Image
          src={heroImage}
          alt="CIU community members learning together"
          fill
          priority
          sizes="58vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-brand-dark/70 to-black/40" />
        <div className="relative flex h-full min-h-screen flex-col justify-between p-10 xl:p-14">
          <div className="flex items-center gap-3">
            <AdminBrandMark size={44} />
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">Canadian Islamic Union</p>
              <p className="text-xs text-white/70">Staff portal</p>
            </div>
          </div>
          <div className="max-w-lg">
            <p className="text-sm font-semibold tracking-[0.18em] text-gold-light uppercase">Assalamu alaikum</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white xl:text-5xl">
              A quiet place to serve the community
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Manage events, messages, and programs for families across CIU — all in one calm, simple workspace.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {mosaicImages.map((image) => (
                <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                  <Image src={image.src} alt={image.alt} fill sizes="180px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen flex-col bg-surface">
        <div className="relative h-44 overflow-hidden sm:h-56 lg:hidden">
          <Image
            src={heroImage}
            alt="CIU community members learning together"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/35 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-5">
            <div className="flex items-center gap-3">
              <AdminBrandMark size={40} />
              <div>
                <p className="text-sm font-semibold text-white">Canadian Islamic Union</p>
                <p className="text-xs text-white/80">Staff portal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-4 py-3 sm:px-6">
          <AdminThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-5 pb-12 sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </section>
    </div>
  );
}

export function MicrosoftMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 21 21" className="h-4 w-4" fill="none">
      <rect width="9.5" height="9.5" x="0.5" y="0.5" fill="#F25022" />
      <rect width="9.5" height="9.5" x="11" y="0.5" fill="#7FBA00" />
      <rect width="9.5" height="9.5" x="0.5" y="11" fill="#00A4EF" />
      <rect width="9.5" height="9.5" x="11" y="11" fill="#FFB900" />
    </svg>
  );
}
