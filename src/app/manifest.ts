import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    short_name: siteConfig.shortName,
    description:
      "Portfolio of Mehdi Oubara — back-end, Web3, full-stack and DevOps engineer.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    lang: "en",
    dir: "ltr",
    categories: ["business", "productivity", "portfolio"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
