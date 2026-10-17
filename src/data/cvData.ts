import { CvData } from '../types/portfolio';

// ==========================================
// STRUCTURED CV DATA (FROM CV.TEX)
// ==========================================
export const CV_DATA: CvData = {
  name: "Muhammad Awan Ardy Firmansyah",
  role: "Fullstack Web Developer",
  location: "Palu, Indonesia",
  coordinates: "0.8917° S, 119.8707° E",
  email: "muhammadawan46@gmail.com",
  github: "https://github.com/AwanArdy",
  githubHandle: "github.com/AwanArdy",
  experienceYears: "2+ YEARS",
  summary:
    "Fullstack Web Developer with 2+ years of experience building end-to-end web applications for production use. Skilled in translating requirements into reliable, high-performance systems with clean, maintainable, and modular code. Experienced across data modeling, API architecture, and UI implementation.",
  skills: [
    {
      id: "01",
      category: "Frontend",
      metrics: "UI / REACTIVE STATE",
      items: ["React", "TypeScript", "Tailwind CSS", "AngularJS"]
    },
    {
      id: "02",
      category: "Backend",
      metrics: "API / SERVICES",
      items: ["Node.js", "Express.js", "NestJS", "Python", "FastAPI", "GraphQL"]
    },
    {
      id: "03",
      category: "Databases",
      metrics: "STORAGE / CACHE",
      items: ["PostgreSQL", "SQLite", "MongoDB", "Redis"]
    },
    {
      id: "04",
      category: "DevOps & Tools",
      metrics: "INFRA / DOCS",
      items: ["Docker", "Prisma", "Git", "Swagger/OpenAPI"]
    }
  ],
  experience: [
    {
      id: "EXP-01",
      role: "Freelance Fullstack Developer",
      company: "Independent",
      period: "2026 — Present",
      architectureNote: "HEADLESS CMS & ASSET PIPELINE",
      highlights: [
        "Designed and built a custom Headless CMS using Node.js, Express, TypeScript, and SQLite.",
        "Implemented internal authentication modules and integrated Cloudinary for the media asset processing pipeline."
      ],
      tech: ["Node.js", "Express.js", "TypeScript", "SQLite", "Cloudinary"]
    },
    {
      id: "EXP-02",
      role: "Freelance Frontend Engineer",
      company: "Independent",
      period: "2025 — 2026",
      architectureNote: "REACTIVE COMMERCE & PAYMENT FLOW",
      highlights: [
        "Developed an e-commerce web interface with Vite, TypeScript, and Zustand.",
        "Built instant search, multi-criteria catalog filters, and integrated checkout and payment gateway flows."
      ],
      tech: ["React", "Vite", "TypeScript", "Zustand", "Tailwind CSS"]
    },
    {
      id: "EXP-03",
      role: "Freelance Software Developer",
      company: "Independent",
      period: "2025",
      architectureNote: "TERMINAL DIAGNOSTICS TUI",
      hasInteractiveDemo: true,
      highlights: [
        "Built an interactive Terminal User Interface (TUI) with Ink and TypeScript to monitor storage drive health.",
        "Parsed smartctl JSON data and presented clean diagnostic metrics in the terminal."
      ],
      tech: ["TypeScript", "Ink TUI", "Node.js", "smartctl JSON"]
    }
  ],
  projects: [
    {
      id: "01",
      title: "E-Commerce Platform",
      subtitle: "HIGH-CONCURRENCY MARKETPLACE ARCHITECTURE",
      visualType: "ecommerce",
      stack: ["Next.js", "PostgreSQL", "Redis", "Docker", "Midtrans"],
      metrics: [
        { label: "DAILY TX", value: "10,000+" },
        { label: "ERR RATE", value: "<0.1%" },
        { label: "CHECKOUT", value: "<2.0s" }
      ],
      points: [
        "Full-stack marketplace covering catalog, cart, checkout, payment, and admin dashboard.",
        "Achieved real-time inventory sync via PostgreSQL row-level locking and Redis caching; integrated Midtrans payment gateway with idempotent webhook handling.",
        "Sustained 10k+ daily transactions with sub-0.1% payment error rate and average checkout under 2 seconds."
      ]
    },
    {
      id: "02",
      title: "Realtime Chat App",
      subtitle: "E2E ENCRYPTED LOW-LATENCY MESSAGING",
      visualType: "chat",
      stack: ["Node.js", "Socket.io", "MongoDB", "React"],
      metrics: [
        { label: "ACTIVE USERS", value: "5,000 MAU" },
        { label: "LATENCY", value: "<100ms" },
        { label: "SECURITY", value: "E2E CIPHER" }
      ],
      points: [
        "Built instant messaging with typing indicators, read receipts, file sharing, and group channels.",
        "Implemented end-to-end encryption so the server only stores ciphertext; persisted messages in MongoDB with per-channel sharding.",
        "Supported 5k monthly active users with average message latency under 100 ms."
      ]
    },
    {
      id: "03",
      title: "Analytics Dashboard",
      subtitle: "BUSINESS INTELLIGENCE & AUTOMATED REPORTING",
      visualType: "analytics",
      stack: ["React", "Python", "FastAPI", "Recharts"],
      metrics: [
        { label: "MANUAL EFFORT", value: "-80%" },
        { label: "EXPORT", value: "1-CLICK CSV" },
        { label: "ENGINE", value: "FASTAPI" }
      ],
      points: [
        "Internal business intelligence tool with interactive charting (zoom, time-range filter, drill-down).",
        "Delivered one-click CSV export and scheduled automated reporting; reduced manual reporting effort by approximately 80%."
      ]
    },
    {
      id: "04",
      title: "REST API Gateway",
      subtitle: "CENTRALIZED AUTH, QUOTA & OPENAPI ORCHESTRATION",
      visualType: "gateway",
      stack: ["Express.js", "Prisma", "PostgreSQL", "Swagger/OpenAPI"],
      metrics: [
        { label: "ONBOARDING", value: "DAYS → HRS" },
        { label: "SECURITY", value: "JWT + RATE" },
        { label: "DOCS", value: "OPENAPI 3.0" }
      ],
      points: [
        "Central API gateway providing JWT auth, rate limiting, structured logging, and auto-generated OpenAPI docs.",
        "Reduced new service onboarding from days to hours by centralizing auth, quota, and documentation."
      ]
    }
  ]
};
