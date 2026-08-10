export { COMPANY, BRAND } from "@/lib/brand";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_SERVICE_LINKS = [
  { label: "Software Development", href: "/services/software-development" },
  { label: "Website Development", href: "/services/website-development" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
  { label: "AI Agents & Automation", href: "/services/ai-agents" },
] as const;

export const TECH_STACK = [
  { name: "Python", icon: "SiPython" },
  { name: "Laravel", icon: "SiLaravel" },
  { name: "FastAPI", icon: "SiFastapi" },
  { name: "React", icon: "SiReact" },
  { name: "Next.js", icon: "SiNextdotjs" },
  { name: "Flutter", icon: "SiFlutter" },
  { name: "Docker", icon: "SiDocker" },
  { name: "AWS", icon: "SiAmazonwebservices" },
  { name: "OpenAI", icon: "SiOpenai" },
  { name: "n8n", icon: "SiN8N" },
] as const;

/** Flagship capabilities — linked to SEO service pages where applicable */
export const SERVICES = [
  {
    title: "Website Development",
    description:
      "Premium business websites and web apps that load fast, rank on Google, and convert visitors into leads.",
    outcome: "A site that works as a growth engine",
    icon: "RiGlobalLine",
    href: "/services/website-development",
  },
  {
    title: "Custom Software",
    description:
      "Mission-critical applications tailored to your domain — from internal platforms to customer-facing products.",
    outcome: "Software that fits how you operate",
    icon: "RiPuzzleLine",
    href: "/services/software-development",
  },
  {
    title: "Mobile Apps",
    description:
      "iOS and Android products with native feel, offline resilience, and analytics wired for growth.",
    outcome: "Ship to both stores with one team",
    icon: "RiSmartphoneLine",
    href: "/services/mobile-app-development",
  },
  {
    title: "AI Agents",
    description:
      "Production agents that research, decide, and execute workflows with guardrails, logging, and human oversight.",
    outcome: "Hours of ops work automated daily",
    icon: "RiRobot2Line",
    href: "/services/ai-agents",
  },
  {
    title: "Business Automation",
    description:
      "End-to-end pipelines across CRM, email, finance, and internal tools — designed for reliability, not demos.",
    outcome: "Fewer handoffs, faster cycle time",
    icon: "RiFlowChart",
    href: "/services/ai-agents",
  },
  {
    title: "Enterprise CRM",
    description:
      "Custom CRM and revenue systems that unify pipeline, data, and reporting — not bolted-on SaaS sprawl.",
    outcome: "One source of truth for sales",
    icon: "RiOrganizationChart",
    href: "/services/software-development",
  },
  {
    title: "Cloud Solutions",
    description:
      "AWS architectures for scale, security, and cost control — CI/CD, observability, and zero-drama deploys.",
    outcome: "Infrastructure that grows with you",
    icon: "RiServerLine",
    href: "/services/software-development",
  },
  {
    title: "Product Engineering",
    description:
      "Embedded senior teams that own discovery, architecture, build, and launch like an in-house product org.",
    outcome: "Velocity without quality debt",
    icon: "RiToolsLine",
    href: "/services",
  },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Software company, not just an agency",
    description:
      "We ship production websites, apps, and software systems — led by senior engineers, not slide decks alone.",
  },
  {
    title: "AI that earns its place",
    description:
      "Agents and automation only where they create measurable leverage: latency, cost, accuracy, or throughput.",
  },
  {
    title: "Architecture before aesthetics",
    description:
      "Security, SEO, observability, and scale are designed on day one. Interfaces follow from clear system design.",
  },
  {
    title: "Transparent delivery",
    description:
      "Fixed discovery, visible milestones, continuous demos. You always know what shipped and what’s next.",
  },
] as const;

export const AI_AGENTS = [
  {
    title: "Research Agent",
    description:
      "Scans markets, competitors, and documents — delivering structured briefs your team can act on.",
    capability: "Knowledge synthesis",
    stack: "LLM · RAG · evals",
  },
  {
    title: "Ops Automation Agent",
    description:
      "Orchestrates multi-step processes across CRM, email, and internal APIs with audit trails.",
    capability: "Workflow execution",
    stack: "n8n · FastAPI · queues",
  },
  {
    title: "Support Copilot",
    description:
      "Resolves tickets with context from your knowledge base — escalates when confidence is low.",
    capability: "Customer operations",
    stack: "RAG · tools · Slack",
  },
  {
    title: "Data Analyst Agent",
    description:
      "Queries live data, flags anomalies, and produces executive-ready summaries on a schedule.",
    capability: "Decision intelligence",
    stack: "SQL · Python · alerts",
  },
] as const;

export const INDUSTRIES = [
  {
    name: "Healthcare",
    description: "Clinical workflows, patient platforms, and compliant AI systems.",
  },
  {
    name: "Finance",
    description: "Secure fintech products, trading tools, and revenue platforms.",
  },
  {
    name: "Manufacturing",
    description: "Supply-chain systems, IoT dashboards, and plant automation.",
  },
  {
    name: "Education",
    description: "Learning platforms, admin systems, and adaptive content engines.",
  },
  {
    name: "Retail",
    description: "Commerce platforms, inventory intelligence, and personalization.",
  },
  {
    name: "Real Estate",
    description: "Proptech platforms, listing engines, and transaction workflows.",
  },
] as const;

export const PORTFOLIO = [
  {
    id: "nexus",
    title: "Nexus Finance",
    category: "Fintech Platform",
    description: "Real-time wealth orchestration with automated compliance workflows.",
    year: "2025",
    tags: ["AI", "SaaS", "Finance"],
    outcome: "2.4× faster ops review cycles",
  },
  {
    id: "lumen",
    title: "Lumen Health",
    category: "Healthcare AI",
    description: "Clinical intelligence suite powered by agentic document workflows.",
    year: "2025",
    tags: ["AI Agents", "Healthcare"],
    outcome: "68% less manual chart prep",
  },
  {
    id: "orbit",
    title: "Orbit Commerce",
    category: "E-commerce SaaS",
    description: "Multi-brand commerce OS with inventory automation and CRM sync.",
    year: "2024",
    tags: ["SaaS", "Retail", "Automation"],
    outcome: "Unified 12 brands on one stack",
  },
  {
    id: "vertex",
    title: "Vertex Logistics",
    category: "Enterprise Platform",
    description: "Global supply-chain command with exception-handling agents.",
    year: "2024",
    tags: ["Enterprise", "Cloud"],
    outcome: "99.95% dispatch uptime",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    description: "Map outcomes, systems, constraints, and where AI creates real leverage.",
  },
  {
    step: "02",
    title: "Architect",
    description: "Design product, data, and agent architecture with clear ownership boundaries.",
  },
  {
    step: "03",
    title: "Build",
    description: "Ship in weekly increments with demos, tests, and production-ready quality bars.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Hardened releases with monitoring, rollback plans, and operator runbooks.",
  },
  {
    step: "05",
    title: "Scale",
    description: "Optimize cost, latency, and features as usage and ambition grow.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "OmGeaks didn't deliver a prototype — they put agents into production with the same rigor as our core banking stack.",
    name: "Sarah Chen",
    role: "CTO, Nexus Finance",
  },
  {
    quote:
      "Clear architecture, honest timelines, and systems our clinicians actually use. Rare combination.",
    name: "Marcus Webb",
    role: "Founder, Lumen Health",
  },
  {
    quote:
      "They operate like an embedded product team. We moved from idea to multi-tenant SaaS without rebuilding twice.",
    name: "Priya Malhotra",
    role: "VP Product, Orbit Commerce",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "What is the correct name — OmGeaks or Omega?",
    a: "Our company name is OmGeaks Pvt. Ltd. (brand: OmGeaks). We are a software company in Samrala, Ludhiana, Punjab. We are not Omega Pvt. Ltd. or any Omega brand. Website: omgeaks.com.",
  },
  {
    q: "What does OmGeaks build?",
    a: "OmGeaks builds custom software, business websites, mobile apps (iOS & Android), AI agents, automation, CRM systems, and cloud platforms — production-ready digital products for growing companies.",
  },
  {
    q: "Are you a software company or a web design agency?",
    a: "We are a software company. We design and develop websites, web apps, and mobile apps with engineering depth — SEO, performance, security, and integrations included — not just visual mockups.",
  },
  {
    q: "Where is OmGeaks located?",
    a: "OmGeaks Pvt. Ltd. is based in Street No 2, Kamal Colony, Samrala, Ludhiana, Punjab (India). We serve clients across Punjab, India, and internationally.",
  },
  {
    q: "Do your AI agents work in production?",
    a: "Yes. We design agents with tools, guardrails, evaluation, and observability so they can run in real workflows — with clear escalation paths when confidence is low.",
  },
  {
    q: "How do engagements start?",
    a: "Book a consultation or message us on WhatsApp. We run a focused discovery, propose architecture and milestones, then begin build with visible weekly progress.",
  },
  {
    q: "Can you take over an existing website or codebase?",
    a: "Yes. We audit, stabilize, and modernize websites, apps, and software — then accelerate delivery without unnecessary rewrites.",
  },
] as const;

export const ASSISTANT_REPLIES = [
  {
    id: "website",
    label: "Website",
    message: "I'd like to build or redesign a business website.",
  },
  {
    id: "software",
    label: "Custom Software",
    message: "I'd like to build custom software / a product with OmGeaks.",
  },
  {
    id: "mobile",
    label: "Mobile App",
    message: "I'd like to build a mobile application.",
  },
  {
    id: "agents",
    label: "AI Agents",
    message: "I'd like to discuss AI agents for our business.",
  },
  {
    id: "automation",
    label: "Business Automation",
    message: "I'd like to automate workflows across our tools.",
  },
  {
    id: "consult",
    label: "Book a consultation",
    message: "I'd like to book a consultation with OmGeaks.",
  },
] as const;
