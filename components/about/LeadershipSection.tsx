"use client";

import { MotionItem, MotionStagger } from "@/components/motion";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import { teamContent } from "@/content/TeamContent";

export default function LeadershipSection() {
  const { label, heading, intro } = teamContent.about;

  return (
    <section
      id="leadership"
      className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase sm:text-sm">
          {label}
        </p>
        <div className="gold-accent-bar mx-auto mt-4" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
          {intro}
        </p>
      </div>

      <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {teamContent.members.map((member) => (
          <MotionItem key={member.id}>
            <TeamMemberCard member={member} />
          </MotionItem>
        ))}
      </MotionStagger>
    </section>
  );
}
