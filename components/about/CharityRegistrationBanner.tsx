import { CheckIcon } from "@/components/about/icons";
import { MotionSection } from "@/components/motion";
import { aboutContent } from "@/content/AboutContent";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CharityRegistrationBanner() {
  const { label, title, registrationLabel, registrationNumber, description, highlights } =
    aboutContent.charityRegistration;

  return (
    <section className="relative overflow-hidden border-y border-border/80 bg-section-warm">
      <div
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-brand/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <MotionSection>
          <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface shadow-premium-xl">
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(23,77,50,0.04)_0%,transparent_42%,rgba(184,137,31,0.06)_100%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23174d32' stroke-width='1'%3E%3Cpath d='M40 0l11.5 11.5L40 23 28.5 11.5 40 0zM0 40l11.5-11.5L23 40l-11.5 11.5L0 40zm80 0l-11.5-11.5L57 40l11.5 11.5L80 40zM40 57l11.5 11.5L40 80 28.5 68.5 40 57z'/%3E%3C/g%3E%3C/svg%3E\")",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute left-0 top-0 h-20 w-20 rounded-tl-[2rem] border-l-[3px] border-t-[3px] border-gold/70"
              aria-hidden="true"
            />

            <div className="relative grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <div className="border-b border-border/70 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
                <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] text-brand uppercase sm:text-sm">
                  <ShieldCheck className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </p>
                <div className="gold-accent-bar mt-5 w-10" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {title}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                  {description}
                </p>
                <ul className="mt-7 space-y-3">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-sm leading-relaxed text-muted sm:text-base"
                    >
                      <CheckIcon className="mt-0.5 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
                <Image
                  src="/media/pictures/azhar_canada_14.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/88 via-brand/78 to-brand-dark/92" />
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,173,74,0.22),transparent_55%)]"
                  aria-hidden="true"
                />

                <div className="relative flex h-full items-center justify-center p-8 sm:p-10 lg:p-12">
                  <div className="relative w-full max-w-sm">
                    <div
                      className="absolute -inset-1 rounded-[1.65rem] bg-gold/30 blur-xl"
                      aria-hidden="true"
                    />
                    <div className="relative overflow-hidden rounded-[1.55rem] border border-white/20 bg-white/10 p-8 shadow-premium-xl backdrop-blur-md sm:p-10">
                      <div
                        className="absolute left-0 top-0 h-16 w-16 rounded-tl-[1.55rem] border-l-[3px] border-t-[3px] border-gold/70"
                        aria-hidden="true"
                      />
                      <div className="relative text-center">
                        <div className="mx-auto inline-flex rounded-2xl border border-gold/35 bg-gold/15 p-4">
                          <ShieldCheck
                            className="h-8 w-8 text-gold-light"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-brand-light uppercase sm:text-sm">
                          {registrationLabel}
                        </p>
                        <p className="mt-4 font-mono text-2xl font-semibold tracking-[0.08em] text-white sm:text-3xl">
                          {registrationNumber}
                        </p>
                        <p className="mt-5 text-sm leading-relaxed text-white/78">
                          Canada Revenue Agency
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
