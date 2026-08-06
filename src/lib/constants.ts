export { COMPANY, BRAND } from "@/lib/brand";

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "AI Agents", href: "/#agents" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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

/** Seven flagship capabilities — one clear story each */
export const SERVICES = [
  {
    title: "AI Agents",
    description:
      "Production agents that research, decide, and execute workflows with guardrails, logging, and human oversight.",
    outcome: "Hours of ops work automated daily",
    icon: "RiRobot2Line",
  },
  {
    title: "Business Automation",
    description:
      "End-to-end pipelines across CRM, email, finance, and internal tools — designed for reliability, not demos.",
    outcome: "Fewer handoffs, faster cycle time",
    icon: "RiFlowChart",
  },
  {
    title: "Custom Software",
    description:
      "Mission-critical applications tailored to your domain — from internal platforms to customer-facing products.",
    outcome: "Software that fits how you operate",
    icon: "RiPuzzleLine",
  },
  {
    title: "Mobile Apps",
    description:
      "iOS and Android products with native feel, offline resilience, and analytics wired for growth.",
    outcome: "Ship to both stores with one team",
    icon: "RiSmartphoneLine",
  },
  {
    title: "Enterprise CRM",
    description:
      "Custom CRM and revenue systems that unify pipeline, data, and reporting — not bolted-on SaaS sprawl.",
    outcome: "One source of truth for sales",
    icon: "RiOrganizationChart",
  },
  {
    title: "Cloud Solutions",
    description:
      "AWS architectures for scale, security, and cost control — CI/CD, observability, and zero-drama deploys.",
    outcome: "Infrastructure that grows with you",
    icon: "RiServerLine",
  },
  {
    title: "Product Engineering",
    description:
      "Embedded senior teams that own discovery, architecture, build, and launch like an in-house product org.",
    outcome: "Velocity without quality debt",
    icon: "RiToolsLine",
  },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Engineering company, not an agency",
    description:
      "We ship production systems — agents, platforms, and products — led by senior engineers, not slide decks.",
  },
  {
    title: "AI that earns its place",
    description:
      "Agents and automation only where they create measurable leverage: latency, cost, accuracy, or throughput.",
  },
  {
    title: "Architecture before aesthetics",
    description:
      "Security, observability, and scale are designed on day one. Interfaces follow from clear system design.",
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
    q: "What does OmGeaks actually build?",
    a: "AI agents, business automation, custom software, mobile apps, enterprise CRM, cloud platforms, and full product engineering engagements — production systems, not marketing sites.",
  },
  {
    q: "How are you different from a typical agency?",
    a: "We are an AI & Product Engineering company. Engagements are senior-led, architecture-first, and measured by operational outcomes — uptime, automation rate, and shipped product — not billable hours of design.",
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
    q: "Can you take over an existing codebase?",
    a: "Yes. We audit, stabilize, and modernize — then accelerate delivery without unnecessary rewrites.",
  },
] as const;

export const ASSISTANT_REPLIES = [
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
    id: "crm",
    label: "CRM / Cloud",
    message: "I'd like help with CRM or cloud infrastructure.",
  },
  {
    id: "consult",
    label: "Book a consultation",
    message: "I'd like to book a consultation with OmGeaks.",
  },
] as const;
