"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { FormSubmitModal, useFormSubmitModal } from "@/components/ui/FormSubmitModal";
import {
  volunteerContent,
  type VolunteerAgeGroup,
  type VolunteerAvailability,
  type VolunteerRole,
} from "@/content/VolunteerContent";
import { formInputClassName, formShellClassName } from "@/lib/formStyles";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  ageGroup: VolunteerAgeGroup;
  roles: VolunteerRole[];
  availability: VolunteerAvailability;
  volunteerHours: "yes" | "no" | "";
  message: string;
  agreement: boolean;
};

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  ageGroup: "adult",
  roles: [],
  availability: "flexible",
  volunteerHours: "",
  message: "",
  agreement: false,
};

export default function VolunteerForm({ className = "" }: { className?: string }) {
  const { form } = volunteerContent;
  const submit = useFormSubmitModal();
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !submit.begin(
        "Sending your registration",
        "Please wait. This can take a few seconds — do not click again."
      )
    ) {
      return;
    }
    try {
      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        submit.fail(
          "Registration not sent",
          payload.error ?? "Could not send your volunteer registration. Please try again."
        );
        return;
      }
      setFormState(initialFormState);
      submit.succeed(
        "Registration received",
        "Thank you. We received your volunteer registration and sent a confirmation to your email."
      );
    } catch {
      submit.fail(
        "Registration not sent",
        "Could not send your volunteer registration. Please try again."
      );
    }
  };

  const toggleRole = (role: VolunteerRole) => {
    setFormState((current) => ({
      ...current,
      roles: current.roles.includes(role)
        ? current.roles.filter((item) => item !== role)
        : [...current.roles, role],
    }));
  };

  return (
    <div id={form.id} className={`${formShellClassName} ${className}`}>
      <div className="h-1 bg-brand" />
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-sm font-semibold tracking-[0.12em] text-brand uppercase">Serve With CIU</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{form.heading}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{form.description}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" aria-busy={submit.busy}>
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
                className={formInputClassName}
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
                onChange={(event) =>
                  setFormState((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder={form.fields.phone.placeholder}
                className={formInputClassName}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                {form.fields.ageGroup.label}
              </span>
              <select
                name="ageGroup"
                required
                value={formState.ageGroup}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    ageGroup: event.target.value as VolunteerAgeGroup,
                  }))
                }
                className={formInputClassName}
              >
                {form.fields.ageGroup.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                {form.fields.availability.label}
              </span>
              <select
                name="availability"
                required
                value={formState.availability}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    availability: event.target.value as VolunteerAvailability,
                  }))
                }
                className={formInputClassName}
              >
                {form.fields.availability.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {formState.ageGroup === "high-school" ? (
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.fields.volunteerHours.label}{" "}
                  <span className="font-normal text-muted">
                    {form.fields.volunteerHours.optionalLabel}
                  </span>
                </span>
                <select
                  name="volunteerHours"
                  value={formState.volunteerHours}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      volunteerHours: event.target.value as FormState["volunteerHours"],
                    }))
                  }
                  className={formInputClassName}
                >
                  <option value="">Select one</option>
                  {form.fields.volunteerHours.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-foreground">{form.fields.roles.label}</legend>
            <p className="mt-1 text-sm text-muted">{form.fields.roles.description}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {form.fields.roles.options.map((option) => {
                const checked = formState.roles.includes(option.value);
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
                      name="roles"
                      value={option.value}
                      checked={checked}
                      onChange={() => toggleRole(option.value)}
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
              className={`${formInputClassName} min-h-[120px] resize-y`}
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
            disabled={submit.busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-70 sm:w-auto sm:text-base"
          >
            <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {submit.phase === "submitting" ? "Sending..." : form.submitLabel}
          </button>
        </form>
        <FormSubmitModal
          phase={submit.phase}
          title={submit.title}
          message={submit.message}
          onClose={submit.close}
        />
      </div>
    </div>
  );
}
