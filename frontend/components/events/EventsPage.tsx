import { Suspense } from "react";
import EventAnnouncementBar from "@frontend/components/events/EventAnnouncementBar";
import EventCalendarPreview from "@frontend/components/events/EventCalendarPreview";
import EventCategories from "@frontend/components/events/EventCategories";
import EventNewsletter from "@frontend/components/events/EventNewsletter";
import EventRegistrationInfo from "@frontend/components/events/EventRegistrationInfo";
import EventsFinalCTA from "@frontend/components/events/EventsFinalCTA";
import EventsHero from "@frontend/components/events/EventsHero";
import FeaturedEvent from "@frontend/components/events/FeaturedEvent";
import HostEventCTA from "@frontend/components/events/HostEventCTA";
import PastEvents from "@frontend/components/events/PastEvents";
import RecurringPrograms from "@frontend/components/events/RecurringPrograms";
import UpcomingEvents from "@frontend/components/events/UpcomingEvents";
import { MotionSection } from "@frontend/components/motion";

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
