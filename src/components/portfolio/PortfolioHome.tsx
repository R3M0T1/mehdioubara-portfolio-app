"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/pouf/Button";
import { Dialog, Select } from "@/components/pouf/controls";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { CvViewer } from "@/components/portfolio/CvViewer";
import { EducationSection } from "@/components/portfolio/EducationSection";
import type {
  CertItem,
  EducationItem,
} from "@/components/portfolio/EducationSection";
import {
  ExperienceSection,
  type ExperienceItem,
} from "@/components/portfolio/ExperienceSection";
import {
  ProjectsSection,
  type ProjectItem,
} from "@/components/portfolio/ProjectsSection";
import { FocusMultiSelect } from "@/components/portfolio/FocusMultiSelect";
import { Footer } from "@/components/pouf/footer";
import { Field, Input, Textarea } from "@/components/pouf/Input";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Avatar } from "@/components/pouf/avatar";
import { Navbar } from "@/components/pouf/navbar";
import { Metric, Stat } from "@/components/pouf/readout";
import { Segmented } from "@/components/pouf/Segmented";
import { Card } from "@/components/pouf/surface";
import { CTA } from "@/components/pouf/cta";
import { Eyebrow, Heading, Highlight, Text } from "@/components/pouf/text";
import {
  contact,
  roleTones,
  skillGroups,
  type RoleFocus,
} from "@/content/profile";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PortfolioHome() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [focus, setFocus] = useState<RoleFocus>("all");
  const [compactHeader, setCompactHeader] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompactHeader(window.scrollY > 28);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const experience = t.raw("experience.items") as ExperienceItem[];
  const projects = t.raw("projects.items") as ProjectItem[];
  const spoken = t.raw("skills.spokenItems") as string[];
  const educationCopy = {
    eyebrow: t("education.eyebrow"),
    title: t("education.title"),
    subtitle: t("education.subtitle"),
    schoolsTitle: t("education.schoolsTitle"),
    certsTitle: t("education.certsTitle"),
    focusLabel: t("education.focusLabel"),
    skillsLabel: t("education.skillsLabel"),
    tabEmsi: t("education.tabEmsi"),
    tabIsta: t("education.tabIsta"),
    tabCerts: t("education.tabCerts"),
    stats: {
      schools: t("education.stats.schools"),
      certs: t("education.stats.certs"),
      years: t("education.stats.years"),
    },
    items: t.raw("education.items") as EducationItem[],
    certs: t.raw("education.certs") as CertItem[],
  };

  const filteredExperience = useMemo(
    () =>
      experience.filter(
        (item) => focus === "all" || item.roles.includes(focus),
      ),
    [experience, focus],
  );

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (item) => focus === "all" || item.roles.includes(focus),
      ),
    [projects, focus],
  );

  const roleOptions = (
    ["all", "backend", "web3", "fullstack", "devops"] as const
  ).map((value) => ({
    value,
    label: t(`roles.${value}`),
  }));

  return (
    <div className="portfolio-shell">
      <header
        className={
          compactHeader
            ? "portfolio-header portfolio-header--compact"
            : "portfolio-header"
        }
      >
        <Navbar
          brand={
            <button
              type="button"
              className="portfolio-brand"
              onClick={() => scrollToId("top")}
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
          }
          links={[
            { href: "#about", label: t("nav.about") },
            { href: "#experience", label: t("nav.experience") },
            { href: "#projects", label: t("nav.projects") },
            { href: "#skills", label: t("nav.skills") },
            { href: "#cv", label: t("nav.cv") },
            { href: "#contact", label: t("nav.contact") },
          ]}
          actions={
            <Row gap={2} wrap={false} align="center">
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
              <ThemeToggle
                labelToLight={t("nav.themeToLight")}
                labelToDark={t("nav.themeToDark")}
              />
              <span className="portfolio-hire">
                <Button tone="mint" size="sm" onClick={() => openContactDialog()}>
                  {t("nav.hire")}
                </Button>
              </span>
            </Row>
          }
        />
      </header>

      <Stack gap={6}>
        <section className="portfolio-hero portfolio-section" id="top">
          <Stack gap={5}>
            <Row gap={4} wrap={false} align="center">
              <span className="portfolio-avatar">
                <Avatar
                  src="/me.jpg"
                  alt="Mehdi Oubara"
                  fallback="MO"
                  tone="mint"
                  size="lg"
                />
              </span>
              <Badge tone="mint">{t("hero.eyebrow")}</Badge>
            </Row>
            <Heading level={1}>
              <Highlight tone="yellow">{t("hero.name")}</Highlight>
            </Heading>
            <Heading level={2}>{t("hero.role")}</Heading>
            <Text muted>
              {t("hero.tagline")}
            </Text>
            <Row gap={3} wrap>
              <Button tone="purple" size="lg" onClick={() => openContactDialog()}>
                {t("hero.ctaPrimary")}
              </Button>
              <Button
                tone="blue"
                size="lg"
                variant="quiet"
                onClick={() => scrollToId("projects")}
              >
                {t("hero.ctaSecondary")}
              </Button>
            </Row>
            <Row gap={4} wrap>
              <Metric label="Based in" value="Tangier · Remote" num={false} />
              <Metric label="Email" value={contact.email} mono num={false} />
              <Metric label="Phone" value={contact.phone} mono num={false} />
            </Row>
          </Stack>
        </section>

        <Card>
          <Stack gap={4}>
            <Eyebrow>{t("roles.label")}</Eyebrow>
            <Segmented
              label={t("roles.label")}
              value={focus}
              onChange={setFocus}
              options={roleOptions}
              tone={roleTones[focus]}
            />
          </Stack>
        </Card>

        <section className="portfolio-section" id="about">
          <Stack gap={4}>
            <Eyebrow>{t("about.eyebrow")}</Eyebrow>
            <Heading level={2}>{t("about.title")}</Heading>
            <Text muted>
              {t("about.body")}
            </Text>
            <Grid cols={4} gap={4}>
              <Stat
                label={t("roles.backend")}
                value="APIs"
                icon="database"
                tone="blue"
              />
              <Stat
                label={t("roles.web3")}
                value="L2"
                icon="live"
                tone="mint"
              />
              <Stat
                label={t("roles.fullstack")}
                value="UI+API"
                icon="menu"
                tone="pink"
              />
              <Stat
                label={t("roles.devops")}
                value="Cloud"
                icon="cloud"
                tone="orange"
              />
            </Grid>
          </Stack>
        </section>

        <ExperienceSection
          items={filteredExperience}
          copy={{
            eyebrow: t("experience.eyebrow"),
            title: t("experience.title"),
            subtitle: t("experience.subtitle"),
            impactLabel: t("experience.impactLabel"),
            detailsOpen: t("experience.detailsOpen"),
            empty: t("experience.empty"),
            roleLabel: (role) => t(`roles.${role}`),
          }}
        />

        <ProjectsSection
          items={filteredProjects}
          copy={{
            eyebrow: t("projects.eyebrow"),
            title: t("projects.title"),
            subtitle: t("projects.subtitle"),
            open: t("projects.open"),
            close: t("projects.close"),
            stack: t("projects.stack"),
            visit: t("projects.visit"),
            visitPortal: t("projects.visitPortal"),
            gatedNote: t("projects.gatedNote"),
            empty: t("projects.empty"),
            roleLabel: (role) => t(`roles.${role}`),
          }}
        />

        <section className="portfolio-section" id="skills">
          <Stack gap={4}>
            <Eyebrow>{t("skills.eyebrow")}</Eyebrow>
            <Heading level={2}>{t("skills.title")}</Heading>
            <Grid cols={2} gap={4}>
              {(
                [
                  ["languages", skillGroups.languages],
                  ["frameworks", skillGroups.frameworks],
                  ["databases", skillGroups.databases],
                  ["tools", skillGroups.tools],
                ] as const
              ).map(([key, items]) => (
                <Card key={key} variant="tight">
                  <Stack gap={3}>
                    <Heading level={3}>{t(`skills.${key}`)}</Heading>
                    <Row gap={2} wrap>
                      {items.map((item) => (
                        <Badge key={item} tone="blue">
                          {item}
                        </Badge>
                      ))}
                    </Row>
                  </Stack>
                </Card>
              ))}
            </Grid>
            <Card variant="tight">
              <Stack gap={3}>
                <Heading level={3}>{t("skills.spoken")}</Heading>
                <Row gap={2} wrap>
                  {spoken.map((item) => (
                    <Badge key={item} tone="mint">
                      {item}
                    </Badge>
                  ))}
                </Row>
              </Stack>
            </Card>
          </Stack>
        </section>

        <EducationSection copy={educationCopy} />

        <CvViewer />

        <ContactForm />

        <CTA
          tone="mint"
          title={t("hero.ctaPrimary")}
          description={t("contact.body")}
          action={
            <Button tone="purple" onClick={() => openContactDialog()}>
              {t("nav.hire")}
            </Button>
          }
        />

        <Footer
          brand="Mehdi Oubara"
          tagline={t("footer.tagline")}
          note={t("footer.note")}
          columns={[
            {
              title: t("nav.contact"),
              links: [
                { href: `mailto:${contact.email}`, label: contact.email },
                { href: contact.linkedinUrl, label: "LinkedIn" },
              ],
            },
          ]}
        />
      </Stack>
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openContactDialog() {
  scrollToId("contact");
  window.dispatchEvent(new Event("portfolio:open-contact"));
}

function ContactForm() {
  const t = useTranslations("contact");
  const roles = useTranslations("roles");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    engagement: "fulltime",
    focus: [] as string[],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("portfolio:open-contact", onOpen);
    return () => window.removeEventListener("portfolio:open-contact", onOpen);
  }, []);

  const update = (key: "name" | "email" | "engagement" | "message", value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const engagementLabel = (value: string) => {
    const key = value as "fulltime" | "parttime" | "freelance" | "mission";
    return t(`engagementOptions.${key}`);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = t("errors.name");
    if (!EMAIL_PATTERN.test(form.email)) next.email = t("errors.email");
    if (form.focus.length === 0) next.focus = t("errors.focus");
    if (form.message.trim().length < 20) next.message = t("errors.message");
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          engagement: engagementLabel(form.engagement),
          focus: form.focus,
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        setErrors({ form: t("errors.send") });
        return;
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        engagement: "fulltime",
        focus: [],
        message: "",
      });
    } catch {
      setErrors({ form: t("errors.send") });
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setErrors({});
    setOpen(false);
  };

  return (
    <section className="portfolio-section" id="contact">
      <Stack gap={4}>
        <Badge tone="mint">{t("badge")}</Badge>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <Heading level={2}>{t("title")}</Heading>
        <Text muted>{t("body")}</Text>

        <Grid cols={2} gap={4}>
          <Card variant="tight" motion="tilt-left">
            <Row gap={3} wrap={false} align="top">
              <Blob icon="mail" tone="blue" size="sm" />
              <Stack gap={2}>
                <Text>{t("preferEmail")}</Text>
                <Text size="sm" muted>
                  {contact.email}
                </Text>
                <Button
                  tone="blue"
                  size="sm"
                  variant="quiet"
                  onClick={() => {
                    window.location.href = `mailto:${contact.email}`;
                  }}
                >
                  {t("emailCta")}
                </Button>
              </Stack>
            </Row>
          </Card>

          <Card variant="tight" motion="tilt-right">
            <Row gap={3} wrap={false} align="top">
              <Blob icon="users" tone="purple" size="sm" />
              <Stack gap={2}>
                <Text>{t("preferLinkedIn")}</Text>
                <Text size="sm" muted>
                  {contact.linkedinLabel}
                </Text>
                <Button
                  tone="purple"
                  size="sm"
                  variant="quiet"
                  onClick={() =>
                    window.open(contact.linkedinUrl, "_blank", "noopener,noreferrer")
                  }
                >
                  {t("linkedinCta")}
                </Button>
              </Stack>
            </Row>
          </Card>
        </Grid>

        <Card motion="lift" variant="tight">
          <Row gap={4} justify="between" wrap align="center">
            <Row gap={3} wrap={false} align="center">
              <Blob icon="send" tone="mint" size="sm" />
              <Stack gap={1}>
                <Text>{t("formCardTitle")}</Text>
                <Text size="sm" muted>
                  {t("formCardHint")}
                </Text>
              </Stack>
            </Row>

            <Dialog
              size="lg"
              open={open}
              onOpenChange={(next) => {
                setOpen(next);
                if (!next) {
                  setSubmitted(false);
                  setErrors({});
                }
              }}
              title={t("dialogTitle")}
              description={t("dialogDescription")}
              trigger={<Button tone="mint">{t("openForm")}</Button>}
            >
              <div className="portfolio-contact-dialog">
                {submitted ? (
                  <Stack gap={3}>
                    <Heading level={3}>{t("successTitle")}</Heading>
                    <Text muted>{t("successBody")}</Text>
                    <Button tone="mint" onClick={resetAndClose}>
                      OK
                    </Button>
                  </Stack>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <Stack gap={4}>
                      <Field label={t("name")} error={errors.name}>
                        {(id, describedBy) => (
                          <Input
                            id={id}
                            describedBy={describedBy}
                            value={form.name}
                            onChange={(value) => update("name", value)}
                            invalid={!!errors.name}
                            autoComplete="name"
                          />
                        )}
                      </Field>
                      <Field label={t("email")} error={errors.email}>
                        {(id, describedBy) => (
                          <Input
                            id={id}
                            describedBy={describedBy}
                            type="email"
                            value={form.email}
                            onChange={(value) => update("email", value)}
                            invalid={!!errors.email}
                            autoComplete="email"
                          />
                        )}
                      </Field>
                      <Select
                        label={t("engagement")}
                        value={form.engagement}
                        onChange={(value) => update("engagement", value)}
                        options={[
                          {
                            value: "fulltime",
                            label: t("engagementOptions.fulltime"),
                          },
                          {
                            value: "parttime",
                            label: t("engagementOptions.parttime"),
                          },
                          {
                            value: "freelance",
                            label: t("engagementOptions.freelance"),
                          },
                          {
                            value: "mission",
                            label: t("engagementOptions.mission"),
                          },
                        ]}
                      />
                      <FocusMultiSelect
                        label={t("focus")}
                        hint={t("focusHint")}
                        customLabel={t("focusCustom")}
                        customPlaceholder={t("focusCustomPlaceholder")}
                        addLabel={t("focusAdd")}
                        error={errors.focus}
                        value={form.focus}
                        onChange={(value) => {
                          setForm((current) => ({ ...current, focus: value }));
                          setErrors((current) => ({ ...current, focus: "" }));
                        }}
                        options={[
                          { value: "Back-End", label: roles("backend") },
                          { value: "Web3", label: roles("web3") },
                          { value: "Full stack", label: roles("fullstack") },
                          { value: "DevOps", label: roles("devops") },
                        ]}
                      />
                      <Field
                        label={t("message")}
                        hint={t("messageHint")}
                        error={errors.message}
                      >
                        {(id, describedBy) => (
                          <Textarea
                            id={id}
                            describedBy={describedBy}
                            value={form.message}
                            onChange={(value) => update("message", value)}
                            invalid={!!errors.message}
                          />
                        )}
                      </Field>
                      {errors.form ? (
                        <Text size="sm" muted>
                          {errors.form}
                        </Text>
                      ) : null}
                      <Button type="submit" tone="purple" loading={loading} block>
                        {loading ? t("sending") : t("submit")}
                      </Button>
                    </Stack>
                  </form>
                )}
              </div>
            </Dialog>
          </Row>
        </Card>
      </Stack>
    </section>
  );
}
