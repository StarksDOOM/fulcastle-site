import type { MetadataRoute } from "next";

const siteUrl = "https://fulcastle.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/ventures",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
