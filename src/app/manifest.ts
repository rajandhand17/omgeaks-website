import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OmGeaks — AI & Product Engineering",
    short_name: "OmGeaks",
    description:
      "AI & Product Engineering IT company — AI agents, automation, software, mobile apps, CRM, and cloud.",
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
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
