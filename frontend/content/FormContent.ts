export const formPlaceholderMessages = {
  membership:
    "Registration coming soon — membership sign-up will be connected once our email service is ready.",
  volunteer:
    "Registration coming soon — volunteer sign-up will be connected once our email service is ready.",
  contact:
    "Message delivery coming soon — online contact is not connected yet. Please call or email us directly for urgent matters.",
  newsletter:
    "Subscription coming soon — event email updates will be enabled once our newsletter service is ready.",
} as const;

export type FormPlaceholderKey = keyof typeof formPlaceholderMessages;
