"use client";

import { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/pouf/media";
import { Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { roleTones, type RoleFocus } from "@/content/profile";
import { cn } from "@/lib/utils";

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  impact: string[];
  roles: string[];
  bullets: string[];
};

type ExperienceCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  impactLabel: string;
  detailsOpen: string;
  empty: string;
  roleLabel: (role: Exclude<RoleFocus, "all">) => string;
};

const companyTone: Record<
  string,
  "purple" | "mint" | "blue" | "pink" | "orange"
> = {
  flex: "mint",
  taliware: "blue",
  cmh: "orange",
};

function companyInitials(company: string) {
  const parts = company.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ExperienceCard({
  item,
  open,
  onToggle,
  copy,
}: {
  item: ExperienceItem;
  open: boolean;
  onToggle: () => void;
  copy: ExperienceCopy;
}) {
  const reduceMotion = useReducedMotion();
  const tone = companyTone[item.id] ?? "purple";
  const panelId = `experience-panel-${item.id}`;
  const triggerId = `experience-trigger-${item.id}`;

  return (
    <div className="portfolio-exp-item">
      <div className="portfolio-exp-rail" aria-hidden>
        <span className={cn("portfolio-exp-dot", `tone-${tone}`)} />
      </div>

      <Card motion="lift" variant="tight">
        <Heading level={3}>
          <button
            id={triggerId}
            type="button"
            className="portfolio-exp-trigger"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
          >
            <span
              className={cn("portfolio-exp-mono", `tone-${tone}`)}
              aria-hidden
            >
              {companyInitials(item.company)}
            </span>

            <span className="portfolio-exp-trigger__copy">
              <Row gap={2} wrap>
                <Badge tone={tone}>{item.type}</Badge>
                <Text size="sm" muted>
                  {item.period}
                </Text>
              </Row>
              <span className="portfolio-exp-role">{item.role}</span>
              <Text>
                {item.company}
                <span className="portfolio-exp-sep" aria-hidden>
                  ·
                </span>
                <span className="portfolio-exp-loc">{item.location}</span>
              </Text>
              <Text muted>{item.summary}</Text>
              <Row gap={2} wrap>
                {item.roles.map((role) => (
                  <Badge
                    key={role}
                    tone={roleTones[role as RoleFocus] ?? "purple"}
                  >
                    {copy.roleLabel(role as Exclude<RoleFocus, "all">)}
                  </Badge>
                ))}
              </Row>
            </span>

            <span
              className={cn(
                "portfolio-exp-chevron",
                open && "portfolio-exp-chevron--open",
              )}
              aria-hidden
            >
              <IconChevronDown size={22} stroke={2.4} />
            </span>
          </button>
        </Heading>

        <div className="portfolio-exp-impact">
          <Text size="sm">{copy.impactLabel}</Text>
          <Row gap={2} wrap>
            {item.impact.map((chip) => (
              <Badge key={chip} tone="idle">
                {chip}
              </Badge>
            ))}
          </Row>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="portfolio-exp-details"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ul className="portfolio-exp-bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Text size="sm">{bullet}</Text>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!open ? (
          <div className="portfolio-exp-hint">
            <Text size="sm" muted>
              {copy.detailsOpen}
            </Text>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

export function ExperienceSection({
  copy,
  items,
}: {
  copy: ExperienceCopy;
  items: ExperienceItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      setOpenId(null);
      return;
    }
    setOpenId((current) =>
      current && items.some((item) => item.id === current) ? current : null,
    );
  }, [items]);

  return (
    <section className="portfolio-section" id="experience">
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
          <div className="portfolio-exp-timeline">
            {items.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                open={openId === item.id}
                onToggle={() =>
                  setOpenId((current) =>
                    current === item.id ? null : item.id,
                  )
                }
                copy={copy}
              />
            ))}
          </div>
        )}
      </Stack>
    </section>
  );
}
