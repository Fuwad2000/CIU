"use client";

import CopyButton from "@/components/donate/CopyButton";
import { donateContent } from "@/content/DonateContent";
import { Mail } from "lucide-react";
import { useMemo, useState } from "react";

export default function ETransferPanel() {
  const { eTransfer } = donateContent;
  const [name, setName] = useState("");
  const [fundId, setFundId] = useState(eTransfer.funds[0]?.id ?? "general");

  const selectedFund =
    eTransfer.funds.find((fund) => fund.id === fundId) ?? eTransfer.funds[0];

  const transferMessage = useMemo(() => {
    const trimmedName = name.trim();
    const parts = [eTransfer.memoPrefix];

    if (selectedFund && selectedFund.id !== "general") {
      parts.push(selectedFund.label);
    }

    if (trimmedName) {
      parts.push(trimmedName);
    }

    return parts.join(" - ");
  }, [eTransfer.memoPrefix, name, selectedFund]);

  return (
    <section
      id="e-transfer"
      className="relative overflow-hidden rounded-[2rem] border border-brand/20 bg-surface shadow-premium-xl"
    >
      <div className="h-1.5 bg-gold-gradient" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-brand/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-gold-dark uppercase">
              {eTransfer.badge}
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {eTransfer.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {eTransfer.description}
            </p>
          </div>
          <div className="inline-flex rounded-2xl border border-brand/15 bg-brand/5 p-4 text-brand">
            <Mail className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8">
          <div className="rounded-2xl border border-border/80 bg-background/70 p-5 sm:p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase sm:text-sm">
              {eTransfer.emailLabel}
            </p>
            <p className="mt-3 break-all text-xl font-semibold text-foreground sm:text-2xl">
              {eTransfer.email}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CopyButton
                value={eTransfer.email}
                label={eTransfer.copyEmailLabel}
                copiedLabel={eTransfer.copiedLabel}
              />
              <a
                href={`mailto:${eTransfer.email}?subject=${encodeURIComponent(eTransfer.memoPrefix)}`}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-brand/25 hover:text-brand"
              >
                Open email app
              </a>
            </div>

            <ol className="mt-8 space-y-3">
              {eTransfer.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border/80 bg-background/70 p-5 sm:p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase sm:text-sm">
              Build your transfer message
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {eTransfer.memoHint}
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="donor-name" className="text-sm font-semibold text-foreground">
                  {eTransfer.nameLabel}
                </label>
                <input
                  id="donor-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={eTransfer.namePlaceholder}
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/15 sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="donation-fund" className="text-sm font-semibold text-foreground">
                  {eTransfer.fundLabel}
                </label>
                <select
                  id="donation-fund"
                  value={fundId}
                  onChange={(event) => setFundId(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/15 sm:text-base"
                >
                  {eTransfer.funds.map((fund) => (
                    <option key={fund.id} value={fund.id}>
                      {fund.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-gold/8 p-4 sm:p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-gold-dark uppercase">
                  Paste this in your e-Transfer message
                </p>
                <p className="mt-3 break-words text-base font-semibold text-foreground sm:text-lg">
                  {transferMessage}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <CopyButton
                    value={transferMessage}
                    label={eTransfer.copyMemoLabel}
                    copiedLabel={eTransfer.copiedLabel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
