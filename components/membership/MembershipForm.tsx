"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import {
  membershipContent,
  type MembershipInterest,
  type MembershipType,
} from "@/content/MembershipContent";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  membershipType: MembershipType;
  householdSize: string;
  interests: MembershipInterest[];
  message: string;
  agreement: boolean;
};

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  membershipType: "individual",
  householdSize: "",
  interests: [],
  message: "",
  agreement: false,
};

const inputClassName =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-base";

export default function MembershipForm({ className = "" }: { className?: string }) {
  const { form } = membershipContent;
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const toggleInterest = (interest: MembershipInterest) => {
    setFormState((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }));
  };

  const shellClassName = `overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium ${className}`;

  if (submitted) {
    return (
      <div className={shellClassName}>
        <div className="h-1 bg-brand" />
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10 sm:py-16">
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
            {form.resetLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClassName}>
      <div className="h-1 bg-brand" />
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-sm font-semibold tracking-[0.12em] text-brand uppercase">
          Apply Today
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
          {form.heading}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{form.description}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                {form.fields.fullName.label}
              </span>
              <input
                type="text"
                name="fullName"
                required
                value={formState.fullName}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, fullName: event.target.value }))
                }
                placeholder={form.fields.fullName.placeholder}
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
                onChange={(event) =>
                  setFormState((current) => ({ ...current, email: event.target.value }))
                }
                placeholder={form.fields.email.placeholder}
                className={inputClassName}
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
                onChange={(event) =>
                  setFormState((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder={form.fields.phone.placeholder}
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                {form.fields.city.label}{" "}
                <span className="font-normal text-muted">{form.fields.city.optionalLabel}</span>
              </span>
              <input
                type="text"
                name="city"
                value={formState.city}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, city: event.target.value }))
                }
                placeholder={form.fields.city.placeholder}
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                {form.fields.membershipType.label}
              </span>
              <select
                name="membershipType"
                required
                value={formState.membershipType}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    membershipType: event.target.value as MembershipType,
                  }))
                }
                className={inputClassName}
              >
                {form.fields.membershipType.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                {form.fields.householdSize.label}{" "}
                <span className="font-normal text-muted">
                  {form.fields.householdSize.optionalLabel}
                </span>
              </span>
              <input
                type="number"
                name="householdSize"
                min={1}
                max={20}
                value={formState.householdSize}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, householdSize: event.target.value }))
                }
                placeholder={form.fields.householdSize.placeholder}
                className={inputClassName}
              />
            </label>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-foreground">
              {form.fields.interests.label}
            </legend>
            <p className="mt-1 text-sm text-muted">{form.fields.interests.description}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {form.fields.interests.options.map((option) => {
                const checked = formState.interests.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      checked
                        ? "border-brand bg-brand/5 text-foreground"
                        : "border-border bg-background text-muted hover:border-brand/25"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={option.value}
                      checked={checked}
                      onChange={() => toggleInterest(option.value)}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand/30"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              {form.fields.message.label}{" "}
              <span className="font-normal text-muted">{form.fields.message.optionalLabel}</span>
            </span>
            <textarea
              name="message"
              rows={4}
              value={formState.message}
              onChange={(event) =>
                setFormState((current) => ({ ...current, message: event.target.value }))
              }
              placeholder={form.fields.message.placeholder}
              className={`${inputClassName} min-h-[120px] resize-y`}
            />
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-border/80 bg-background/80 p-4">
            <input
              type="checkbox"
              name="agreement"
              required
              checked={formState.agreement}
              onChange={(event) =>
                setFormState((current) => ({ ...current, agreement: event.target.checked }))
              }
              className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-brand/30"
            />
            <span className="text-sm leading-relaxed text-muted">{form.fields.agreement.label}</span>
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto sm:text-base"
          >
            <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {form.submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
