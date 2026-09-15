import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const host = (() => {
    try {
      return new URL(getSiteUrl()).host;
    } catch {
      return undefined;
    }
  })();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host,
  };
}
