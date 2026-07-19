import CommunitySupport from "@/components/services/CommunitySupport";
import EducationServices from "@/components/services/EducationServices";
import FamilyServices from "@/components/services/FamilyServices";
import MembershipPreview from "@/components/services/MembershipPreview";
import ServicesCTA from "@/components/services/ServicesCTA";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesNotice from "@/components/services/ServicesNotice";
import ServicesProcess from "@/components/services/ServicesProcess";
import YouthServices from "@/components/services/YouthServices";
import { MotionSection } from "@/components/motion";

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
        <YouthServices />
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
