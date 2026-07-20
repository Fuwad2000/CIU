import AboutPreview from "@/components/home/AboutPreview";
import FeaturedPrograms from "@/components/home/FeaturedPrograms";
import GalleryPreview from "@/components/home/GalleryPreview";
import HeroCarousel from "@/components/home/HeroCarousel";
import ImpactSection from "@/components/home/ImpactSection";
import LeadershipPreview from "@/components/home/LeadershipPreview";
import MissionPillars from "@/components/home/MissionPillars";
import PrayerTimes from "@/components/home/PrayerTimes";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroCarousel />
      <PrayerTimes />
      <AboutPreview />
      <LeadershipPreview />
      <MissionPillars />
      <FeaturedPrograms />
      <UpcomingEvents />
      <ImpactSection />
      <GalleryPreview />
    </div>
  );
}
