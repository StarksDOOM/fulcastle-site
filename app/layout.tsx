import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "@/app/components/scroll-reveal";
import { headers } from "next/headers";

const bodyFont = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-body-font" });
const displayFont = Cormorant_Garamond({ subsets: ["latin"], display: "swap", weight: ["500", "600", "700"], variable: "--font-display-font" });

const siteUrl = "https://fulcastle.com";
const siteDescription =
  "FulCastle Holdings, Inc. is a parent company supporting a portfolio of independent ventures.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FulCastle Holdings, Inc.",
    template: "%s | FulCastle Holdings, Inc.",
  },
  description: siteDescription,
  applicationName: "FulCastle Holdings, Inc.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "FulCastle Holdings, Inc.",
    title: "FulCastle Holdings, Inc.",
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "FulCastle Holdings, Inc.",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#101722",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-site-locale") === "es" ? "es" : "en";

  return (
    <html lang={locale} className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
