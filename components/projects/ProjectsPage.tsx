import FeaturedProject from "@/components/projects/FeaturedProject";
import ProjectImpact from "@/components/projects/ProjectImpact";
import ProjectsCTA from "@/components/projects/ProjectsCTA";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsHero from "@/components/projects/ProjectsHero";
import { MotionSection } from "@/components/motion";

export default function ProjectsPage() {
  return (
    <div className="overflow-x-hidden bg-background">
      <ProjectsHero />

      <MotionSection>
        <FeaturedProject />
      </MotionSection>

      <MotionSection>
        <ProjectsGrid />
      </MotionSection>

      <MotionSection>
        <ProjectImpact />
      </MotionSection>

      <ProjectsCTA />
    </div>
  );
}
