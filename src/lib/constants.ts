export const COMPANY = {
  name: "OmGeaks",
  tagline: "Engineering Future Digital Experiences.",
  email: "hello@omgeaks.com",
  phone: "+1 (800) 555-0199",
  location: "Global · Remote-first",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "AI", href: "#ai" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
  {
    title: "Premium Website Development",
    description:
      "Award-caliber web experiences engineered for performance, narrative, and conversion.",
    icon: "globe",
  },
  {
    title: "Enterprise Web Applications",
    description:
      "Mission-critical platforms built for scale, security, and operational excellence.",
    icon: "building",
  },
  {
    title: "Mobile Application Development",
    description:
      "Native-feeling Android & iOS products with fluid motion and enterprise reliability.",
    icon: "mobile",
  },
  {
    title: "Custom CRM & ERP Systems",
    description:
      "Tailored business systems that unify data, workflows, and decision intelligence.",
    icon: "crm",
  },
  {
    title: "AI Integration",
    description:
      "Seamless LLM and model integration woven into your product and operations.",
    icon: "ai",
  },
  {
    title: "AI Agents",
    description:
      "Autonomous agents that research, execute, and orchestrate complex business tasks.",
    icon: "agent",
  },
  {
    title: "Business Automation",
    description:
      "Intelligent pipelines that eliminate friction and multiply team throughput.",
    icon: "automation",
  },
  {
    title: "API Development",
    description:
      "Robust, documented APIs designed for developer delight and long-term scale.",
    icon: "api",
  },
  {
    title: "SaaS Product Development",
    description:
      "From MVP to multi-tenant platform — product architecture built to grow.",
    icon: "saas",
  },
  {
    title: "Cloud Solutions",
    description:
      "AWS & Azure architectures optimized for resilience, cost, and velocity.",
    icon: "cloud",
  },
  {
    title: "UI/UX Design",
    description:
      "Interfaces that feel inevitable — clarity, hierarchy, and premium motion.",
    icon: "design",
  },
  {
    title: "Digital Transformation",
    description:
      "End-to-end modernization that turns legacy complexity into competitive advantage.",
    icon: "transform",
  },
] as const;

export const TECH_STACK = [
  "Python",
  "Laravel",
  "FastAPI",
  "React",
  "Next.js",
  "Flutter",
  "Node.js",
  "Docker",
  "AWS",
  "Azure",
  "OpenAI",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Kubernetes",
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    description:
      "Deep immersion into your market, users, and technical constraints.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Systems, interfaces, and interaction models crafted for clarity and desire.",
  },
  {
    step: "03",
    title: "Develop",
    description:
      "Precision engineering with modern stacks, AI leverage, and ruthless quality.",
  },
  {
    step: "04",
    title: "Deploy",
    description:
      "Hardened releases with observability, security, and zero-drama rollouts.",
  },
  {
    step: "05",
    title: "Scale",
    description:
      "Continuous optimization as your product, traffic, and ambition expand.",
  },
] as const;

export const PORTFOLIO = [
  {
    id: "nexus",
    title: "Nexus Finance",
    category: "Fintech Platform",
    description: "Real-time wealth orchestration for private banking.",
    year: "2025",
    color: "#00F5FF",
  },
  {
    id: "lumen",
    title: "Lumen Health",
    category: "Healthcare AI",
    description: "Clinical intelligence suite with agentic workflows.",
    year: "2025",
    color: "#7B5CFF",
  },
  {
    id: "orbit",
    title: "Orbit Commerce",
    category: "E-commerce SaaS",
    description: "Multi-brand commerce operating system.",
    year: "2024",
    color: "#5EFCE8",
  },
  {
    id: "vertex",
    title: "Vertex Logistics",
    category: "Enterprise ERP",
    description: "Global supply-chain command platform.",
    year: "2024",
    color: "#00F5FF",
  },
  {
    id: "aurora",
    title: "Aurora CRM",
    category: "Custom CRM",
    description: "Revenue intelligence built for enterprise sales.",
    year: "2025",
    color: "#7B5CFF",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "OmGeaks didn't just deliver software — they elevated how our entire organization thinks about digital products.",
    name: "Sarah Chen",
    role: "CTO, Nexus Finance",
  },
  {
    quote:
      "The craftsmanship is extraordinary. Every interaction feels intentional. Our launch conversion doubled in six weeks.",
    name: "Marcus Webb",
    role: "Founder, Lumen Health",
  },
  {
    quote:
      "Working with OmGeaks feels like having Apple's product team inside your company. Unmatched quality and velocity.",
    name: "Priya Malhotra",
    role: "VP Product, Orbit Commerce",
  },
] as const;

export const STATS = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Enterprise Clients" },
  { value: 18, suffix: "", label: "Countries Served" },
  { value: 99, suffix: "%", label: "Client Retention" },
] as const;

export const INDUSTRIES = [
  "Fintech",
  "Healthcare",
  "E-commerce",
  "Logistics",
  "SaaS",
  "Real Estate",
  "Education",
  "Manufacturing",
] as const;

export const FAQ_ITEMS = [
  {
    q: "What makes OmGeaks different from other development agencies?",
    a: "We operate like a product studio, not a body shop. Every engagement is led by senior engineers and designers who obsess over craft, performance, and business outcomes — not billable hours.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. We partner with ambitious startups building category-defining products and enterprises modernizing mission-critical systems. The standard of excellence is identical.",
  },
  {
    q: "How do you approach AI integration?",
    a: "AI-first, not AI-forced. We design agent architectures, LLM pipelines, and automation layers that create measurable leverage — grounded in your data, compliance needs, and product vision.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "Discover → Design → Develop → Deploy → Scale. Fixed discovery, transparent milestones, continuous demos, and a deployment pipeline built for confidence.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Yes. We audit, stabilize, and modernize legacy systems — then accelerate roadmap delivery without rewriting everything from scratch unless it truly warrants it.",
  },
] as const;

export const WHY_US = [
  {
    title: "AI-First Approach",
    description:
      "Every product is designed with intelligent automation and agentic capability at its core.",
  },
  {
    title: "Enterprise Architecture",
    description:
      "Security, observability, and scalability engineered from day one — not bolted on later.",
  },
  {
    title: "Worldwide Delivery",
    description:
      "Follow-the-sun collaboration with senior talent across time zones, without quality compromise.",
  },
  {
    title: "Scalable Systems",
    description:
      "Infrastructure and codebases built to handle 10× growth without 10× complexity.",
  },
] as const;
