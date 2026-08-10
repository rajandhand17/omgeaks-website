import { SITE_URL } from "@/lib/seo";

export type ServicePageContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  highlights: { title: string; body: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
};

export const SERVICE_PAGES: ServicePageContent[] = [
  {
    slug: "software-development",
    title: "Custom Software Development",
    metaTitle: "Custom Software Development Company",
    metaDescription:
      "OmGeaks is a custom software development company in Ludhiana, Punjab building business software, web platforms, CRM, and cloud systems for startups and enterprises.",
    h1: "Custom software development for businesses that need production systems",
    intro:
      "OmGeaks Pvt. Ltd. designs and builds custom software for companies that outgrow off-the-shelf tools. From internal platforms and CRM to customer-facing products, we engineer reliable systems — not demos — from our base in Samrala, Ludhiana (Punjab), for clients across India and worldwide.",
    highlights: [
      {
        title: "Business software that fits your process",
        body: "We map how your teams work, then build applications that reduce manual work, unify data, and scale with your operations.",
      },
      {
        title: "Full-stack product engineering",
        body: "Architecture, APIs, databases, admin panels, and integrations — delivered by senior engineers with clear milestones.",
      },
      {
        title: "Secure and maintainable by design",
        body: "Authentication, roles, audits, and cloud deployment are planned on day one so your software stays safe as you grow.",
      },
    ],
    deliverables: [
      "Discovery & technical architecture",
      "Custom web applications & portals",
      "API development & third-party integrations",
      "CRM / ERP-style business systems",
      "Cloud hosting, CI/CD & monitoring",
      "Ongoing product iteration & support",
    ],
    faqs: [
      {
        q: "What kind of software does OmGeaks build?",
        a: "Custom business applications, SaaS products, internal tools, CRM platforms, automation backends, and API-driven systems tailored to your domain.",
      },
      {
        q: "Do you work with startups and established companies?",
        a: "Yes. We support MVP builds through enterprise platforms — always with production quality, documentation, and a clear roadmap.",
      },
    ],
    keywords: [
      "custom software development",
      "software development company",
      "software company Ludhiana",
      "business software development",
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    metaTitle: "Website Development Company in Ludhiana",
    metaDescription:
      "Professional website development by OmGeaks — fast, SEO-ready, conversion-focused websites and web apps for businesses in Ludhiana, Punjab and worldwide.",
    h1: "Website development that looks premium and converts visitors",
    intro:
      "Need a high-performing company website, product site, or marketing web experience? OmGeaks builds modern websites with strong SEO foundations, clear messaging, and engineering quality — so your brand ranks, loads fast, and turns visitors into leads.",
    highlights: [
      {
        title: "SEO-ready from launch",
        body: "Clean structure, metadata, sitemap, and performance so Google can understand and rank your pages for brand and service searches.",
      },
      {
        title: "Design with purpose",
        body: "Luxury clarity without clutter — one strong story, clear CTAs, and mobile-first layouts that work for technical and non-technical buyers.",
      },
      {
        title: "Built on modern stacks",
        body: "Next.js and React experiences that are fast, secure, and easy to extend when you add booking, CRM, or AI features later.",
      },
    ],
    deliverables: [
      "Business & product website design",
      "Next.js / React development",
      "On-page SEO setup (titles, schema, sitemap)",
      "Contact forms, WhatsApp & lead capture",
      "CMS or content-friendly sections",
      "Analytics & conversion tracking setup",
    ],
    faqs: [
      {
        q: "Do you build marketing websites or only complex apps?",
        a: "Both. We build premium business websites and full web applications. Every site is engineered for speed, SEO, and lead generation.",
      },
      {
        q: "Can you redesign an existing website?",
        a: "Yes. We audit what you have, keep what works, and rebuild structure, design, and SEO so the site supports growth.",
      },
    ],
    keywords: [
      "website development company",
      "website development Ludhiana",
      "web development company Punjab",
      "company website design",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    metaTitle: "Mobile App Development Company | iOS & Android",
    metaDescription:
      "OmGeaks builds iOS and Android mobile apps with Flutter and native-feel UX — from MVP to store-ready products for businesses in India and globally.",
    h1: "Mobile app development for iOS and Android",
    intro:
      "From consumer apps to field-force and business tools, OmGeaks delivers mobile applications with smooth UX, reliable backends, and store-ready quality. We help founders and companies ship apps that users actually keep.",
    highlights: [
      {
        title: "Cross-platform speed with Flutter",
        body: "Ship iOS and Android from one codebase without sacrificing polish — ideal for MVPs and growing products.",
      },
      {
        title: "Backend + app as one system",
        body: "APIs, auth, notifications, analytics, and admin panels are designed together so the app stays stable in production.",
      },
      {
        title: "Growth-ready product thinking",
        body: "Onboarding, retention flows, and analytics are planned early so you can learn from real users after launch.",
      },
    ],
    deliverables: [
      "iOS & Android app development",
      "Flutter / React Native product builds",
      "UI/UX for mobile journeys",
      "Push notifications & offline support",
      "App Store & Play Store submission support",
      "Post-launch updates & maintenance",
    ],
    faqs: [
      {
        q: "Do you publish apps to the App Store and Play Store?",
        a: "Yes. We prepare builds, store listings, and compliance requirements, and support you through submission and updates.",
      },
      {
        q: "Can you connect the app to our website or CRM?",
        a: "Absolutely. We integrate APIs, payment gateways, CRM, and internal systems so mobile is part of your full software stack.",
      },
    ],
    keywords: [
      "mobile app development company",
      "Android app development",
      "iOS app development",
      "Flutter app development Ludhiana",
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Agents & Automation",
    metaTitle: "AI Agents & Business Automation Company",
    metaDescription:
      "OmGeaks builds production AI agents and business automation that research, execute workflows, and reduce manual ops — with guardrails and monitoring.",
    h1: "AI agents and automation that work in production",
    intro:
      "OmGeaks specializes in AI agents and workflow automation that plug into your real tools — CRM, email, databases, and support systems — with logging, guardrails, and human oversight.",
    highlights: [
      {
        title: "Agents with accountability",
        body: "Tool use, evaluation, and escalation paths so agents help your team without uncontrolled risk.",
      },
      {
        title: "Automation across your stack",
        body: "Connect CRM, WhatsApp, email, finance, and internal APIs into reliable pipelines.",
      },
      {
        title: "Measurable ROI",
        body: "We define success as hours saved, faster response times, and fewer handoffs — not flashy demos.",
      },
    ],
    deliverables: [
      "Custom AI agents for ops & support",
      "RAG knowledge assistants",
      "n8n / API workflow automation",
      "CRM & messaging integrations",
      "Monitoring, logs & guardrails",
      "Team training & runbooks",
    ],
    faqs: [
      {
        q: "Are your AI solutions only prototypes?",
        a: "No. We ship production agents with observability, permissions, and clear escalation when confidence is low.",
      },
      {
        q: "Can AI be added to our existing software?",
        a: "Yes. We integrate agents and automation into websites, apps, and internal systems you already use.",
      },
    ],
    keywords: [
      "AI agents development",
      "business automation company",
      "AI software company",
      "AI automation Ludhiana",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function serviceCanonical(slug: string) {
  return `${SITE_URL}/services/${slug}`;
}
