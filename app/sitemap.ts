import type { MetadataRoute } from "next";

const siteUrl = "https://fulcastle.com";
const paths = [
  "",
  "/about",
  "/ventures",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const englishUrl = `${siteUrl}${path}`;
    const spanishUrl = `${siteUrl}/es${path}`;
    return [
      {
        url: englishUrl,
        alternates: { languages: { en: englishUrl, es: spanishUrl } },
      },
      {
        url: spanishUrl,
        alternates: { languages: { en: englishUrl, es: spanishUrl } },
      },
    ];
  });
}
