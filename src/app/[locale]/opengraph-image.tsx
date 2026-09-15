import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export const alt = "Mehdi Oubara — Software & Network Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #211f2b 0%, #3a2e5c 55%, #2a2145 100%)",
          color: "#f7f3ff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: "#c9a8ff",
              color: "#3a2e5c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            MO
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#c9a8ff" }}>
              {siteConfig.name}
            </div>
            <div style={{ fontSize: 18, color: "rgba(247,243,255,0.72)" }}>
              {siteConfig.jobTitle}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: -1.2,
            }}
          >
            {t("ogHeadline")}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(247,243,255,0.78)",
              maxWidth: 900,
            }}
          >
            {t("ogSubhead")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(247,243,255,0.7)",
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {["Back-End", "Web3", "Full stack", "DevOps"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(201,168,255,0.18)",
                  color: "#f7f3ff",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 700 }}>Tangier · Remote</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
