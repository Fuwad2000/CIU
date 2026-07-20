import SectionContainer from "@/components/home/SectionContainer";
import { homeTrustStripContent } from "@/content/HomeContent";

export default function HomeTrustStrip() {
  return (
    <section className="relative z-30 -mt-10 sm:-mt-12 lg:-mt-14" aria-label="CIU highlights">
      <SectionContainer>
        <div className="overflow-hidden rounded-3xl border border-border/80 bg-surface/95 shadow-premium-xl backdrop-blur-md">
          <div className="h-1 bg-gold-gradient" />
          <ul className="grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-border/70">
            {homeTrustStripContent.items.map((item) => (
              <li
                key={item}
                className="flex items-center justify-center gap-2.5 border-b border-border/70 px-4 py-4 last:border-b-0 odd:border-r sm:border-b-0 sm:py-5 sm:odd:border-r-0"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-gold-gradient shadow-sm"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold tracking-wide text-foreground sm:text-sm">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
}
