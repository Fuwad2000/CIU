import MediaGalleryGrid from "@frontend/components/media/MediaGalleryGrid";
import MediaHero from "@frontend/components/media/MediaHero";
import { MotionSection } from "@frontend/components/motion";
import { mediaImagesPageContent } from "@frontend/content/MediaContent";

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
