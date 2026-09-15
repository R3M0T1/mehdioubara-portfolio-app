import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Required for the multi-stage Dockerfile / Dokploy image.
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/output
  output: "standalone",
};

export default withNextIntl(nextConfig);
