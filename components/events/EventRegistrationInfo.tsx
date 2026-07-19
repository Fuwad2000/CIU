import { Info } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import { eventRegistrationInfoContent } from "@/content/EventsContent";

export default function EventRegistrationInfo() {
  const { heading, points, closing } = eventRegistrationInfoContent;

  return (
    <section className="pb-14 sm:pb-16 lg:pb-20">
      <SectionContainer>
        <div className="rounded-2xl border border-brand/20 bg-background px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Info className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">{heading}</h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted sm:text-base">
                {points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-medium text-foreground sm:text-base">{closing}</p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
