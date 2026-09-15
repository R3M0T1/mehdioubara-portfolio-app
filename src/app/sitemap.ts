import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { absoluteUrl, localePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localePath(locale))]),
  ) as Record<string, string>;
  languages["x-default"] = absoluteUrl(localePath("en"));

  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
    images: [absoluteUrl("/me.jpg")],
  }));
}
