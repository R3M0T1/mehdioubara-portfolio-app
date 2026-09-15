"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { Button, IconButton } from "@/components/pouf/Button";
import { Select } from "@/components/pouf/controls";
import { Icon } from "@/components/pouf/Icon";
import { Row, Stack } from "@/components/pouf/layout";
import { Navbar } from "@/components/pouf/navbar";
import { Sheet } from "@/components/pouf/sheet";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

type Props = {
  compact: boolean;
  onHire: () => void;
  onNavigate: (id: string) => void;
};

export function PortfolioNav({ compact, onHire, onNavigate }: Props) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#about", id: "about", label: t("nav.about") },
    { href: "#experience", id: "experience", label: t("nav.experience") },
    { href: "#projects", id: "projects", label: t("nav.projects") },
    { href: "#skills", id: "skills", label: t("nav.skills") },
    { href: "#cv", id: "cv", label: t("nav.cv") },
    { href: "#contact", id: "contact", label: t("nav.contact") },
  ];

  const brand = (
    <button
      type="button"
      className="portfolio-brand"
      onClick={() => onNavigate("top")}
      aria-label="Mehdi Oubara — home"
    >
      <span className="portfolio-brand__mono" aria-hidden>
        MO
      </span>
      <span className="portfolio-brand__text">
        <span className="portfolio-brand__name">Mehdi Oubara</span>
        <span className="portfolio-brand__hint">{t("hero.role")}</span>
      </span>
    </button>
  );

  const languageSelect = (
    <div className="portfolio-lang">
      <Select
        label={t("nav.language")}
        value={locale}
        onChange={(next) => {
          startTransition(() => {
            router.replace(pathname, { locale: next as Locale });
          });
        }}
        options={locales.map((code) => ({
          value: code,
          label: code.toUpperCase(),
        }))}
        disabled={isPending}
      />
    </div>
  );

  const themeToggle = (
    <ThemeToggle
      labelToLight={t("nav.themeToLight")}
      labelToDark={t("nav.themeToDark")}
    />
  );

  const go = (id: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => onNavigate(id));
  };

  return (
    <header
      className={
        compact
          ? "portfolio-header portfolio-header--compact"
          : "portfolio-header"
      }
    >
      <div className="portfolio-nav-desktop">
        <Navbar
          brand={brand}
          links={links.map(({ href, label }) => ({ href, label }))}
          actions={
            <Row gap={2} wrap={false} align="center">
              {languageSelect}
              {themeToggle}
              <span className="portfolio-hire">
                <Button tone="mint" size="sm" onClick={onHire}>
                  {t("nav.hire")}
                </Button>
              </span>
            </Row>
          }
        />
      </div>

      <nav className="portfolio-nav-mobile" aria-label={t("nav.menu")}>
        {brand}
        <div className="portfolio-nav-mobile__actions">
          <Button tone="mint" size="sm" onClick={onHire}>
            {t("nav.hire")}
          </Button>
          <Sheet
            open={menuOpen}
            onOpenChange={setMenuOpen}
            title={t("nav.menu")}
            trigger={
              <IconButton
                tone="purple"
                variant="quiet"
                size="sm"
                label={t("nav.openMenu")}
                icon={<Icon name="bars" size="sm" />}
              />
            }
          >
            <Stack gap={4}>
              <div className="portfolio-nav-sheet__links">
                {links.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className="portfolio-nav-sheet__link"
                    onClick={() => go(link.id)}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="portfolio-nav-sheet__prefs">
                {languageSelect}
                {themeToggle}
              </div>
            </Stack>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
