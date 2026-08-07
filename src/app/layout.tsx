import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
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
  metadataBase: new URL("https://omgeaks.com"),
  title: {
    default: "OmGeaks — AI & Product Engineering",
    template: "%s · OmGeaks",
  },
  description:
    "OmGeaks builds AI agents, business automation, custom software, mobile apps, enterprise CRM, and cloud platforms — production systems led by senior engineers.",
  keywords: [
    "OmGeaks",
    "AI agents",
    "product engineering",
    "business automation",
    "enterprise CRM",
    "custom software",
    "mobile app development",
    "cloud solutions",
  ],
  authors: [{ name: "OmGeaks" }],
  creator: "OmGeaks",
  openGraph: {
    title: "OmGeaks — AI & Product Engineering",
    description:
      "We build AI agents, automation, and software that run your business. Book a consultation or chat on WhatsApp.",
    type: "website",
    siteName: "OmGeaks",
    locale: "en_US",
    url: "https://omgeaks.com",
    images: [
      {
        url: "/logos/omgeaks-logo.png",
        width: 1200,
        height: 630,
        alt: "OmGeaks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmGeaks — AI & Product Engineering",
    description:
      "AI agents, automation, custom software, mobile apps, CRM, and cloud — engineered for production.",
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
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-navy">{children}</body>
    </html>
  );
}
