"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/pouf/Button";
import { Dialog } from "@/components/pouf/controls";
import { Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Segmented } from "@/components/pouf/Segmented";
import { Badge, Blob } from "@/components/pouf/media";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { PdfViewer } from "@/components/ui/pdf-viewer";

const CV_FILES = {
  en: "/Mehdi_Oubara_CV_EN.pdf",
  fr: "/Mehdi_Oubara_CV_FR.pdf",
} as const;

const PDF_WORKER = "/pdf.worker.min.mjs";

type CvLang = keyof typeof CV_FILES;

export function CvViewer() {
  const t = useTranslations("cv");
  const locale = useLocale();
  const [lang, setLang] = useState<CvLang>(locale === "fr" ? "fr" : "en");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLang(locale === "fr" ? "fr" : "en");
  }, [locale]);

  const src = CV_FILES[lang];

  return (
    <section className="portfolio-section" id="cv">
      <Stack gap={4}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <Heading level={2}>{t("title")}</Heading>
        <Text muted>{t("subtitle")}</Text>

        <Card motion="tilt-left" variant="tight">
          <Row gap={4} justify="between" wrap align="center">
            <Row gap={3} wrap={false} align="center">
              <Blob icon="photo" tone="blue" size="sm" />
              <Stack gap={1}>
                <Text>{t("cardTitle")}</Text>
                <Text size="sm" muted>
                  {t("cardHint")}
                </Text>
              </Stack>
            </Row>
            <Badge tone="mint">{lang.toUpperCase()}</Badge>
          </Row>
        </Card>

        <Row gap={3} justify="between" wrap>
          <Segmented
            label={t("version")}
            value={lang}
            onChange={setLang}
            options={[
              { value: "en", label: t("english") },
              { value: "fr", label: t("french") },
            ]}
            tone="blue"
          />
          <Row gap={2} wrap>
            <Dialog
              size="lg"
              open={open}
              onOpenChange={setOpen}
              title={t("dialogTitle", { lang: lang.toUpperCase() })}
              description={t("dialogDescription")}
              trigger={
                <Button tone="purple">{t("view")}</Button>
              }
            >
              <div className="portfolio-cv-viewer">
                <Stack gap={3}>
                  <Row gap={2} justify="between" wrap>
                    <Segmented
                      label={t("version")}
                      value={lang}
                      onChange={setLang}
                      options={[
                        { value: "en", label: t("english") },
                        { value: "fr", label: t("french") },
                      ]}
                      tone="mint"
                    />
                    <Button
                      tone="mint"
                      size="sm"
                      onClick={() => downloadCv(src, lang)}
                    >
                      {t("download")}
                    </Button>
                  </Row>

                  {open ? (
                    <PdfViewer
                      key={src}
                      className="portfolio-cv-viewer__pdf w-full"
                      source={src}
                      workerSrc={PDF_WORKER}
                      label={t("iframeTitle", { lang: lang.toUpperCase() })}
                      loadingLabel={t("loading")}
                      defaultScale={1.05}
                    />
                  ) : null}
                </Stack>
              </div>
            </Dialog>

            <Button
              tone="blue"
              variant="quiet"
              onClick={() => downloadCv(src, lang)}
            >
              {t("download")}
            </Button>
          </Row>
        </Row>
      </Stack>
    </section>
  );
}

function downloadCv(src: string, lang: CvLang) {
  const link = document.createElement("a");
  link.href = src;
  link.download = `Mehdi_Oubara_CV_${lang.toUpperCase()}.pdf`;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
