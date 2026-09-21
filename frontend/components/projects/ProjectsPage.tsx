import FeaturedProject from "@frontend/components/projects/FeaturedProject";
import ProjectImpact from "@frontend/components/projects/ProjectImpact";
import ProjectsCTA from "@frontend/components/projects/ProjectsCTA";
import ProjectsGrid from "@frontend/components/projects/ProjectsGrid";
import ProjectsHero from "@frontend/components/projects/ProjectsHero";
import { MotionSection } from "@frontend/components/motion";

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
