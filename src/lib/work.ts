export const WORK_CATEGORIES = [
  "All",
  "Websites",
  "Mobile apps",
  "CRM",
  "eCommerce",
  "Software",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export type WorkProject = {
  id: string;
  title: string;
  category: Exclude<WorkCategory, "All">;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  device: "video" | "laptop" | "phone";
  screen: "cafe" | "jewellery" | "crm" | "clinic" | "fashion" | "logistics" | "finance" | "agents";
  stage: "/demos/stages/stage-cafe.jpg" | "/demos/stages/stage-jewellery.jpg" | "/demos/stages/stage-crm.jpg" | "/demos/stages/stage-app.jpg";
  video?: string;
  poster?: string;
  featured?: boolean;
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "atelier-cafe",
    title: "Atelier Café",
    category: "Websites",
    eyebrow: "Hospitality website · 3D product film",
    summary:
      "A cinematic café website shown the way Instagram reels do it — laptop in a real café, 3D hero, floating product, Order Online.",
    description:
      "Hospitality brands need more than a menu PDF. This demo is the OmGeaks standard for café and restaurant sites: a lifestyle device film, a 3D product hero, and a conversion path that feels like a flagship, not a template.",
    highlights: [
      "3D product hero with cinematic lighting",
      "Reel-ready device-in-environment presentation",
      "Online ordering and reservation path",
      "Mobile-first, SEO-ready menu pages",
    ],
    stack: ["Next.js", "WebGL", "GSAP", "Razorpay"],
    device: "video",
    screen: "cafe",
    stage: "/demos/stages/stage-cafe.jpg",
    video: "/demos/cafe-hero.mp4",
    poster: "/demos/cafe-poster.jpg",
    featured: true,
  },
  {
    id: "sona-maison",
    title: "Sona Maison",
    category: "eCommerce",
    eyebrow: "Luxury jewellery store",
    summary: "Marble, gold, and a quiet checkout — eCommerce that feels like a boutique, not a catalogue.",
    description:
      "Jewellery and D2C luxury need trust on first glance. Sona Maison is a conversion-first storefront with cinematic product staging, GST-ready checkout, and collection pages built to rank.",
    highlights: [
      "Cinematic product grids and lookbooks",
      "UPI / Razorpay checkout",
      "Inventory, variants, GST invoices",
      "Schema for product and collection pages",
    ],
    stack: ["Next.js", "Razorpay", "Schema.org"],
    device: "laptop",
    screen: "jewellery",
    stage: "/demos/stages/stage-jewellery.jpg",
  },
  {
    id: "helios-crm",
    title: "Helios Revenue OS",
    category: "CRM",
    eyebrow: "Custom CRM software",
    summary: "Pipeline, WhatsApp, and forecasts in one command deck — built for Indian SMEs, not bolted-on SaaS.",
    description:
      "Helios is the CRM language OmGeaks ships for sales-led businesses: pipeline boards, activity timelines, and reporting that leadership actually opens. Designed as software you own.",
    highlights: [
      "Kanban pipeline and deal rooms",
      "WhatsApp + email activity timeline",
      "Role-based access for sales and ops",
      "Dashboards for weekly revenue reviews",
    ],
    stack: ["Laravel", "React", "PostgreSQL"],
    device: "laptop",
    screen: "crm",
    stage: "/demos/stages/stage-crm.jpg",
  },
  {
    id: "pulse-clinic",
    title: "Pulse Clinic",
    category: "Mobile apps",
    eyebrow: "iOS + Android clinic app",
    summary: "Appointments, reminders, and reports in a calm clinical UI — for clinics that still run on WhatsApp chaos.",
    description:
      "A dual-app product: patients book and receive reminders; staff manage slots and documents. Architecture is privacy-minded from day one.",
    highlights: [
      "Appointment booking and reminders",
      "Staff and patient roles",
      "Report and prescription vault",
      "Flutter for iOS and Android",
    ],
    stack: ["Flutter", "FastAPI", "Firebase"],
    device: "phone",
    screen: "clinic",
    stage: "/demos/stages/stage-app.jpg",
  },
  {
    id: "atelier-noir",
    title: "Atelier Noir",
    category: "Websites",
    eyebrow: "Fashion brand website",
    summary: "Editorial type, lookbook motion, and a shop path that still feels like a magazine.",
    description:
      "Fashion sites fail when they look like Shopify defaults. Atelier Noir is a brand site first — campaign films, lookbooks, then commerce.",
    highlights: [
      "Lookbook and campaign storytelling",
      "Collection merchandising",
      "Size, stock, and waitlist flows",
      "Core Web Vitals as a design constraint",
    ],
    stack: ["Next.js", "GSAP", "Shopify headless"],
    device: "laptop",
    screen: "fashion",
    stage: "/demos/stages/stage-app.jpg",
  },
  {
    id: "vertex-freight",
    title: "Vertex Freight",
    category: "Software",
    eyebrow: "Logistics operations platform",
    summary: "Dispatch, exceptions, and live lanes — enterprise ops software with a studio’s eye.",
    description:
      "Built for teams who move goods and cannot afford a pretty-but-broken dashboard. Exception queues, lane status, and operator workflows.",
    highlights: [
      "Live dispatch board",
      "Exception handling agents",
      "Partner and fleet roles",
      "Audit trail on every status change",
    ],
    stack: ["Python", "React", "AWS"],
    device: "laptop",
    screen: "logistics",
    stage: "/demos/stages/stage-crm.jpg",
  },
  {
    id: "nexus-ledger",
    title: "Nexus Ledger",
    category: "Mobile apps",
    eyebrow: "Fintech companion app",
    summary: "Balances, payouts, and compliance cues — a finance app that feels private-bank, not spreadsheet.",
    description:
      "A customer-facing finance companion with biometric lock, payout tracking, and calm typography. Pair with a web console for ops.",
    highlights: [
      "Biometric lock and session policy",
      "Payout and ledger views",
      "Alerting without noise",
      "iOS and Android from one codebase",
    ],
    stack: ["Flutter", "FastAPI", "AWS"],
    device: "phone",
    screen: "finance",
    stage: "/demos/stages/stage-app.jpg",
  },
  {
    id: "aether-agents",
    title: "Aether Agent Desk",
    category: "Software",
    eyebrow: "AI operations console",
    summary: "Agents that research, draft, and execute — with logs, confidence, and a human approval gate.",
    description:
      "Not a chatbot widget. Aether is an operations desk: tools, guardrails, and an audit trail so AI can run in real workflows.",
    highlights: [
      "Multi-agent workspace",
      "Tool calls with human approval",
      "Confidence-based escalation",
      "WhatsApp, email, and CRM connectors",
    ],
    stack: ["Next.js", "Python", "LLM tools"],
    device: "laptop",
    screen: "agents",
    stage: "/demos/stages/stage-crm.jpg",
  },
];

export const FEATURED_WORK_IDS = ["atelier-cafe", "sona-maison", "helios-crm", "pulse-clinic"] as const;
