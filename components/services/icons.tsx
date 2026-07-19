import {
  BookOpenCheck,
  CalendarHeart,
  Compass,
  GraduationCap,
  HandHeart,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/content/ServicesContent";

const iconMap: Record<ServiceIconName, LucideIcon> = {
  compass: Compass,
  "users-round": UsersRound,
  "graduation-cap": GraduationCap,
  "book-open-check": BookOpenCheck,
  "calendar-heart": CalendarHeart,
  "hand-heart": HandHeart,
};

export function ServiceIcon({
  name,
  className = "h-6 w-6",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = iconMap[name];
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" />;
}
