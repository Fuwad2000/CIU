import AboutPreview from "@/components/home/AboutPreview";
import FeaturedPrograms from "@/components/home/FeaturedPrograms";
import GalleryPreview from "@/components/home/GalleryPreview";
import HeroCarousel from "@/components/home/HeroCarousel";
import ImpactSection from "@/components/home/ImpactSection";
import MissionPillars from "@/components/home/MissionPillars";
import PrayerTimes from "@/components/home/PrayerTimes";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import { MotionSection } from "@/components/motion";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroCarousel />
      <MotionSection>
        <PrayerTimes />
      </MotionSection>
      <MotionSection>
        <AboutPreview />
      </MotionSection>
      <MotionSection>
        <MissionPillars />
      </MotionSection>
      <MotionSection>
        <FeaturedPrograms />
      </MotionSection>
      <MotionSection>
        <UpcomingEvents />
      </MotionSection>
      <MotionSection>
        <ImpactSection />
      </MotionSection>
      <MotionSection>
        <GalleryPreview />
      </MotionSection>
    </div>
  );
}
