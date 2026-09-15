import { Stack } from "@/components/pouf/layout";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { Link } from "@/i18n/navigation";

type Props = {
  code: string;
  title: string;
  description: string;
  homeLabel: string;
  contactLabel: string;
};

export function NotFoundView({
  code,
  title,
  description,
  homeLabel,
  contactLabel,
}: Props) {
  return (
    <div className="portfolio-shell portfolio-not-found">
      <div className="portfolio-not-found__card">
        <Stack gap={4}>
          <Eyebrow>{code}</Eyebrow>
          <Heading level={1}>{title}</Heading>
          <Text muted>{description}</Text>
          <div className="portfolio-not-found__actions">
            <Link href="/" className="portfolio-not-found__btn">
              {homeLabel}
            </Link>
            <Link
              href="/#contact"
              className="portfolio-not-found__btn portfolio-not-found__btn--quiet"
            >
              {contactLabel}
            </Link>
          </div>
        </Stack>
      </div>
    </div>
  );
}
