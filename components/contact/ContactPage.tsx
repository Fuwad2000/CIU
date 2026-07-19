import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import SocialIcon from "@/components/SocialIcon";
import { contactContent } from "@/content/ContactContent";
import { ArrowUpRight, Mail, MapPin, Phone, Share2 } from "lucide-react";

function ContactDetail({
  icon,
  label,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex gap-4 p-5 sm:p-6 ${className}`}>
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase sm:text-sm">
          {label}
        </p>
        <div className="mt-1.5 text-sm leading-relaxed text-foreground sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { hero, address, phone, email, social, map } = contactContent;

  return (
    <div className="bg-background">
      <section className="border-b border-brand/10 bg-brand text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <MotionSection>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.14em] text-brand-light uppercase sm:text-base">
              <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {hero.label}
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {hero.heading}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/92 sm:text-base lg:text-lg">
              {hero.intro}
            </p>
          </div>
          </MotionSection>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <MotionSection>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="border-b border-border bg-background/80 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold text-foreground sm:text-xl">
              Contact Information
            </h2>
            <p className="mt-1 text-sm text-muted sm:text-base">
              Visit us, call, email, or connect through social media.
            </p>
          </div>

          <MotionStagger className="grid divide-y divide-border sm:grid-cols-2 xl:grid-cols-4 xl:divide-y-0">
            <MotionItem>
              <ContactDetail
                label={address.label}
                icon={<MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
                className="xl:border-r xl:border-border"
              >
                <p>
                  {address.lines[0]}
                  <br />
                  {address.lines[1]}
                </p>
                <a
                  href={address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-semibold text-brand transition hover:text-brand-dark"
                >
                  Open in Google Maps
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </ContactDetail>
            </MotionItem>

            <MotionItem>
              <ContactDetail
                label={phone.label}
                icon={<Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
                className="xl:border-r xl:border-border"
              >
                <a
                  href={phone.href}
                  className="font-semibold text-foreground transition hover:text-brand"
                >
                  {phone.value}
                </a>
              </ContactDetail>
            </MotionItem>

            <MotionItem>
              <ContactDetail
                label={email.label}
                icon={<Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
                className="xl:border-r xl:border-border"
              >
                <a
                  href={email.href}
                  className="break-all font-semibold text-foreground transition hover:text-brand"
                >
                  {email.value}
                </a>
              </ContactDetail>
            </MotionItem>

            <MotionItem>
              <ContactDetail
                label={social.label}
                icon={<Share2 className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
              >
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {social.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand/15 bg-brand/5 text-brand transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <SocialIcon platform={link.platform} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </ContactDetail>
            </MotionItem>
          </MotionStagger>
        </div>

        <MotionStagger className="mt-8 grid min-h-[560px] gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <MotionItem>
            <ContactForm className="min-h-[560px]" />
          </MotionItem>

          <MotionItem>
          <div className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="h-1 bg-gold" />
            <div className="border-b border-border px-6 py-5 sm:px-8">
              <p className="text-sm font-semibold tracking-[0.12em] text-brand uppercase">
                Our Location
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
                {map.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {map.description}
              </p>
            </div>

            <div className="relative min-h-[280px] flex-1 bg-stone-100">
              <iframe
                src={address.mapEmbedUrl}
                title="Canadian Islamic Union location on Google Maps"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-border bg-background/70 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm text-muted">
                {address.lines[0]}, {address.lines[1]}
              </p>
              <Link
                href={address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-brand-dark"
              >
                View directions
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
          </MotionItem>
        </MotionStagger>
        </MotionSection>
      </section>
    </div>
  );
}
