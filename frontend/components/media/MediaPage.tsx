import MediaHero from "@frontend/components/media/MediaHero";
import MediaHubCards, { MediaFeaturedStrip } from "@frontend/components/media/MediaHubCards";
import { MotionSection } from "@frontend/components/motion";
import { mediaHubContent } from "@frontend/content/MediaContent";

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
