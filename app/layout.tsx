import type { Metadata, Viewport } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
