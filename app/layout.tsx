import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Naskh_Arabic } from "next/font/google";
import Script from "next/script";
import AppProviders from "@frontend/components/AppProviders";
import { siteContent } from "@frontend/content/SiteContent";
import { adminThemeBootScript } from "@frontend/portal/admin-theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.url),
  title: siteContent.title,
  description: siteContent.description,
  applicationName: siteContent.shortName,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteContent.url,
    siteName: siteContent.name,
    title: siteContent.title,
    description: siteContent.description,
    images: [
      {
        url: siteContent.ogImageSrc,
        width: 512,
        height: 512,
        alt: siteContent.logoAlt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteContent.title,
    description: siteContent.description,
    images: [siteContent.ogImageSrc],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoNaskhArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-background text-foreground">
        <Script id="ciu-admin-theme" strategy="beforeInteractive">
          {adminThemeBootScript}
        </Script>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
