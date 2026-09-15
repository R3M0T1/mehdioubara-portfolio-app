import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import {
  absoluteUrl,
  getSiteUrl,
  languageAlternates,
  localePath,
  ogLocaleByAppLocale,
  siteConfig,
} from "@/lib/site";

export async function buildLocaleMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const keywords = t.raw("keywords") as string[];
  const canonical = absoluteUrl(localePath(locale));
  const ogLocale = ogLocaleByAppLocale[locale as Locale] ?? "en_US";

  const alternateLocales = locales
    .filter((code) => code !== locale)
    .map((code) => ogLocaleByAppLocale[code]);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s · ${siteConfig.name}`,
    },
    description,
    keywords,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: canonical }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "profile",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      locale: ogLocale,
      alternateLocale: alternateLocales,
      firstName: "Mehdi",
      lastName: "Oubara",
      username: "mehdi-oubara",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
    appleWebApp: {
      capable: true,
      title: siteConfig.shortName,
      statusBarStyle: "default",
    },
    other: {
      "geo.region": "MA-01",
      "geo.placename": siteConfig.location.locality,
    },
  };
}

export function buildPersonJsonLd(locale: string, description: string) {
  const url = absoluteUrl(localePath(locale));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${getSiteUrl()}/#website`,
        url: getSiteUrl(),
        name: siteConfig.name,
        description,
        inLanguage: locales,
        publisher: { "@id": `${getSiteUrl()}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: siteConfig.name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": `${getSiteUrl()}/#website` },
        about: { "@id": `${getSiteUrl()}/#person` },
        mainEntity: { "@id": `${getSiteUrl()}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${getSiteUrl()}/#person`,
        name: siteConfig.name,
        givenName: "Mehdi",
        familyName: "Oubara",
        jobTitle: siteConfig.jobTitle,
        description,
        url,
        image: absoluteUrl(siteConfig.imagePath),
        email: `mailto:${siteConfig.email}`,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.locality,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.country,
        },
        sameAs: [siteConfig.linkedin, siteConfig.github],
        knowsAbout: [
          "Back-End Engineering",
          "Web3",
          "Full-Stack Development",
          "DevOps",
          "REST APIs",
          "Cloud Infrastructure",
          "Python",
          "TypeScript",
          "Next.js",
          "Docker",
          "AWS",
          "Azure",
        ],
        knowsLanguage: ["en", "fr", "ar"],
        nationality: {
          "@type": "Country",
          name: siteConfig.location.countryName,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${getSiteUrl()}/#service`,
        name: `${siteConfig.name} — Engineering services`,
        description,
        url,
        image: absoluteUrl(siteConfig.imagePath),
        provider: { "@id": `${getSiteUrl()}/#person` },
        areaServed: [
          { "@type": "Country", name: "Morocco" },
          { "@type": "Place", name: "Remote" },
        ],
        serviceType: [
          "Back-End Development",
          "Web3 Engineering",
          "Full-Stack Development",
          "DevOps",
        ],
      },
    ],
  };
}
