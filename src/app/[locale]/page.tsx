import { getTranslations, setRequestLocale } from "next-intl/server";
import { PortfolioHome } from "@/components/portfolio/PortfolioHome";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PortfolioHome />;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
