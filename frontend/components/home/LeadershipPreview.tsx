"use client";

import Link from "next/link";
import SectionContainer from "@frontend/components/home/SectionContainer";
import SectionHeading from "@frontend/components/home/SectionHeading";
import { ArrowRightIcon } from "@frontend/components/home/icons";
import { homeBtnGhostClass, homeSectionClass } from "@frontend/components/home/homeUi";
import { MotionItem, MotionStagger } from "@frontend/components/motion";
import TeamMemberCard from "@frontend/components/team/TeamMemberCard";
import { getHomeTeamMembers, teamContent } from "@frontend/content/TeamContent";

export default function LeadershipPreview() {
  const { label, heading, subheading, cta } = teamContent.home;
  const members = getHomeTeamMembers();

  return (
    <section className={`${homeSectionClass} border-y border-border/70 bg-surface`}>
      <SectionContainer>
        <SectionHeading label={label} heading={heading} subheading={subheading} />

        <MotionStagger className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {members.map((member) => (
            <MotionItem key={member.id}>
              <TeamMemberCard member={member} compact />
            </MotionItem>
          ))}
        </MotionStagger>

        <div className="mt-10 text-center">
          <Link href={cta.href} className={homeBtnGhostClass}>
            {cta.label}
            <ArrowRightIcon />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
