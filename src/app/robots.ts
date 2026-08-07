import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://omgeaks.com/sitemap.xml",
    host: "https://omgeaks.com",
  };
}
