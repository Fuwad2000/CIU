"use client";

import { useState } from "react";

export default function CopyButton({
  value,
  label,
  copiedLabel,
  className = "",
}: {
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center rounded-xl border border-brand/20 bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand transition hover:border-brand/35 hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
