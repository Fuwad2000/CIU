"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";
import { contactContent } from "@/content/ContactContent";
import { formInputClassName } from "@/lib/formStyles";

type FormState = {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  firstName: "",
  surname: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm({ className = "" }: { className?: string }) {
  const { form } = contactContent;
  const showToast = useToast();
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      showToast(payload.error ?? "Could not send your message. Please try again.");
      return;
    }
    setFormState(initialFormState);
    showToast("Thank you. Your message has been received.");
  };

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const shellClassName = `flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${className}`;

  return (
    <div className={shellClassName}>
      <div className="h-1 bg-brand" />
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.12em] text-brand uppercase">Get in Touch</p>
        <h2 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">{form.heading}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{form.description}</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.fields.firstName.label}
                </span>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formState.firstName}
                  onChange={(event) => updateField("firstName", event.target.value)}
                  placeholder={form.fields.firstName.placeholder}
                  className={formInputClassName}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.fields.surname.label}
                </span>
                <input
                  type="text"
                  name="surname"
                  required
                  value={formState.surname}
                  onChange={(event) => updateField("surname", event.target.value)}
                  placeholder={form.fields.surname.placeholder}
                  className={formInputClassName}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  className={formInputClassName}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.fields.phone.label}
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formState.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder={form.fields.phone.placeholder}
                  className={formInputClassName}
                />
              </label>
            </div>

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
                className={formInputClassName}
              />
            </label>

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
                className={`${formInputClassName} min-h-[140px] resize-y`}
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
