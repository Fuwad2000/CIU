import CommunitySupport from "@frontend/components/services/CommunitySupport";
import EducationServices from "@frontend/components/services/EducationServices";
import FamilyServices from "@frontend/components/services/FamilyServices";
import MembershipPreview from "@frontend/components/services/MembershipPreview";
import ServicesCTA from "@frontend/components/services/ServicesCTA";
import ServicesGrid from "@frontend/components/services/ServicesGrid";
import ServicesHero from "@frontend/components/services/ServicesHero";
import ServicesNotice from "@frontend/components/services/ServicesNotice";
import ServicesProcess from "@frontend/components/services/ServicesProcess";
import { MotionSection } from "@frontend/components/motion";

export default function ServicesPage() {
  return (
    <div className="overflow-x-hidden bg-background">
      <ServicesHero />

      <MotionSection>
        <CommunitySupport />
      </MotionSection>

      <MotionSection>
        <ServicesGrid />
      </MotionSection>

      <MotionSection>
        <FamilyServices />
      </MotionSection>

      <MotionSection>
        <EducationServices />
      </MotionSection>

      <MotionSection>
        <MembershipPreview />
      </MotionSection>

      <MotionSection>
        <ServicesProcess />
      </MotionSection>

      <ServicesNotice />
      <ServicesCTA />
    </div>
  );
}
