"use client";

import { useState, type FormEvent } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminRoleGate from "@/components/admin/AdminRoleGate";
import { useAdminSession } from "@/components/admin/AdminSessionContext";
import { adminFetch } from "@/lib/portal/client";
import { formInputClassName, formShellClassName } from "@/lib/formStyles";

export default function AdminEmailTestPage() {
  const { profile } = useAdminSession();
  const [to, setTo] = useState(profile.email);
  const [subject, setSubject] = useState("CIU ACS test");
  const [html, setHtml] = useState("<p>Assalamu alaikum. This is the first CIU ACS test.</p>");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setResult("");
    setSending(true);
    try {
      const payload = await adminFetch<{ sent: boolean; messageId?: string; status: string }>(
        "/api/admin/email/test",
        {
          method: "POST",
          body: JSON.stringify({ to, subject, html }),
        }
      );
      setResult(`Sent. Status ${payload.status}${payload.messageId ? ` · ${payload.messageId}` : ""}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the test email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminRoleGate allow={profile.role === "superadmin"}>
      <div>
        <AdminPageHeader
          eyebrow="Staff"
          title="Email test"
          description="Sends one message through Azure Communication Services from donotreply@ciucanada.ca. Use this only to confirm email is working."
        />
        <form onSubmit={(event) => void handleSubmit(event)} className={`${formShellClassName} max-w-xl p-5 sm:p-6`}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Send to</span>
            <input
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className={formInputClassName}
              type="email"
              required
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Subject</span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className={formInputClassName}
              required
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Message</span>
            <textarea
              value={html}
              onChange={(event) => setHtml(event.target.value)}
              className={`${formInputClassName} min-h-32`}
              required
            />
          </label>
          {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
          {result ? <p className="mt-3 text-sm text-brand">{result}</p> : null}
          <button
            type="submit"
            disabled={sending}
            className="mt-5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send test email"}
          </button>
        </form>
      </div>
    </AdminRoleGate>
  );
}
