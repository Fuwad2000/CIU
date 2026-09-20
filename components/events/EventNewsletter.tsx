"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { FormSubmitModal, useFormSubmitModal } from "@/components/ui/FormSubmitModal";
import SectionContainer from "@/components/home/SectionContainer";
import { homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionSection } from "@/components/motion";
import { eventNewsletterContent } from "@/content/EventsContent";
import { formInputClassName } from "@/lib/formStyles";

export default function EventNewsletter() {
  const { heading, intro, consent, buttonLabel } = eventNewsletterContent;
  const submit = useFormSubmitModal();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    if (
      !submit.begin(
        "Saving your sign-up",
        "Please wait. This can take a few seconds — do not click again."
      )
    ) {
      return;
    }
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          source: "events",
          agreement: true,
        }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        submit.fail("Could not subscribe", payload.error ?? "Could not subscribe. Please try again.");
        return;
      }
      setFullName("");
      setEmail("");
      submit.succeed(
        "You’re subscribed",
        "Thank you. We added you to the CIU newsletter and sent a confirmation to your email."
      );
    } catch {
      submit.fail("Could not subscribe", "Could not subscribe. Please try again.");
    }
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

          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate aria-busy={submit.busy}>
            <div>
              <label htmlFor="event-newsletter-name" className="text-sm font-semibold text-foreground">
                Full Name
              </label>
              <input
                id="event-newsletter-name"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className={`mt-2 ${formInputClassName}`}
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
                className={`mt-2 ${formInputClassName}`}
                autoComplete="email"
              />
            </div>
            {error ? (
              <p className="text-sm text-gold-dark" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" disabled={submit.busy} className={`${homeBtnPrimaryClass} w-full sm:w-auto disabled:opacity-70`}>
              {submit.phase === "submitting" ? "Sending..." : buttonLabel}
            </button>
            <p className="text-xs leading-relaxed text-muted">{consent}</p>
          </form>
        </MotionSection>
      </SectionContainer>
      <FormSubmitModal
        phase={submit.phase}
        title={submit.title}
        message={submit.message}
        onClose={submit.close}
      />
    </section>
  );
}
