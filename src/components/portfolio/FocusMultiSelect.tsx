"use client";

import { useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Badge } from "@/components/pouf/media";
import { Field, Input } from "@/components/pouf/Input";
import { Row, Stack } from "@/components/pouf/layout";
import { Text } from "@/components/pouf/text";
import { cn } from "@/lib/utils";

export type FocusOption = {
  value: string;
  label: string;
};

type FocusMultiSelectProps = {
  label: string;
  hint: string;
  customLabel: string;
  customPlaceholder: string;
  addLabel: string;
  error?: string;
  options: FocusOption[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function FocusMultiSelect({
  label,
  hint,
  customLabel,
  customPlaceholder,
  addLabel,
  error,
  options,
  value,
  onChange,
}: FocusMultiSelectProps) {
  const [custom, setCustom] = useState("");

  const toggle = (next: string) => {
    onChange(
      value.includes(next)
        ? value.filter((item) => item !== next)
        : [...value, next],
    );
  };

  const addCustom = () => {
    const trimmed = custom.trim();
    if (!trimmed) return;
    if (!value.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...value, trimmed]);
    }
    setCustom("");
  };

  return (
    <Stack gap={2}>
      <Text size="sm">{label}</Text>
      <Text size="sm" muted>
        {hint}
      </Text>

      <Row gap={2} wrap>
        {options.map((option) => {
          const selected = value.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={cn(
                "portfolio-focus-chip",
                selected && "portfolio-focus-chip--selected",
              )}
              aria-pressed={selected}
              onClick={() => toggle(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </Row>

      {value.length > 0 ? (
        <Row gap={2} wrap>
          {value.map((item) => {
            const optionLabel =
              options.find((option) => option.value === item)?.label ?? item;
            return (
              <button
                key={item}
                type="button"
                className="portfolio-focus-selected"
                onClick={() => toggle(item)}
                aria-label={`Remove ${optionLabel}`}
              >
                <Badge tone="mint">{optionLabel}</Badge>
                <IconX size={14} stroke={2.4} aria-hidden />
              </button>
            );
          })}
        </Row>
      ) : null}

      <Field label={customLabel} error={error}>
        {(id, describedBy) => (
          <Row gap={2} wrap={false} align="center">
            <Input
              id={id}
              describedBy={describedBy}
              value={custom}
              onChange={setCustom}
              placeholder={customPlaceholder}
              invalid={!!error}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addCustom();
                }
              }}
            />
            <button
              type="button"
              className="portfolio-focus-add"
              onClick={addCustom}
              aria-label={addLabel}
            >
              <IconPlus size={18} stroke={2.4} />
            </button>
          </Row>
        )}
      </Field>
    </Stack>
  );
}
