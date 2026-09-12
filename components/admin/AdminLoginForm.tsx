"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ciuLogoSrc } from "@/content/SiteContent";
import { formInputClassName } from "@/lib/formStyles";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setSubmitting(false);
    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      setError(payload.error ?? "Could not sign in.");
      return;
    }
    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-section-warm px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-premium"
      >
        <Image src={ciuLogoSrc} alt="CIU" width={48} height={48} />
        <h1 className="mt-5 text-2xl font-semibold text-foreground">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Staff only. Set <code>ADMIN_PASSWORD</code> in the environment before using this portal.
        </p>
        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={formInputClassName}
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-70"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
