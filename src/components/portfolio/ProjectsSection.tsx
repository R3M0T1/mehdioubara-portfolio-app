"use client";

import Image from "next/image";
import { useState } from "react";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/pouf/Button";
import { Badge } from "@/components/pouf/media";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { roleTones, type RoleFocus } from "@/content/profile";

export type ProjectItem = {
  id: string;
  title: string;
  client: string;
  summary: string;
  highlight: string;
  image: string;
  url: string;
  gated?: boolean;
  stack: string[];
  roles: string[];
};

type ProjectsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  open: string;
  close: string;
  stack: string;
  visit: string;
  visitPortal: string;
  gatedNote: string;
  empty: string;
  roleLabel: (role: Exclude<RoleFocus, "all">) => string;
};

export function ProjectsSection({
  copy,
  items,
}: {
  copy: ProjectsCopy;
  items: ProjectItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="portfolio-section" id="projects">
      <Stack gap={4}>
        <Stack gap={2}>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <Heading level={2}>{copy.title}</Heading>
          <Text muted>{copy.subtitle}</Text>
        </Stack>

        {items.length === 0 ? (
          <Card variant="tight">
            <Text muted>{copy.empty}</Text>
          </Card>
        ) : (
          <Grid cols={2} gap={4}>
            {items.map((project, index) => {
              const open = openId === project.id;
              return (
                <Card
                  key={project.id}
                  motion={index % 2 === 0 ? "tilt-left" : "tilt-right"}
                  variant="tight"
                >
                  <Stack gap={3}>
                    <a
                      className="portfolio-project-media"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${copy.visit}: ${project.title}`}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        className="portfolio-project-media__img"
                        sizes="(max-width: 900px) 100vw, 42vw"
                        priority={index === 0}
                      />
                      <span className="portfolio-project-media__fade" aria-hidden />
                    </a>

                    <Row gap={2} wrap>
                      <Badge tone="purple">{project.client}</Badge>
                      {project.gated ? (
                        <Badge tone="yellow">{copy.gatedNote}</Badge>
                      ) : null}
                    </Row>

                    <Heading level={3}>{project.title}</Heading>
                    <Text muted>{project.summary}</Text>
                    <Text size="sm">{project.highlight}</Text>

                    <Row gap={2} wrap>
                      {project.roles.map((role) => (
                        <Badge
                          key={role}
                          tone={roleTones[role as RoleFocus] ?? "idle"}
                        >
                          {copy.roleLabel(role as Exclude<RoleFocus, "all">)}
                        </Badge>
                      ))}
                    </Row>

                    <Row gap={2} wrap>
                      <Button
                        tone="mint"
                        onClick={() =>
                          window.open(project.url, "_blank", "noopener,noreferrer")
                        }
                      >
                        <span className="portfolio-project-cta">
                          {project.gated ? copy.visitPortal : copy.visit}
                          <IconExternalLink size={16} stroke={2.4} />
                        </span>
                      </Button>
                      <Button
                        tone="blue"
                        variant="quiet"
                        onClick={() =>
                          setOpenId(open ? null : project.id)
                        }
                      >
                        {open ? copy.close : copy.open}
                      </Button>
                    </Row>

                    {open ? (
                      <Stack gap={2}>
                        <Text size="sm">{copy.stack}</Text>
                        <Row gap={2} wrap>
                          {project.stack.map((tech) => (
                            <Badge key={tech} tone="blue">
                              {tech}
                            </Badge>
                          ))}
                        </Row>
                      </Stack>
                    ) : null}
                  </Stack>
                </Card>
              );
            })}
          </Grid>
        )}
      </Stack>
    </section>
  );
}
