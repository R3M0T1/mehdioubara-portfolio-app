import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "es", "pt", "de", "nl"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  nl: "Nederlands",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});
