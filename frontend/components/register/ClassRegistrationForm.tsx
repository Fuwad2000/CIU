"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { FormSubmitModal, useFormSubmitModal } from "@frontend/components/ui/FormSubmitModal";
import { useToast } from "@frontend/components/ui/ToastProvider";
import { formInputClassName, formShellClassName } from "@frontend/lib/formStyles";
import { kidsAgeRanges, type RegistrationProgram } from "@shared/types";

const programs: { id: RegistrationProgram; label: string; detail: string }[] = [
  {
    id: "quran",
    label: "Weekly Quran Class",
    detail: "Tuesday & Thursday evenings — open to adults and all learners",
  },
  {
    id: "kids",
    label: "CIU Kids / Weekend School",
    detail: "Grades 1–12, weekends",
  },
];

const grades = Array.from({ length: 12 }, (_, index) => String(index + 1));

const initialState = {
  program: "" as RegistrationProgram | "",
  studentName: "",
  studentAge: "",
  grade: "",
  parentName: "",
  email: "",
  phone: "",
  notes: "",
};

export default function ClassRegistrationForm() {
  const searchParams = useSearchParams();
  const showToast = useToast();
  const submit = useFormSubmitModal();
  const [formState, setFormState] = useState(initialState);

  const requestedProgram = searchParams.get("program");

  useEffect(() => {
    if (requestedProgram === "quran" || requestedProgram === "kids") {
      setFormState((current) => ({
        ...current,
        program: requestedProgram,
        parentName: requestedProgram === "quran" ? "" : current.parentName,
        grade: requestedProgram === "quran" ? "" : current.grade,
        studentAge: requestedProgram === "quran" ? "" : current.studentAge,
      }));
    }
  }, [requestedProgram]);

  const isKids = formState.program === "kids";
  const isQuran = formState.program === "quran";

  const selectedProgram = useMemo(
    () => programs.find((item) => item.id === formState.program),
    [formState.program]
  );

  const updateField = (field: keyof typeof initialState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.program) {
      showToast("Please choose a class.");
      return;
    }
    if (
      !submit.begin(
        "Sending your registration",
        "Please wait. This can take a few seconds — do not click again."
      )
    ) {
      return;
    }
    const payload = isQuran
      ? {
          program: formState.program,
          studentName: formState.studentName,
          email: formState.email,
          phone: formState.phone,
          notes: formState.notes,
        }
      : formState;
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const payloadJson = (await response.json().catch(() => ({}))) as { error?: string };
        submit.fail(
          "Registration not sent",
          payloadJson.error ?? "Could not submit registration. Please try again."
        );
        return;
      }
      setFormState({
        ...initialState,
        program: formState.program,
      });
      submit.succeed(
        "Registration received",
        "Thank you. We received your class registration and sent a confirmation to your email."
      );
    } catch {
      submit.fail("Registration not sent", "Could not submit registration. Please try again.");
    }
  };

  return (
    <div className={formShellClassName}>
      <div className="h-1 bg-brand" />
      <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8" aria-busy={submit.busy}>
        <div>
          <p className="text-sm font-semibold tracking-[0.12em] text-brand uppercase">
            Class Registration
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
            Register for CIU Classes
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            {isQuran
              ? "Quran class is for adults and learners of all ages. Classes run Tuesday and Thursday evenings. No parent or guardian information is needed."
              : isKids
                ? "Weekend school is for children in grades 1–12 and needs a parent or guardian. Registrations should include the student's age, grade, and a parent or guardian contact."
                : "Quran class is for adults and learners of all ages. Weekend school is for children in grades 1–12 and needs a parent or guardian."}
          </p>
        </div>

        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-2 text-sm font-medium text-foreground">Choose a program</legend>
          {programs.map((program) => (
            <label
              key={program.id}
              className={`cursor-pointer rounded-2xl border px-4 py-4 transition ${
                formState.program === program.id
                  ? "border-brand bg-brand/5"
                  : "border-border bg-background hover:border-brand/40"
              }`}
            >
              <input
                type="radio"
                name="program"
                value={program.id}
                checked={formState.program === program.id}
                onChange={() =>
                  setFormState((current) => ({
                    ...initialState,
                    program: program.id,
                    email: current.email,
                    phone: current.phone,
                    notes: current.notes,
                    studentName: current.studentName,
                  }))
                }
                className="sr-only"
                required
              />
              <span className="block font-semibold text-foreground">{program.label}</span>
              <span className="mt-1 block text-sm text-muted">{program.detail}</span>
            </label>
          ))}
        </fieldset>

        {selectedProgram ? (
          <p className="rounded-xl bg-brand-light/60 px-4 py-3 text-sm text-brand-dark">
            {isQuran
              ? "Weekly Quran class — Tuesday and Thursday evenings, open to adults and learners of all ages. No parent information needed."
              : "CIU Kids / Weekend School — grades 1–12. Parent or guardian name, student age, and grade are required."}
          </p>
        ) : null}

        {formState.program ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {isKids ? "Student name" : "Full name"}
                </span>
                <input
                  required
                  value={formState.studentName}
                  onChange={(event) => updateField("studentName", event.target.value)}
                  className={formInputClassName}
                />
              </label>
              {isKids ? (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Student age</span>
                  <select
                    required
                    value={formState.studentAge}
                    onChange={(event) => updateField("studentAge", event.target.value)}
                    className={formInputClassName}
                  >
                    <option value="">Select age range</option>
                    {kidsAgeRanges.map((range) => (
                      <option key={range} value={range}>
                        {range} years
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className={formInputClassName}
                  />
                </label>
              )}
            </div>

            {isKids ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Grade</span>
                  <select
                    required
                    value={formState.grade}
                    onChange={(event) => updateField("grade", event.target.value)}
                    className={formInputClassName}
                  >
                    <option value="">Select grade</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        Grade {grade}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">
                    Parent / guardian name
                  </span>
                  <input
                    required
                    value={formState.parentName}
                    onChange={(event) => updateField("parentName", event.target.value)}
                    className={formInputClassName}
                  />
                </label>
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {isKids ? (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className={formInputClassName}
                  />
                </label>
              ) : null}
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Phone</span>
                <input
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className={formInputClassName}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Notes</span>
              <textarea
                rows={4}
                value={formState.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className={`${formInputClassName} min-h-[120px] resize-y`}
              />
            </label>

            <button
              type="submit"
              disabled={submit.busy}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:opacity-70"
            >
              <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {submit.phase === "submitting" ? "Submitting..." : "Submit registration"}
            </button>
          </>
        ) : null}
      </form>
      <FormSubmitModal
        phase={submit.phase}
        title={submit.title}
        message={submit.message}
        onClose={submit.close}
      />
    </div>
  );
}
