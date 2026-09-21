import AboutPreview from "@frontend/components/home/AboutPreview";
import FeaturedPrograms from "@frontend/components/home/FeaturedPrograms";
import GalleryPreview from "@frontend/components/home/GalleryPreview";
import HeroCarousel from "@frontend/components/home/HeroCarousel";
import HomeCTASection from "@frontend/components/home/HomeCTASection";
import HomeTrustStrip from "@frontend/components/home/HomeTrustStrip";
import ImpactSection from "@frontend/components/home/ImpactSection";
import LeadershipPreview from "@frontend/components/home/LeadershipPreview";
import MissionPillars from "@frontend/components/home/MissionPillars";
import PrayerTimes from "@frontend/components/home/PrayerTimes";
import UpcomingEvents from "@frontend/components/home/UpcomingEvents";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroCarousel />
      <HomeTrustStrip />
      <PrayerTimes />
      <AboutPreview />
      <LeadershipPreview />
      <MissionPillars />
      <FeaturedPrograms />
      <UpcomingEvents />
      <ImpactSection />
      <HomeCTASection />
      <GalleryPreview />
    </div>
  );
}
