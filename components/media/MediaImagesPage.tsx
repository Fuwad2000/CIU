import MediaGalleryGrid from "@/components/media/MediaGalleryGrid";
import MediaHero from "@/components/media/MediaHero";
import { MotionSection } from "@/components/motion";
import { mediaImagesPageContent } from "@/content/MediaContent";

export default function MediaImagesPage() {
  return (
    <div className="overflow-x-hidden bg-background">
      <MediaHero {...mediaImagesPageContent.hero} />

      <MotionSection>
        <MediaGalleryGrid />
      </MotionSection>
    </div>
  );
}
