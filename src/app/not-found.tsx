import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Stack } from "@/components/pouf/layout";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { themeBootScript } from "@/lib/theme";
import { routing } from "@/i18n/routing";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found · Mehdi Oubara",
  description: "This page does not exist on Mehdi Oubara’s portfolio.",
  robots: { index: false, follow: true },
};

/** Fallback 404 outside a valid locale segment. */
export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body>
        <Script
          id="theme-boot-404"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
        />
        <div className="portfolio-shell portfolio-not-found">
          <div className="portfolio-not-found__card">
            <Stack gap={4}>
              <Eyebrow>404</Eyebrow>
              <Heading level={1}>Page not found</Heading>
              <Text muted>
                This page does not exist. Head home to explore Mehdi Oubara’s
                work, or jump to contact.
              </Text>
              <div className="portfolio-not-found__actions">
                <Link
                  href={`/${routing.defaultLocale}`}
                  className="portfolio-not-found__btn"
                >
                  Back home
                </Link>
                <Link
                  href={`/${routing.defaultLocale}#contact`}
                  className="portfolio-not-found__btn portfolio-not-found__btn--quiet"
                >
                  Contact
                </Link>
              </div>
            </Stack>
          </div>
        </div>
      </body>
    </html>
  );
}
