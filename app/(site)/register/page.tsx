import type { Metadata } from "next";
import { Suspense } from "react";
import ClassRegistrationForm from "@/components/register/ClassRegistrationForm";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Class Registration | ${siteContent.shortName}`,
  description:
    "Register for CIU weekly Quran class or weekend kids school at the Canadian Islamic Centre.",
};

export default function RegisterPage() {
  return (
    <section className="bg-section-warm">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Suspense>
          <ClassRegistrationForm />
        </Suspense>
      </div>
    </section>
  );
}
