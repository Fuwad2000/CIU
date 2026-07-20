export type TeamMember = {
  id: string;
  name: string;
  role: string;
  featuredOnHome?: boolean;
};

export const teamContent = {
  home: {
    label: "OUR LEADERSHIP",
    heading: "Meet Our Imam & Scholars",
    subheading:
      "CIU is supported by qualified scholars and our imam, who provide spiritual guidance, education, and community leadership.",
    cta: { label: "Meet the Full Team", href: "/About#leadership" },
  },
  about: {
    label: "LEADERSHIP",
    heading: "Meet Our Team",
    intro:
      "Our scholars, imams, and leadership team work together to serve the community through education, spiritual guidance, and organizational excellence.",
  },
  members: [
    {
      id: "ashref",
      name: "Sheikh Ashref",
      role: "Islamic Scholar",
      featuredOnHome: true,
    },
    {
      id: "umar",
      name: "Imam Umar",
      role: "Imam",
      featuredOnHome: true,
    },
    {
      id: "sharuf",
      name: "Sharuf Hamnam",
      role: "Islamic Scholar",
      featuredOnHome: true,
    },
    {
      id: "mona",
      name: "Dr. Mona",
      role: "Islamic Scholar",
    },
    {
      id: "makdoom",
      name: "Sheikh Makdoom",
      role: "Founder & COO",
    },
  ] satisfies TeamMember[],
};

export function getHomeTeamMembers() {
  return teamContent.members.filter((member) => member.featuredOnHome);
}

export function getInitials(name: string) {
  return name
    .replace(/^(Sheikh|Imam|Dr\.)\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
