import type { TeamMember } from "@/content/TeamContent";
import { getInitials } from "@/content/TeamContent";

export default function TeamMemberCard({
  member,
  compact = false,
}: {
  member: TeamMember;
  compact?: boolean;
}) {
  const isFounder = member.role.includes("Founder");
  const initials = getInitials(member.name);

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-border/80 bg-surface text-center shadow-premium transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-premium-lg ${
        compact ? "p-6 sm:p-7" : "p-7 sm:p-8"
      }`}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <div
        className={`absolute left-0 top-0 rounded-tl-3xl border-l-[3px] border-t-[3px] opacity-80 ${
          isFounder ? "h-16 w-16 border-gold/80" : "h-12 w-12 border-gold/60"
        }`}
        aria-hidden="true"
      />

      <div
        className={`relative mx-auto inline-flex items-center justify-center rounded-full bg-brand-gradient font-semibold text-white shadow-premium ${
          compact ? "h-20 w-20 text-xl" : "h-24 w-24 text-2xl"
        }`}
      >
        <span aria-hidden="true">{initials}</span>
      </div>

      <h3 className={`mt-5 font-semibold tracking-tight text-foreground ${compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}>
        {member.name}
      </h3>
      <p
        className={`mt-2 font-medium ${isFounder ? "text-gold-dark" : "text-brand"} ${
          compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
        }`}
      >
        {member.role}
      </p>
    </article>
  );
}
