export type PrayerTime = {
  name: string;
  time: string;
};

export const prayerTimesContent = {
  heading: "Today's Prayer Times",
  location: "Mississauga, Ontario",
  note: "Iqamah times from the CIU yearly calendar. Maghrib is calculated at sunset.",
  scheduleHref: "/Services/prayer-times",
  scheduleLabel: "View Full Schedule",
};

export const prayerTimesPageContent = {
  hero: {
    label: "Daily Salah",
    heading: "Prayer Times",
    intro:
      "View daily, weekly, monthly, and yearly iqamah times for CIU in Mississauga based on the published CIU prayer calendar.",
    imageSrc: "/images/home/home_hero3.png",
    imageAlt: "Muslim community members gathered outdoors for prayer and fellowship",
  },
  today: {
    label: "Schedule",
    heading: "Prayer Times",
    location: "Mississauga, Ontario",
    note: "Maghrib iqamah follows sunset for each date. Jumu'ah times shift one hour earlier during winter schedule.",
  },
  jumuah: {
    label: "Jumu'ah",
    heading: "Friday Prayer",
    intro:
      "CIU offers two Jumu'ah sessions each Friday. Times move one hour earlier when the winter iqamah schedule begins.",
    note: "Summer schedule: 1:30 / 2:00 and 2:30 / 3:00. Winter schedule: 12:30 / 1:00 and 1:30 / 2:00.",
  },
  guidance: {
    label: "Important Notes",
    heading: "Schedule Information",
    items: [
      {
        title: "Iqamah Calendar",
        description:
          "Fajr, Dhuhr, Asr, and Isha follow the CIU yearly iqamah calendar. Maghrib follows sunset for Mississauga.",
      },
      {
        title: "Seasonal Adjustments",
        description:
          "Times change throughout the year by date range. Use the monthly calendar to browse any month day by day.",
      },
      {
        title: "Daylight Saving Time",
        description:
          "Schedule shifts are applied around daylight saving changes in March and November, as shown in the yearly calendar.",
      },
    ],
  },
  cta: {
    heading: "Questions About Prayer Times?",
    text: "Contact CIU if you need help confirming Jumu'ah, holiday schedules, or community prayer arrangements.",
    primaryButton: { label: "Contact CIU", href: "/Contact" },
    secondaryButton: { label: "Visit Our Services", href: "/Services" },
  },
};
