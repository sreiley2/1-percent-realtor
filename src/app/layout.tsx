import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import { LeadDialog } from "@/components/lead/lead-dialog";
import { LeadProvider } from "@/components/lead/lead-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/lib/site-content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const display = Instrument_Serif({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "1% Realtor | Sell for 1% · 1% Buyer Representation",
  description:
    "Bay Area real estate for sellers and buyers. Sell your home for 1%, or hire 1% buyer representation if you've already found the property.",
  applicationName: "1% Realtor",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    title: "1% Realtor",
    capable: true,
    statusBarStyle: "default",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "1% Realtor | Sell for 1% · 1% Buyer Representation",
    description:
      "Bay Area real estate for sellers and buyers. Sell your home for 1%, or hire 1% buyer representation if you've already found the property.",
    images: [
      {
        url: "/brand/logo-512.png",
        width: 512,
        height: 512,
        alt: "1% Realtor",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "1% Realtor | Sell for 1% · 1% Buyer Representation",
    description:
      "Bay Area real estate for sellers and buyers. Sell your home for 1%, or hire 1% buyer representation if you've already found the property.",
    images: ["/brand/logo-512.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${display.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LeadProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <LeadDialog />
        </LeadProvider>
      </body>
    </html>
  );
}
