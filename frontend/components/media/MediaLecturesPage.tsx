import MediaHero from "@frontend/components/media/MediaHero";
import MediaLectureList from "@frontend/components/media/MediaLectureList";
import { MotionSection } from "@frontend/components/motion";
import { mediaLecturesPageContent } from "@frontend/content/MediaContent";

export default function MediaLecturesPage() {
  return (
    <div className="overflow-x-hidden bg-background">
      <MediaHero {...mediaLecturesPageContent.hero} />

      <MotionSection>
        <MediaLectureList />
      </MotionSection>
    </div>
  );
}
