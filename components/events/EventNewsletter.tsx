"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import { homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionSection } from "@/components/motion";
import { eventNewsletterContent } from "@/content/EventsContent";

export default function EventNewsletter() {
  /*
    // Connect to the approved newsletter provider after privacy and consent requirements are confirmed.
  */
  const { heading, intro, consent, buttonLabel } = eventNewsletterContent;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim()) {
      setError("Please enter your full name and email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
      <SectionContainer>
        <MotionSection className="mx-auto max-w-2xl rounded-3xl border border-border/80 bg-background p-6 shadow-premium sm:p-8">
          <div className="text-center">
            <div className="mx-auto inline-flex rounded-2xl bg-brand/10 p-3 text-brand">
              <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">{heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>
          </div>

          {submitted ? (
            <div
              className="mt-8 rounded-2xl border border-brand/20 bg-brand/5 px-5 py-4 text-center text-sm text-foreground sm:text-base"
              role="status"
            >
              Thank you. Your subscription request has been received locally. Event updates will be
              connected once the approved newsletter provider is configured.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
              <div>
                <label htmlFor="event-newsletter-name" className="text-sm font-semibold text-foreground">
                  Full Name
                </label>
                <input
                  id="event-newsletter-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15 sm:text-base"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="event-newsletter-email" className="text-sm font-semibold text-foreground">
                  Email Address
                </label>
                <input
                  id="event-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15 sm:text-base"
                  autoComplete="email"
                />
              </div>
              {error ? (
                <p className="text-sm text-gold-dark" role="alert">
                  {error}
                </p>
              ) : null}
              <button type="submit" className={`${homeBtnPrimaryClass} w-full sm:w-auto`}>
                {buttonLabel}
              </button>
              <p className="text-xs leading-relaxed text-muted">{consent}</p>
            </form>
          )}
        </MotionSection>
      </SectionContainer>
    </section>
  );
}
