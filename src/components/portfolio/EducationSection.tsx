"use client";

import Image from "next/image";
import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsViewport,
} from "@/components/animated-tabs";
import { Badge } from "@/components/pouf/media";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Metric } from "@/components/pouf/readout";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import type { Tone } from "@/components/pouf/tone";
import { cn } from "@/lib/utils";

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  period: string;
  location: string;
  status: string;
  summary: string;
  focus: string[];
};

export type CertItem = {
  id: string;
  title: string;
  issuer: string;
  platform: string;
  summary: string;
  skills: string[];
};

type EducationCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  schoolsTitle: string;
  certsTitle: string;
  focusLabel: string;
  skillsLabel: string;
  tabEmsi: string;
  tabIsta: string;
  tabCerts: string;
  stats: {
    schools: string;
    certs: string;
    years: string;
  };
  items: EducationItem[];
  certs: CertItem[];
};

const schoolTone: Record<string, Tone> = {
  emsi: "purple",
  ista: "mint",
};

const certTone: Tone[] = ["pink", "blue", "yellow", "mint"];

const tabArt: Record<"emsi" | "ista", { src: string; alt: string }> = {
  emsi: {
    src: "/education/emsi.jpg",
    alt: "Abstract landscape illustration for EMSI",
  },
  ista: {
    src: "/education/ista.jpg",
    alt: "Abstract landscape illustration for ISTA",
  },
};

function EduArt({ tab }: { tab: keyof typeof tabArt }) {
  const art = tabArt[tab];
  return (
    <div className="portfolio-edu-illust">
      <Image
        src={art.src}
        alt={art.alt}
        fill
        className="portfolio-edu-illust__img"
        sizes="(max-width: 860px) 100vw, 42vw"
        priority={tab === "emsi"}
      />
    </div>
  );
}

function SchoolPanel({
  item,
  focusLabel,
  tab,
}: {
  item: EducationItem;
  focusLabel: string;
  tab: "emsi" | "ista";
}) {
  return (
    <div className="portfolio-edu-panel">
      <Stack gap={3}>
        <Badge tone={schoolTone[item.id] ?? "purple"}>{item.status}</Badge>
        <Heading level={3}>{item.school}</Heading>
        <Text>{item.degree}</Text>
        <Text size="sm" muted>
          {item.period} · {item.location}
        </Text>
        <Text muted>{item.summary}</Text>
        <Text size="sm">{focusLabel}</Text>
        <Row gap={2} wrap>
          {item.focus.map((tag) => (
            <Badge key={tag} tone="blue">
              {tag}
            </Badge>
          ))}
        </Row>
      </Stack>
      <EduArt tab={tab} />
    </div>
  );
}

export function EducationSection({ copy }: { copy: EducationCopy }) {
  const emsi = copy.items.find((item) => item.id === "emsi") ?? copy.items[0];
  const ista = copy.items.find((item) => item.id === "ista") ?? copy.items[1];

  return (
    <section className="portfolio-section" id="education">
      <Stack gap={5}>
        <Stack gap={2}>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <Heading level={2}>{copy.title}</Heading>
          <Text muted>{copy.subtitle}</Text>
        </Stack>

        <Row gap={4} wrap>
          <Metric label={copy.stats.schools} value="2" />
          <Metric label={copy.stats.certs} value="4" />
          <Metric label={copy.stats.years} value="2020→" />
        </Row>

        <AnimatedTabs
          defaultValue="emsi"
          activationMode="manual"
          className={cn("portfolio-edu-tabs")}
        >
          <AnimatedTabsList className="portfolio-edu-tabs__list">
            <AnimatedTabsTrigger value="emsi">
              {copy.tabEmsi}
            </AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="ista">
              {copy.tabIsta}
            </AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="certs">
              {copy.tabCerts}
            </AnimatedTabsTrigger>
          </AnimatedTabsList>

          <AnimatedTabsViewport className="portfolio-edu-tabs__viewport">
            <AnimatedTabsContent value="emsi">
              {emsi ? (
                <SchoolPanel item={emsi} focusLabel={copy.focusLabel} tab="emsi" />
              ) : null}
            </AnimatedTabsContent>

            <AnimatedTabsContent value="ista">
              {ista ? (
                <SchoolPanel item={ista} focusLabel={copy.focusLabel} tab="ista" />
              ) : null}
            </AnimatedTabsContent>

            <AnimatedTabsContent value="certs">
              <Stack gap={3}>
                <Heading level={3}>{copy.certsTitle}</Heading>
                <Grid cols={2} gap={3}>
                  {copy.certs.map((cert, index) => (
                    <div key={cert.id} className="portfolio-edu-cert">
                      <Stack gap={2}>
                        <Row gap={2} wrap>
                          <Badge tone={certTone[index % certTone.length]}>
                            {cert.platform}
                          </Badge>
                        </Row>
                        <Text>{cert.title}</Text>
                        <Text size="sm" muted>
                          {cert.issuer}
                        </Text>
                        <Text size="sm" muted>
                          {cert.summary}
                        </Text>
                        <Row gap={2} wrap>
                          {cert.skills.map((skill) => (
                            <Badge key={skill} tone="idle">
                              {skill}
                            </Badge>
                          ))}
                        </Row>
                      </Stack>
                    </div>
                  ))}
                </Grid>
              </Stack>
            </AnimatedTabsContent>
          </AnimatedTabsViewport>
        </AnimatedTabs>
      </Stack>
    </section>
  );
}
