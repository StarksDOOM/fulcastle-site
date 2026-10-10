import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fulcastle.com"),
  title: {
    default: "FulCastle Holdings, Inc.",
    template: "%s | FulCastle Holdings, Inc.",
  },
  description:
    "FulCastle Holdings, Inc. is a parent company supporting a portfolio of independent ventures.",
  applicationName: "FulCastle Holdings, Inc.",
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
