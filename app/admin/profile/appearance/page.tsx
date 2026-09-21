"use client";

import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import AdminThemePicker from "@frontend/components/admin/AdminThemePicker";

export default function AdminProfileAppearancePage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Your account"
        title="Appearance"
        description="Choose a light or dark workspace. This only changes how the portal looks on this device."
      />
      <section className="rounded-3xl border border-border/80 bg-background p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold text-foreground">Theme</h2>
        <p className="mt-1 text-sm text-muted">Your choice is saved in this browser.</p>
        <div className="mt-5">
          <AdminThemePicker />
        </div>
      </section>
    </div>
  );
}
