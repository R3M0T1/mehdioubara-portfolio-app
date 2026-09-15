import type { Metadata, Viewport } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PortfolioHome } from "@/components/portfolio/PortfolioHome";
import { routing } from "@/i18n/routing";
import { buildLocaleMetadata, buildPersonJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.backgroundColor },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildLocaleMetadata(locale);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  const jsonLd = buildPersonJsonLd(locale, t("description"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioHome />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
