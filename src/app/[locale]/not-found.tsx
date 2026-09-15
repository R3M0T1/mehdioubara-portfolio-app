import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NotFoundView } from "@/components/portfolio/NotFoundView";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LocaleNotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <NotFoundView
      code={t("code")}
      title={t("title")}
      description={t("description")}
      homeLabel={t("home")}
      contactLabel={t("contact")}
    />
  );
}
