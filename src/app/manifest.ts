import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OmGeaks — AI & Product Engineering",
    short_name: "OmGeaks",
    description:
      "Software, website & mobile app development company — AI agents, automation, CRM, and cloud by OmGeaks.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#051937",
    icons: [
      {
        src: "/favicon-omgeaks.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
