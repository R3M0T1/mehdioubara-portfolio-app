import { locales, type Locale } from "@/i18n/routing";
import { contact } from "@/content/profile";

/** Public site identity used for metadata, sitemap, OG, and JSON-LD. */
export const siteConfig = {
  name: "Mehdi Oubara",
  shortName: "Mehdi Oubara",
  jobTitle: "Software & Network Engineer",
  location: {
    locality: "Tangier",
    region: "Tanger-Tetouan-Al Hoceima",
    country: "MA",
    countryName: "Morocco",
  },
  email: contact.email,
  phone: contact.phone,
  linkedin: contact.linkedinUrl,
  github: "https://github.com/R3M0T1",
  imagePath: "/me.jpg",
  themeColor: "#c9a8ff",
  backgroundColor: "#211f2b",
} as const;

/** Open Graph locale tags per app locale. */
export const ogLocaleByAppLocale: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  pt: "pt_PT",
  de: "de_DE",
  nl: "nl_NL",
};

/**
 * Canonical production URL. Set `NEXT_PUBLIC_SITE_URL` in Dokploy / hosting
 * (e.g. https://mehdioubara.com) so sitemap, canonicals, and OG URLs resolve.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const dokploy = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (dokploy) return dokploy.replace(/\/$/, "");

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localePath(locale: string, path = ""): string {
  const normalized = path.replace(/^\//, "");
  return normalized ? `/${locale}/${normalized}` : `/${locale}`;
}

export function languageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localePath("en", path));
  return languages;
}
