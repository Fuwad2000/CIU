import { Suspense } from "react";
import EventAnnouncementBar from "@/components/events/EventAnnouncementBar";
import EventCalendarPreview from "@/components/events/EventCalendarPreview";
import EventCategories from "@/components/events/EventCategories";
import EventNewsletter from "@/components/events/EventNewsletter";
import EventRegistrationInfo from "@/components/events/EventRegistrationInfo";
import EventsFinalCTA from "@/components/events/EventsFinalCTA";
import EventsHero from "@/components/events/EventsHero";
import FeaturedEvent from "@/components/events/FeaturedEvent";
import HostEventCTA from "@/components/events/HostEventCTA";
import PastEvents from "@/components/events/PastEvents";
import RecurringPrograms from "@/components/events/RecurringPrograms";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import { MotionSection } from "@/components/motion";

function UpcomingEventsFallback() {
  return <div className="home-section bg-section-warm" aria-hidden="true" />;
}

export default function EventsPage() {
  return (
    <div className="overflow-x-hidden bg-background">
      <EventsHero />
      <EventAnnouncementBar />

      <MotionSection>
        <FeaturedEvent />
      </MotionSection>

      <Suspense fallback={<UpcomingEventsFallback />}>
        <UpcomingEvents />
      </Suspense>

      <MotionSection>
        <RecurringPrograms />
      </MotionSection>

      <MotionSection>
        <EventCalendarPreview />
      </MotionSection>

      <MotionSection>
        <EventCategories />
      </MotionSection>

      <MotionSection>
        <PastEvents />
      </MotionSection>

      <MotionSection>
        <HostEventCTA />
      </MotionSection>

      <EventRegistrationInfo />

      <MotionSection>
        <EventNewsletter />
      </MotionSection>

      <EventsFinalCTA />
    </div>
  );
}
