import Link from "next/link";
import CopyButton from "@/components/donate/CopyButton";
import ETransferPanel from "@/components/donate/ETransferPanel";
import { homeBtnOutlineClass } from "@/components/home/homeUi";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { donateContent } from "@/content/DonateContent";
import {
  ArrowUpRight,
  Banknote,
  Building2,
  HeartHandshake,
  Mail,
  ShieldCheck,
} from "lucide-react";

function DonateHero() {
  const { hero } = donateContent;

  return (
    <section className="relative overflow-hidden border-b border-brand/10 bg-brand-gradient text-white">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0, transparent 42%), radial-gradient(circle at 80% 0%, #d4ad4a 0, transparent 36%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <MotionSection className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand-light uppercase sm:text-sm">
            <HeartHandshake className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {hero.label}
          </p>
          <div className="gold-accent-bar mt-4" aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {hero.heading}
          </h1>
          {hero.badge ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-gold-light" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-[0.16em] uppercase sm:text-xs">
                {hero.badge}
              </span>
            </p>
          ) : null}
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/92 sm:text-base lg:text-lg">
            {hero.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#e-transfer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-premium-lg transition hover:bg-brand-light hover:shadow-premium-xl sm:px-8 sm:py-4 sm:text-base"
            >
              Give by e-Transfer
            </Link>
            <Link
              href="#paypal"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base"
            >
              Donate with PayPal
            </Link>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}

function ImpactAreas() {
  const { impact } = donateContent;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
      <MotionSection className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {impact.heading}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
          {impact.intro}
        </p>
      </MotionSection>

      <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {impact.areas.map((area) => (
          <MotionItem
            key={area.title}
            className="rounded-3xl border border-border/80 bg-surface p-6 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-premium-lg"
          >
            <div className="gold-accent-bar mb-4 w-10" aria-hidden="true" />
            <h3 className="text-base font-semibold text-foreground sm:text-lg">{area.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {area.description}
            </p>
          </MotionItem>
        ))}
      </MotionStagger>
    </section>
  );
}

function PayPalPanel() {
  const { paypal } = donateContent;

  return (
    <section
      id="paypal"
      className="rounded-[2rem] border border-border/80 bg-surface p-6 shadow-premium sm:p-8 lg:p-10"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase sm:text-sm">
            Online Giving
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {paypal.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {paypal.description}
          </p>
        </div>
        <div className="inline-flex rounded-2xl border border-[#0070ba]/15 bg-[#0070ba]/5 p-4 text-[#0070ba]">
          <Banknote className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border/80 bg-background/70 p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase sm:text-sm">
          {paypal.emailLabel}
        </p>
        <p className="mt-3 break-all text-xl font-semibold text-foreground sm:text-2xl">
          {paypal.email}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <CopyButton
            value={paypal.email}
            label={paypal.copyEmailLabel}
            copiedLabel={paypal.copiedLabel}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={paypal.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0070ba] px-7 py-3.5 text-sm font-semibold text-white shadow-premium transition hover:bg-[#005ea6] sm:px-8 sm:py-4 sm:text-base"
        >
          {paypal.buttonLabel}
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </a>
        <p className="text-sm text-muted">{paypal.note}</p>
      </div>
    </section>
  );
}

function OtherMethods() {
  const methods = donateContent.otherMethods;

  return (
    <MotionStagger className="grid gap-5 lg:grid-cols-3">
      {methods.map((method) => (
        <MotionItem
          key={method.id}
          className="rounded-3xl border border-border/80 bg-surface p-6 shadow-premium sm:p-7"
        >
          <div className="inline-flex rounded-xl bg-brand/10 p-3 text-brand">
            {method.id === "cheque" ? (
              <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : method.id === "in-person" ? (
              <Building2 className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <HeartHandshake className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">{method.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            {method.description}
          </p>
          {"href" in method && method.href ? (
            <a
              href={method.href}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand transition hover:text-brand-dark"
            >
              {method.detail}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          ) : (
            <p className="mt-4 text-sm font-medium text-foreground">{method.detail}</p>
          )}
        </MotionItem>
      ))}
    </MotionStagger>
  );
}

export default function DonatePage() {
  const { methodsIntro, receipt, faq, closingCta } = donateContent;

  return (
    <div className="bg-background">
      <DonateHero />
      <ImpactAreas />

      <section className="border-y border-border/70 bg-section-warm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <MotionSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {methodsIntro.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
              {methodsIntro.subheading}
            </p>
          </MotionSection>

          <div className="mt-10 space-y-6">
            <MotionSection>
              <ETransferPanel />
            </MotionSection>
            <MotionSection>
              <PayPalPanel />
            </MotionSection>
            <OtherMethods />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <MotionSection className="rounded-3xl border border-border/80 bg-surface p-6 shadow-premium sm:p-8">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{receipt.heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{receipt.body}</p>
            <Link href={receipt.contactHref} className={`${homeBtnOutlineClass} mt-6`}>
              {receipt.contactLabel}
            </Link>
          </MotionSection>

          <MotionSection className="rounded-3xl border border-border/80 bg-surface p-6 shadow-premium sm:p-8">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{faq.heading}</h2>
            <div className="mt-6 space-y-5">
              {faq.items.map((item) => (
                <div key={item.question} className="border-b border-border/70 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div
          className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <MotionSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{closingCta.heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/92 sm:text-base lg:text-lg">
              {closingCta.body}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={closingCta.primary.href}
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-brand shadow-premium-lg transition hover:bg-brand-light"
              >
                {closingCta.primary.label}
              </Link>
              <Link
                href={closingCta.secondary.href}
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/15"
              >
                {closingCta.secondary.label}
              </Link>
            </div>
          </MotionSection>
        </div>
      </section>
    </div>
  );
}
