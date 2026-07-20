import MediaHero from "@/components/media/MediaHero";
import MediaHubCards, { MediaFeaturedStrip } from "@/components/media/MediaHubCards";
import { MotionSection } from "@/components/motion";
import { mediaHubContent } from "@/content/MediaContent";

export default function MediaPage() {
  const { hero } = mediaHubContent;

  return (
    <div className="overflow-x-hidden bg-background">
      <MediaHero {...hero} />

      <MotionSection>
        <MediaHubCards />
      </MotionSection>

      <MediaFeaturedStrip />
    </div>
  );
}
