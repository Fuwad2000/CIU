"use client";

import SocialIcon from "@/components/SocialIcon";
import { topBarContent } from "@/content/TopBarContent";

function MapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
      aria-hidden="true"
    >
      <path d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

export default function TopBar({ compact = false }: { compact?: boolean }) {
  const { address, phone, mapsUrl, phoneLabel, followUsLabel, socialLinks } =
    topBarContent;
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <div
      className={`bg-brand text-white transition-all duration-300 ease-out ${
        compact ? "lg:shadow-none" : ""
      }`}
    >
      <div
        className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
          compact ? "max-h-0 opacity-0" : "max-h-80 opacity-100"
        }`}
        aria-hidden={compact}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm leading-relaxed sm:px-6 sm:text-base">
          <div className="flex flex-col gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 transition-opacity hover:opacity-90 sm:items-center"
            >
              <MapIcon />
              <span>{address}</span>
            </a>

            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
            >
              <PhoneIcon />
              <span>
                {phoneLabel} <span className="font-medium">{phone}</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`bg-brand-dark transition-all duration-300 lg:hidden ${
          compact ? "h-1" : "h-0"
        }`}
        aria-hidden={!compact}
      />

      <div
        className={`hidden overflow-hidden transition-all duration-300 ease-out lg:block ${
          compact ? "max-h-12 opacity-95" : "max-h-24 opacity-100"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl flex-col gap-3 px-6 text-base leading-relaxed transition-all duration-300 lg:px-8 ${
            compact ? "py-2" : "py-3"
          }`}
        >
          <div className="flex flex-row items-center justify-between gap-6">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
            >
              <MapIcon />
              <span>{address}</span>
            </a>

            <div className="flex items-center gap-5">
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
              >
                <PhoneIcon />
                <span>
                  {phoneLabel} <span className="font-medium">{phone}</span>
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span className="font-medium">{followUsLabel}</span>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="inline-flex transition-opacity hover:opacity-80"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
