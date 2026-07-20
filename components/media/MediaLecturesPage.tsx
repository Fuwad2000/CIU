import MediaHero from "@/components/media/MediaHero";
import MediaLectureList from "@/components/media/MediaLectureList";
import { MotionSection } from "@/components/motion";
import { mediaLecturesPageContent } from "@/content/MediaContent";

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
