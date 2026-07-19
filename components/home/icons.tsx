import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  HandHeart,
  Heart,
  Landmark,
  Mail,
  MapPin,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const strokeWidth = 1.75;

function createIcon(Icon: LucideIcon, defaultClassName = "h-5 w-5") {
  return function AppIcon({
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

export const ChevronLeftIcon = createIcon(ChevronLeft);
export const ChevronRightIcon = createIcon(ChevronRight);
export const BookIcon = createIcon(BookOpen, "h-7 w-7");
export const UsersIcon = createIcon(Users, "h-7 w-7");
export const HeartIcon = createIcon(Heart, "h-7 w-7");
export const HandHeartIcon = createIcon(HandHeart, "h-7 w-7");
export const MosqueIcon = createIcon(Landmark);
export const ClockIcon = createIcon(Clock);
export const CalendarIcon = createIcon(Calendar);
export const CalendarRangeIcon = createIcon(CalendarRange);
export const MapPinIcon = createIcon(MapPin, "h-4 w-4");
export const ArrowRightIcon = createIcon(ArrowRight, "h-4 w-4");
export const GraduationCapIcon = createIcon(GraduationCap, "h-6 w-6");
export const SparklesIcon = createIcon(Sparkles, "h-6 w-6");
export const DonateIcon = createIcon(Heart);
export const ContactIcon = createIcon(Mail);
export const VolunteerIcon = createIcon(HandHeart);
export const MemberIcon = createIcon(UserPlus);

export {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  HandHeart,
  Heart,
  Landmark,
  Mail,
  MapPin,
  Sparkles,
  UserPlus,
  Users,
};
