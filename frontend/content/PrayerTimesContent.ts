export type PrayerTime = {
  name: string;
  time: string;
};

export const prayerTimesContent = {
  heading: "Today's Prayer Times",
  location: "Mississauga, Ontario",
  note: "Prayer times from the published CIU yearly calendar for Mississauga.",
  scheduleHref: "/Services/prayer-times",
  scheduleLabel: "View Full Schedule",
};

export const prayerTimesPageContent = {
  hero: {
    label: "Daily Salah",
    heading: "Prayer Times",
    intro:
      "View daily, weekly, monthly, and yearly iqamah times for CIU in Mississauga based on the published CIU prayer calendar.",
    imageSrc: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024097/10216818-Interior-view-of-domes-in-Blue-Mosque-Istanbul-Turkey_h0iswz.jpg",
    imageAlt: "Community member performing prayer in the musalla at CIU",
  },
  today: {
    label: "Schedule",
    heading: "Prayer Times",
    location: "Mississauga, Ontario",
    note: "Times follow the published CIU yearly prayer calendar for Mississauga.",
  },
  jumuah: {
    label: "Jumu'ah",
    heading: "Friday Prayer",
    intro: "CIU holds one Jumu'ah each Friday at the masjid.",
    note: "Khutbah begins at 1:45 PM. Salah is at 2:05 PM. These times apply year-round.",
  },
  guidance: {
    label: "Important Notes",
    heading: "Schedule Information",
    items: [
      {
        title: "Jumu'ah Prayer",
        description:
          "One Jumu'ah is held each Friday. Khutbah begins at 1:45 PM and Salah is at 2:05 PM year-round.",
      },
      {
        title: "Iqamah Calendar",
        description:
          "Fajr, Dhuhr, Asr, Maghrib, and Isha follow the published CIU yearly prayer calendar for Mississauga.",
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
