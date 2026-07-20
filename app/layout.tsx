import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Naskh_Arabic } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AosInit from "@/components/aos/AosInit";
import { siteContent } from "@/content/SiteContent";
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
  icons: {
    icon: siteContent.logoSrc,
    shortcut: siteContent.logoSrc,
    apple: siteContent.logoSrc,
  },
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
      className={`${geistSans.variable} ${geistMono.variable} ${notoNaskhArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-background text-foreground">
        <AosInit />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
