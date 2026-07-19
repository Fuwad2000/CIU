"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { contactContent } from "@/content/ContactContent";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const inputClassName =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-base";

export default function ContactForm({ className = "" }: { className?: string }) {
  const { form } = contactContent;
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const shellClassName = `flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${className}`;

  if (submitted) {
    return (
      <div className={shellClassName}>
        <div className="h-1 bg-brand" />
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-10">
          <div className="inline-flex rounded-full bg-brand/10 p-4 text-brand">
            <CheckCircle2 className="h-8 w-8" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-foreground sm:text-2xl">
            {form.successTitle}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {form.successMessage}
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormState(initialFormState);
            }}
            className="mt-8 inline-flex items-center justify-center rounded-xl border border-brand/20 bg-brand/5 px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/10 sm:text-base"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClassName}>
      <div className="h-1 bg-brand" />
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.12em] text-brand uppercase">
          Get in Touch
        </p>
        <h2 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
          {form.heading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          {form.description}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.fields.name.label}
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder={form.fields.name.placeholder}
                  className={inputClassName}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.fields.email.label}
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder={form.fields.email.placeholder}
                  className={inputClassName}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.fields.phone.label}{" "}
                  <span className="font-normal text-muted">
                    {form.fields.phone.optionalLabel}
                  </span>
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder={form.fields.phone.placeholder}
                  className={inputClassName}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.fields.subject.label}
                </span>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  placeholder={form.fields.subject.placeholder}
                  className={inputClassName}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                {form.fields.message.label}
              </span>
              <textarea
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder={form.fields.message.placeholder}
                className={`${inputClassName} min-h-[140px] resize-y`}
              />
            </label>
          </div>

          <div className="mt-auto pt-6">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto sm:text-base"
            >
              <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {form.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
