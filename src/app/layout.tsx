import type { Metadata } from "next";
import { Poppins, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { ReferralCapture } from "@/components/layout/ReferralCapture";
import { VerificationSync } from "@/components/layout/VerificationSync";
import { AgeGate } from "@/components/layout/AgeGate";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/components/layout/GoogleTagManager";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ChunkErrorReload } from "@/components/layout/ChunkErrorReload";

const SITE_URL = "https://evlvtoday.com";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EVLV: Peptide & Wellness Education",
    template: "%s | EVLV",
  },
  description:
    "Plain-language peptide and wellness education built around your goals, with research guides and resources for better provider conversations.",
  keywords: [
    "women's wellness education",
    "health optimization for women",
    "peptide education",
    "hormone health education",
    "wellness education",
    "women's health programs",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "EVLV",
    title: "EVLV: Peptide & Wellness Education",
    description: "Plain-language peptide and wellness education, research guides, and resources for better provider conversations.",
    images: [{ url: "/images/brand/wellness-hero.png", width: 1200, height: 630, alt: "EVLV wellness education" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EVLV: Peptide & Wellness Education",
    description: "Plain-language peptide and wellness education, research guides, and resources for better provider conversations.",
    images: ["/images/brand/wellness-hero.png"],
  },
  robots: { index: true, follow: true },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EVLV",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/evlv-logo-light.png`,
  description: "Plain-language peptide and wellness education, research guides, and resources for better provider conversations.",
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EVLV",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${newsreader.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" />
      </head>
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <GoogleTagManagerHead />
        <Script id="ld-org" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
        <Script id="ld-site" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }} />
        {process.env.NEXT_PUBLIC_CRM_URL && process.env.NEXT_PUBLIC_CRM_TRACKING_KEY && (
          <Script id="crm-pixel" src={`${process.env.NEXT_PUBLIC_CRM_URL}/pixel.js`} data-key={process.env.NEXT_PUBLIC_CRM_TRACKING_KEY} strategy="afterInteractive" />
        )}
        <ScrollToTop />
        <ChunkErrorReload />
        <GoogleTagManagerBody />
        <GoogleAnalytics />
        <ReferralCapture />
        <VerificationSync />
        {children}
      </body>
    </html>
  );
}
