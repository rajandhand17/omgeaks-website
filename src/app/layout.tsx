import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from "@/components/analytics/GoogleTagManager";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SEO_KEYWORDS,
  SITE_URL,
  faqJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · OmGeaks",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "OmGeaks",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: "OmGeaks", url: SITE_URL }],
  creator: "OmGeaks",
  publisher: "OmGeaks",
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    siteName: "OmGeaks",
    locale: "en_US",
    url: SITE_URL,
    images: [
      {
        url: "/logos/omgeaks-logo.png",
        width: 1200,
        height: 630,
        alt: "OmGeaks — AI & Product Engineering IT Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "AI agents, automation, custom software, mobile apps, CRM, and cloud — engineered for production by OmGeaks.",
    images: ["/logos/omgeaks-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-omgeaks.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "EILzinoHowDkOUZtipcsIpePP8d7RION68-rLU7wDEE",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

export const viewport: Viewport = {
  themeColor: "#051937",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [organizationJsonLd(), websiteJsonLd(), faqJsonLd()];

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-navy">
        <GoogleTagManager />
        <GoogleTagManagerNoscript />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
}
