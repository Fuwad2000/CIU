import {
  Award,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Eye,
  Globe,
  GraduationCap,
  HandHeart,
  Heart,
  Landmark,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const strokeWidth = 1.75;

function createIcon(Icon: LucideIcon, defaultClassName = "h-6 w-6") {
  return function AboutIcon({
    className = defaultClassName,
    ...props
  }: LucideProps) {
    return (
      <Icon
        className={className}
        strokeWidth={strokeWidth}
        aria-hidden="true"
        {...props}
      />
    );
  };
}

export const FaithIcon = createIcon(Heart);
export const KnowledgeIcon = createIcon(BookOpen);
export const ExcellenceIcon = createIcon(Award);
export const CompassionIcon = createIcon(HandHeart);
export const UnityIcon = createIcon(Users);
export const IntegrityIcon = createIcon(ShieldCheck);
export const EducationIcon = createIcon(BookOpen);
export const YouthIcon = createIcon(GraduationCap);
export const FamilyIcon = createIcon(Heart);
export const CommunityIcon = createIcon(Globe);
export const SpiritualIcon = createIcon(Sun);
export const VisionIcon = createIcon(Eye, "h-7 w-7");
export const MissionIcon = createIcon(Target, "h-7 w-7");
export const StoryIcon = createIcon(BookMarked, "h-7 w-7");
export const AcademyIcon = createIcon(GraduationCap, "h-7 w-7");
export const CommunitySectionIcon = createIcon(Users, "h-7 w-7");
export const LookingAheadIcon = createIcon(TrendingUp, "h-7 w-7");
export const HeroIcon = createIcon(Landmark, "h-6 w-6");
export const FamiliesStatIcon = createIcon(Users);
export const StudentsStatIcon = createIcon(GraduationCap);
export const ProgramsStatIcon = createIcon(Sparkles);
export const VolunteersStatIcon = createIcon(HandHeart);
export const CheckIcon = createIcon(CheckCircle2, "h-4 w-4");

export type ValueIconKey =
  | "faith"
  | "knowledge"
  | "excellence"
  | "compassion"
  | "unity"
  | "integrity";

export type ServiceIconKey =
  | "education"
  | "youth"
  | "family"
  | "community"
  | "spiritual";

export type StatIconKey = "families" | "students" | "programs" | "volunteers";

export function ValueIcon({ icon }: { icon: ValueIconKey }) {
  switch (icon) {
    case "faith":
      return <FaithIcon className="h-6 w-6 text-brand" />;
    case "knowledge":
      return <KnowledgeIcon className="h-6 w-6 text-brand" />;
    case "excellence":
      return <ExcellenceIcon className="h-6 w-6 text-brand" />;
    case "compassion":
      return <CompassionIcon className="h-6 w-6 text-brand" />;
    case "unity":
      return <UnityIcon className="h-6 w-6 text-brand" />;
    case "integrity":
      return <IntegrityIcon className="h-6 w-6 text-brand" />;
  }
}

export function ServiceIcon({ icon }: { icon: ServiceIconKey }) {
  switch (icon) {
    case "education":
      return <EducationIcon className="h-6 w-6 text-brand" />;
    case "youth":
      return <YouthIcon className="h-6 w-6 text-brand" />;
    case "family":
      return <FamilyIcon className="h-6 w-6 text-brand" />;
    case "community":
      return <CommunityIcon className="h-6 w-6 text-brand" />;
    case "spiritual":
      return <SpiritualIcon className="h-6 w-6 text-brand" />;
  }
}

export function StatIcon({ icon }: { icon: StatIconKey }) {
  switch (icon) {
    case "families":
      return <FamiliesStatIcon className="h-6 w-6 text-brand" />;
    case "students":
      return <StudentsStatIcon className="h-6 w-6 text-brand" />;
    case "programs":
      return <ProgramsStatIcon className="h-6 w-6 text-brand" />;
    case "volunteers":
      return <VolunteersStatIcon className="h-6 w-6 text-brand" />;
  }
}
