import React, { useState, useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';
import { 
  ArrowUpRight, 
  Terminal, 
  Copy, 
  Check, 
  Contrast, 
  Plus, 
  Minus, 
  FileText,
  RefreshCw,
  ChevronUp
} from 'lucide-react';

// Make anime globally accessible if needed by dynamic scripts
if (typeof window !== 'undefined') {
  (window as any).anime = anime;
}

// ==========================================
// STRUCTURED CV DATA (FROM CV.TEX)
// ==========================================
export const CV_DATA = {
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
      visualType: "ecommerce" as const,
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
      visualType: "chat" as const,
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
      visualType: "analytics" as const,
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
      visualType: "gateway" as const,
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

// ==========================================
// FIG 01. SMOOTH LOOPING SEMI-3D WIREFRAME FULLSTACK ARCHITECTURE
// ==========================================
const SwissKineticMatrix = ({ isInverted }: { isInverted: boolean }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const bgFill = isInverted ? "#000000" : "#FFFFFF";
  const fgStroke = isInverted ? "#FFFFFF" : "#000000";

  useEffect(() => {
    let isCancelled = false;

    const startSmoothAnimations = () => {
      if (isCancelled || !rootRef.current) return;

      const el = rootRef.current;
      const clientGroup = el.querySelector(".iso-client-node");
      const clientScreen = el.querySelector(".iso-client-screen");
      const apiGroup = el.querySelector(".iso-api-node");
      const apiCloud = el.querySelector(".iso-api-cloud");
      const apiBlades = el.querySelectorAll(".iso-api-blade");
      const apiRing = el.querySelector(".iso-api-ring");
      const dbGroup = el.querySelector(".iso-db-node");
      const dbDiscs = el.querySelectorAll(".iso-db-disc");
      const reqPkts = el.querySelectorAll(".iso-pkt-req");
      const resPkts = el.querySelectorAll(".iso-pkt-res");
      const streamLines = el.querySelectorAll(".iso-stream-line");

      anime.remove([
        clientGroup,
        clientScreen,
        apiGroup,
        apiCloud,
        apiBlades,
        apiRing,
        dbGroup,
        dbDiscs,
        reqPkts,
        resPkts,
        streamLines
      ]);

      // 1. Continuous smooth levitation for Client Isometric Workstation + User
      anime({
        targets: clientGroup,
        translateY: [-3.5, 3.5],
        duration: 2600,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine"
      });

      anime({
        targets: clientScreen,
        translateY: [-2, 2],
        translateX: [-1.5, 1.5],
        duration: 1900,
        direction: "alternate",
        loop: true,
        easing: "easeInOutQuad"
      });

      // 2. Continuous smooth breathing for API Cloud & Server Rack Blades
      anime({
        targets: apiCloud,
        translateY: [-4.5, 2.5],
        scale: [0.98, 1.03],
        duration: 2400,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine"
      });

      anime({
        targets: apiBlades,
        translateY: (_node: any, i: number) => [-1.8 * (i + 1), 1.8 * (i + 1)],
        duration: 2000,
        delay: anime.stagger(220),
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine"
      });

      anime({
        targets: apiRing,
        scale: [0.94, 1.08],
        opacity: [0.25, 0.7],
        duration: 2200,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine"
      });

      // 3. Continuous smooth harmonic wave for 3D Database Cylinders
      anime({
        targets: dbDiscs,
        translateY: [-3, 3],
        duration: 1800,
        delay: anime.stagger(260),
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine"
      });

      // 4. Continuous smooth marching ants along isometric data rails
      anime({
        targets: streamLines,
        strokeDashoffset: [24, 0],
        duration: 1200,
        loop: true,
        easing: "linear"
      });

      // 5. Seamless infinite 3D Packet Cubes gliding Client -> API -> DB
      anime({
        targets: reqPkts,
        translateX: [0, 196],
        translateY: [0, 98],
        opacity: [
          { value: 0, duration: 0 },
          { value: 1, duration: 320 },
          { value: 1, duration: 1900 },
          { value: 0, duration: 380 }
        ],
        scale: [
          { value: 0.5, duration: 0 },
          { value: 1.05, duration: 1300 },
          { value: 0.6, duration: 1300 }
        ],
        duration: 2600,
        delay: anime.stagger(1300),
        loop: true,
        easing: "linear"
      });

      // 6. Seamless infinite 3D Packet Cubes gliding DB -> API -> Client
      anime({
        targets: resPkts,
        translateX: [0, -196],
        translateY: [0, -98],
        opacity: [
          { value: 0, duration: 0 },
          { value: 1, duration: 320 },
          { value: 1, duration: 1900 },
          { value: 0, duration: 380 }
        ],
        scale: [
          { value: 0.5, duration: 0 },
          { value: 1.05, duration: 1300 },
          { value: 0.6, duration: 1300 }
        ],
        duration: 2600,
        delay: anime.stagger(1300, { start: 650 }),
        loop: true,
        easing: "linear"
      });
    };

    startSmoothAnimations();

    return () => {
      isCancelled = true;
    };
  }, [isInverted]);

  return (
    <div
      ref={rootRef}
      className="p-5 sm:p-6 border-b border-current relative overflow-hidden select-none"
    >
      {/* Minimal Header */}
      <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest mb-2 pb-2 border-b border-current">
        <span className="flex items-center gap-2 font-bold">
          <span className="inline-block w-2 h-2 bg-current rounded-full animate-pulse" />
          FIG 01 // FULLSTACK TOPOLOGY
        </span>
        <span className="opacity-60">LIVE 3D LOOP</span>
      </div>

      {/* Semi-3D Isometric Wireframe Stage */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-60 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 380 225"
          className="w-full h-full"
          style={{ stroke: fgStroke, fill: "none" }}
        >
          {/* Isometric Floor Reference Grid */}
          <g className="opacity-15" strokeWidth="0.7" strokeDasharray="2 3">
            <line x1="25" y1="112" x2="190" y2="30" />
            <line x1="65" y1="132" x2="230" y2="50" />
            <line x1="105" y1="152" x2="270" y2="70" />
            <line x1="145" y1="172" x2="310" y2="90" />
            <line x1="185" y1="192" x2="350" y2="110" />

            <line x1="190" y1="30" x2="350" y2="110" />
            <line x1="150" y1="50" x2="310" y2="130" />
            <line x1="110" y1="70" x2="270" y2="150" />
            <line x1="70" y1="90" x2="230" y2="170" />
            <line x1="30" y1="110" x2="190" y2="190" />
          </g>

          {/* ISOMETRIC DATA RAILS (REQUEST & RESPONSE) */}
          <path
            d="M 92 74 L 190 123 L 288 172"
            strokeWidth="1.3"
            strokeDasharray="4 4"
            className="iso-stream-line opacity-55"
          />
          <path
            d="M 288 156 L 190 107 L 92 58"
            strokeWidth="1.3"
            strokeDasharray="4 4"
            className="iso-stream-line opacity-55"
          />

          {/* Smooth Gliding 3D Isometric Packet Cubes (Request) */}
          {[0, 1].map((idx) => (
            <g
              key={`req-cube-${idx}`}
              className="iso-pkt-req"
              style={{ transformOrigin: "92px 74px", opacity: 0 }}
            >
              <polygon
                points="92,67 99,70.5 92,74 85,70.5"
                fill={bgFill}
                strokeWidth="1.3"
              />
              <polygon
                points="85,70.5 92,74 92,81 85,77.5"
                fill={bgFill}
                strokeWidth="1.3"
              />
              <polygon
                points="99,70.5 92,74 92,81 99,77.5"
                fill={fgStroke}
                strokeWidth="1.3"
              />
            </g>
          ))}

          {/* Smooth Gliding 3D Isometric Packet Cubes (Response) */}
          {[0, 1].map((idx) => (
            <g
              key={`res-cube-${idx}`}
              className="iso-pkt-res"
              style={{ transformOrigin: "288px 156px", opacity: 0 }}
            >
              <polygon
                points="288,149 295,152.5 288,156 281,152.5"
                fill={fgStroke}
                strokeWidth="1.3"
              />
              <polygon
                points="281,152.5 288,156 288,163 281,159.5"
                fill={bgFill}
                strokeWidth="1.3"
              />
              <polygon
                points="295,152.5 288,156 288,163 295,159.5"
                fill={bgFill}
                strokeWidth="1.3"
              />
            </g>
          ))}

          {/* ICON 01: CLIENT */}
          <g className="iso-client-node" style={{ transformOrigin: "84px 64px" }}>
            <polygon
              points="84,64 124,84 84,104 44,84"
              fill={bgFill}
              strokeWidth="1.6"
            />
            <polygon
              points="44,84 84,104 84,110 44,90"
              fill={bgFill}
              strokeWidth="1.6"
            />
            <polygon
              points="124,84 84,104 84,110 124,90"
              fill={bgFill}
              strokeWidth="1.6"
            />

            <g className="iso-client-screen">
              <polygon
                points="74,20 116,41 116,71 74,50"
                fill={bgFill}
                strokeWidth="1.2"
              />
              <polygon
                points="70,23 112,44 112,74 70,53"
                fill={bgFill}
                strokeWidth="1.7"
              />
              <line x1="70" y1="30" x2="112" y2="51" strokeWidth="1.2" />
              <rect x="75" y="38" width="12" height="8" transform="skewY(26.5)" fill={bgFill} strokeWidth="1.1" />
              <line x1="92" y1="47" x2="107" y2="54.5" strokeWidth="1.2" />
              <line x1="92" y1="53" x2="104" y2="59" strokeWidth="1" />
            </g>

            <g>
              <polygon
                points="68,61 84,69 68,77 52,69"
                fill={bgFill}
                strokeWidth="1.6"
              />
              <polygon
                points="52,69 68,77 68,91 52,83"
                fill={bgFill}
                strokeWidth="1.6"
              />
              <polygon
                points="84,69 68,77 68,91 84,83"
                fill={bgFill}
                strokeWidth="1.6"
              />
              <line x1="68" y1="69" x2="68" y2="77" strokeWidth="1.1" />

              <circle
                cx="68"
                cy="49"
                r="10"
                fill={bgFill}
                strokeWidth="1.8"
              />
              <ellipse
                cx="68"
                cy="49"
                rx="10"
                ry="4.2"
                strokeWidth="1.1"
              />
              <ellipse
                cx="68"
                cy="49"
                rx="4.2"
                ry="10"
                strokeWidth="1.1"
              />
            </g>

            <g transform="translate(22, 16)">
              <rect x="0" y="0" width="42" height="14" fill={bgFill} strokeWidth="1.2" />
              <text
                x="21"
                y="10"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[8px] font-bold tracking-widest"
              >
                CLIENT
              </text>
            </g>
          </g>

          {/* ICON 02: API */}
          <g className="iso-api-node" style={{ transformOrigin: "190px 114px" }}>
            <ellipse
              cx="190"
              cy="128"
              rx="46"
              ry="21"
              strokeWidth="1.1"
              strokeDasharray="4 3"
              className="iso-api-ring"
              style={{ transformOrigin: "190px 128px" }}
            />

            {[2, 1, 0].map((idx) => {
              const yOff = idx * 10;
              return (
                <g
                  key={`api-blade-${idx}`}
                  className="iso-api-blade"
                  style={{ transformOrigin: "190px 118px" }}
                >
                  <polygon
                    points={`190,${102 + yOff} 222,${118 + yOff} 190,${134 + yOff} 158,${118 + yOff}`}
                    fill={bgFill}
                    strokeWidth="1.6"
                  />
                  <polygon
                    points={`158,${118 + yOff} 190,${134 + yOff} 190,${141 + yOff} 158,${125 + yOff}`}
                    fill={bgFill}
                    strokeWidth="1.6"
                  />
                  <polygon
                    points={`222,${118 + yOff} 190,${134 + yOff} 190,${141 + yOff} 222,${125 + yOff}`}
                    fill={bgFill}
                    strokeWidth="1.6"
                  />
                  <circle cx="165" cy={124 + yOff} r="1.2" fill={fgStroke} />
                  <circle cx="171" cy={127 + yOff} r="1.2" fill={fgStroke} />
                  <line
                    x1="196"
                    y1={134 + yOff}
                    x2="215"
                    y2={125 + yOff}
                    strokeWidth="1.3"
                  />
                </g>
              );
            })}

            <g className="iso-api-cloud" style={{ transformOrigin: "190px 84px" }}>
              <path
                d="M 173 91 H 213 C 221 91 225 85 224 78 C 223 72 217 69 212 70 C 209 60 196 57 188 63 C 181 59 171 63 169 71 C 162 72 159 78 161 85 C 163 89 168 91 173 91 Z"
                fill={bgFill}
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <line x1="167" y1="95" x2="173" y2="91" strokeWidth="1.2" />
              <line x1="207" y1="95" x2="213" y2="91" strokeWidth="1.2" />
              <line x1="192" y1="64" x2="198" y2="60" strokeWidth="1.2" />

              <path
                d="M 167 95 H 207 C 215 95 219 89 218 82 C 217 76 211 73 206 74 C 203 64 190 61 182 67 C 175 63 165 67 163 75 C 156 76 153 82 155 89 C 157 93 162 95 167 95 Z"
                fill={bgFill}
                strokeWidth="1.8"
              />
              <polyline points="170,86 182,78 194,84 205,78" strokeWidth="1.2" />
              <circle cx="170" cy="86" r="1.8" fill={bgFill} strokeWidth="1.3" />
              <circle cx="182" cy="78" r="1.8" fill={bgFill} strokeWidth="1.3" />
              <circle cx="194" cy="84" r="1.8" fill={bgFill} strokeWidth="1.3" />
              <circle cx="205" cy="78" r="1.8" fill={bgFill} strokeWidth="1.3" />
            </g>

            <g transform="translate(172, 36)">
              <rect x="0" y="0" width="36" height="14" fill={bgFill} strokeWidth="1.2" />
              <text
                x="18"
                y="10"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[8px] font-bold tracking-widest"
              >
                API
              </text>
            </g>
          </g>

          {/* ICON 03: DB */}
          <g className="iso-db-node" style={{ transformOrigin: "296px 158px" }}>
            <ellipse
              cx="296"
              cy="190"
              rx="36"
              ry="15"
              strokeWidth="1"
              strokeDasharray="3 2"
              className="opacity-50"
            />

            {[2, 1, 0].map((discIdx) => {
              const cyTop = 132 + discIdx * 17;
              const cyBot = cyTop + 11;
              return (
                <g
                  key={`db-cylinder-${discIdx}`}
                  className="iso-db-disc"
                  style={{ transformOrigin: `296px ${cyTop}px` }}
                >
                  <path
                    d={`M 264 ${cyTop} V ${cyBot} A 32 13 0 0 0 328 ${cyBot} V ${cyTop} Z`}
                    fill={bgFill}
                    strokeWidth="1.8"
                  />
                  <ellipse
                    cx="296"
                    cy={cyTop}
                    rx="32"
                    ry="13"
                    fill={bgFill}
                    strokeWidth="1.8"
                  />
                  <ellipse
                    cx="296"
                    cy={cyTop}
                    rx="14"
                    ry="5.5"
                    strokeWidth="1.1"
                  />
                  <line
                    x1="282"
                    y1={cyTop}
                    x2="268"
                    y2={cyTop + 5}
                    strokeWidth="1"
                  />
                  <line
                    x1="310"
                    y1={cyTop}
                    x2="324"
                    y2={cyTop - 5}
                    strokeWidth="1"
                  />
                  <line x1="274" y1={cyTop + 9} x2="274" y2={cyBot + 9} strokeWidth="1.1" />
                  <line x1="296" y1={cyTop + 13} x2="296" y2={cyBot + 13} strokeWidth="1.1" />
                  <line x1="318" y1={cyTop + 9} x2="318" y2={cyBot + 9} strokeWidth="1.1" />
                  <circle cx="283" cy={cyTop + 7} r="1.4" fill={fgStroke} />
                </g>
              );
            })}

            <g transform="translate(316, 102)">
              <rect x="0" y="0" width="32" height="14" fill={bgFill} strokeWidth="1.2" />
              <text
                x="16"
                y="10"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[8px] font-bold tracking-widest"
              >
                DB
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

// ==========================================
// FIG 02. REDIS CACHE WAVE & POSTGRES ROW-LOCK PIPELINE (HERO SCHEMATIC)
// ==========================================
const RedisPostgresPipelineFig = ({ isInverted }: { isInverted: boolean }) => {
  const figRef = useRef<HTMLDivElement>(null);

  const bgFill = isInverted ? "#000000" : "#FFFFFF";
  const fgStroke = isInverted ? "#FFFFFF" : "#000000";

  useEffect(() => {
    let isCancelled = false;

    const initPipelineLoop = () => {
      if (isCancelled || !figRef.current) return;

      const el = figRef.current;
      const hitPacket = el.querySelector(".pkt-redis-hit");
      const missPacket = el.querySelector(".pkt-pg-lock");
      const redisDiamond = el.querySelector(".redis-node-diamond");
      const redisWave = el.querySelector(".redis-wave-ring");
      const lockShackle = el.querySelector(".pg-lock-shackle");
      const lockedRow = el.querySelector(".pg-locked-row");
      const railLines = el.querySelectorAll(".pipeline-rail");

      anime.remove([
        hitPacket,
        missPacket,
        redisDiamond,
        redisWave,
        lockShackle,
        lockedRow,
        railLines
      ]);

      // Continuous flowing guide rails
      anime({
        targets: railLines,
        strokeDashoffset: [20, 0],
        duration: 1000,
        loop: true,
        easing: "linear"
      });

      // Lane 1: Fast Redis Cache Hit Loop
      anime({
        targets: hitPacket,
        translateX: [
          { value: 0, duration: 0 },
          { value: 92, duration: 650, easing: "easeInOutQuad" },
          { value: 0, duration: 650, easing: "easeInOutQuad" }
        ],
        opacity: [
          { value: 1, duration: 1100 },
          { value: 0, duration: 200 }
        ],
        duration: 1500,
        loop: true
      });

      anime({
        targets: redisDiamond,
        scale: [1, 1.12, 1],
        duration: 1500,
        loop: true,
        easing: "easeInOutSine"
      });

      anime({
        targets: redisWave,
        scale: [0.7, 1.5],
        opacity: [0.8, 0],
        duration: 1500,
        loop: true,
        easing: "easeOutCubic"
      });

      // Lane 2: Write / Cache Miss -> PostgreSQL Row-Level Lock
      anime({
        targets: missPacket,
        translateX: [
          { value: 0, duration: 0 },
          { value: 92, duration: 600, easing: "linear" },
          { value: 210, duration: 750, easing: "easeInOutCubic" },
          { value: 210, duration: 650 }
        ],
        translateY: [
          { value: 0, duration: 0 },
          { value: 0, duration: 600 },
          { value: 44, duration: 750, easing: "easeInOutCubic" },
          { value: 44, duration: 650 }
        ],
        opacity: [
          { value: 0, duration: 0 },
          { value: 1, duration: 200 },
          { value: 1, duration: 1550 },
          { value: 0, duration: 250 }
        ],
        duration: 2400,
        loop: true
      });

      anime({
        targets: lockShackle,
        translateY: [
          { value: -3, duration: 1150 },
          { value: 0, duration: 250, easing: "easeOutBounce" },
          { value: 0, duration: 700 },
          { value: -3, duration: 300 }
        ],
        duration: 2400,
        loop: true
      });

      anime({
        targets: lockedRow,
        scaleX: [
          { value: 1, duration: 1150 },
          { value: 1.03, duration: 250 },
          { value: 1, duration: 1000 }
        ],
        duration: 2400,
        loop: true,
        easing: "easeInOutQuad"
      });
    };

    initPipelineLoop();

    return () => {
      isCancelled = true;
    };
  }, [isInverted]);

  return (
    <div
      ref={figRef}
      className="p-5 sm:p-6 border-b border-current relative overflow-hidden select-none"
    >
      <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest mb-2 pb-2 border-b border-current">
        <span className="font-bold">FIG 02 // REDIS CACHE &amp; PG ROW-LOCK</span>
        <span className="opacity-60">CONCURRENCY FLOW</span>
      </div>

      <div className="relative w-full aspect-[5/2] max-h-48 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 380 148"
          className="w-full h-full"
          style={{ stroke: fgStroke, fill: "none" }}
        >
          {/* GUIDE RAILS */}
          <path
            d="M 56 46 H 148"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            className="pipeline-rail opacity-60"
          />
          <path
            d="M 148 46 C 195 46, 205 90, 266 90"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            className="pipeline-rail opacity-60"
          />

          {/* ANIMATED DATA PACKETS */}
          <g className="pkt-redis-hit" style={{ transformOrigin: "56px 46px" }}>
            <circle cx="56" cy="46" r="4.5" fill={fgStroke} />
            <circle cx="56" cy="46" r="7.5" strokeWidth="1" />
          </g>

          <g className="pkt-pg-lock" style={{ transformOrigin: "56px 46px", opacity: 0 }}>
            <rect x="51" y="41" width="10" height="10" fill={fgStroke} strokeWidth="1.2" />
          </g>

          {/* STAGE 1: INCOMING TX REQUEST NODE */}
          <g>
            <rect x="14" y="29" width="40" height="30" fill={bgFill} strokeWidth="1.1" />
            <rect x="10" y="33" width="40" height="30" fill={bgFill} strokeWidth="1.7" />
            <text
              x="30"
              y="47"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[8px] font-bold"
            >
              TX
            </text>
            <text
              x="30"
              y="56"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[7px] opacity-75"
            >
              REQ
            </text>
          </g>

          {/* STAGE 2: REDIS IN-MEMORY CACHE GATE */}
          <g>
            <polygon
              points="148,14 180,46 148,78 116,46"
              strokeWidth="1"
              className="redis-wave-ring"
              style={{ transformOrigin: "148px 46px" }}
            />

            <g className="redis-node-diamond" style={{ transformOrigin: "148px 46px" }}>
              <polygon
                points="148,20 176,46 148,72 120,46"
                fill={bgFill}
                strokeWidth="1.8"
              />
              <polygon
                points="148,26 170,46 148,66 126,46"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <polyline
                points="150,35 143,46 149,46 146,57 154,44 148,44 150,35"
                fill={fgStroke}
                strokeWidth="1"
              />
            </g>

            <text
              x="148"
              y="12"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[8px] font-bold tracking-wider"
            >
              REDIS HIT (&lt;1ms)
            </text>

            <text
              x="182"
              y="98"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[7.5px] opacity-75"
            >
              FOR UPDATE ↘
            </text>
          </g>

          {/* STAGE 3: POSTGRESQL TABLE WITH ROW-LEVEL LOCK */}
          <g>
            <rect x="264" y="20" width="106" height="106" fill={bgFill} strokeWidth="1.1" />
            <rect x="260" y="24" width="106" height="106" fill={bgFill} strokeWidth="1.7" />

            <line x1="260" y1="42" x2="366" y2="42" strokeWidth="1.5" />
            <text
              x="313"
              y="36"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[8px] font-bold tracking-wider"
            >
              POSTGRESQL ROWS
            </text>

            {/* ROW 01 */}
            <g>
              <rect x="266" y="48" width="94" height="22" fill={bgFill} strokeWidth="1.1" />
              <text
                x="273"
                y="62"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[8px]"
              >
                ROW #01
              </text>
              <text
                x="353"
                y="62"
                textAnchor="end"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7.5px] opacity-60"
              >
                IDLE
              </text>
            </g>

            {/* ROW 02: LOCKED */}
            <g className="pg-locked-row" style={{ transformOrigin: "313px 88px" }}>
              <rect
                x="266"
                y="76"
                width="94"
                height="24"
                fill={fgStroke}
                strokeWidth="1.4"
              />
              <text
                x="273"
                y="91"
                fill={bgFill}
                stroke="none"
                className="font-mono text-[8px] font-bold"
              >
                ROW #02
              </text>
              <text
                x="334"
                y="91"
                textAnchor="end"
                fill={bgFill}
                stroke="none"
                className="font-mono text-[7.5px] font-bold"
              >
                LOCKED
              </text>

              <g transform="translate(340, 81)">
                <path
                  d="M 3 6 V 3.5 A 3 3 0 0 1 9 3.5 V 6"
                  stroke={bgFill}
                  strokeWidth="1.4"
                  fill="none"
                  className="pg-lock-shackle"
                />
                <rect
                  x="1.5"
                  y="6"
                  width="9"
                  height="7.5"
                  fill={bgFill}
                  stroke="none"
                />
                <circle cx="6" cy="9.8" r="1" fill={fgStroke} stroke="none" />
              </g>
            </g>

            {/* ROW 03 */}
            <g>
              <rect x="266" y="104" width="94" height="20" fill={bgFill} strokeWidth="1.1" />
              <text
                x="273"
                y="117"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[8px]"
              >
                ROW #03
              </text>
              <text
                x="353"
                y="117"
                textAnchor="end"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7.5px] opacity-60"
              >
                IDLE
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

// ==========================================
// ANIME.JS POWERED PROJECT VISUALIZERS
// ==========================================
const ProjectMotionVisualizer = ({ 
  type, 
  isInverted 
}: { 
  type: "ecommerce" | "chat" | "analytics" | "gateway"; 
  isInverted: boolean; 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgFill = isInverted ? "#000000" : "#FFFFFF";
  const fgStroke = isInverted ? "#FFFFFF" : "#000000";

  useEffect(() => {
    let isCancelled = false;

    const startProjectAnimation = () => {
      if (isCancelled || !containerRef.current) return;
      const el = containerRef.current;

      // 01. E-COMMERCE
      if (type === "ecommerce") {
        const cursor = el.querySelector(".ecom-cursor");
        const itemCard = el.querySelector(".ecom-product-card");
        const cartBadge = el.querySelector(".ecom-cart-badge");
        const payPacket = el.querySelector(".ecom-pay-pkt");
        const webhookPulse = el.querySelector(".ecom-webhook-ring");
        const checkIcon = el.querySelector(".ecom-check-mark");
        const rails = el.querySelectorAll(".ecom-rail");

        anime.remove([cursor, itemCard, cartBadge, payPacket, webhookPulse, checkIcon, rails]);

        anime({
          targets: rails,
          strokeDashoffset: [20, 0],
          duration: 900,
          loop: true,
          easing: "linear"
        });

        const tl = anime.timeline({ loop: true });
        tl.add({
          targets: cursor,
          translateX: [0, 34],
          translateY: [0, -14],
          duration: 550,
          easing: "easeInOutQuad"
        })
          .add({
            targets: itemCard,
            scale: [1, 0.92, 1],
            duration: 300,
            easing: "easeOutQuad"
          })
          .add(
            {
              targets: cartBadge,
              scale: [1, 1.35, 1],
              duration: 400,
              easing: "easeOutBack"
            },
            "-=150"
          )
          .add({
            targets: payPacket,
            translateX: [0, 128],
            opacity: [
              { value: 1, duration: 120 },
              { value: 1, duration: 600 },
              { value: 0, duration: 180 }
            ],
            duration: 900,
            easing: "easeInOutSine"
          })
          .add(
            {
              targets: webhookPulse,
              scale: [0.7, 1.55],
              opacity: [0.9, 0],
              duration: 650,
              easing: "easeOutCubic"
            },
            "-=250"
          )
          .add(
            {
              targets: checkIcon,
              strokeDashoffset: [anime.setDashoffset, 0],
              opacity: [0, 1, 1, 0],
              duration: 900,
              easing: "easeOutQuart"
            },
            "-=450"
          );
      }

      // 02. REALTIME CHAT
      if (type === "chat") {
        const msgBubbleA = el.querySelector(".chat-bubble-a");
        const cipherPkt = el.querySelector(".chat-cipher-pkt");
        const lockPulse = el.querySelector(".chat-lock-ring");
        const shardCyl = el.querySelector(".chat-shard-node");
        const msgBubbleB = el.querySelector(".chat-bubble-b");
        const typingDots = el.querySelectorAll(".chat-typing-dot");
        const readTicks = el.querySelector(".chat-read-ticks");

        anime.remove([msgBubbleA, cipherPkt, lockPulse, shardCyl, msgBubbleB, typingDots, readTicks]);

        anime({
          targets: typingDots,
          translateY: [0, -3.5, 0],
          duration: 600,
          delay: anime.stagger(140),
          loop: true,
          easing: "easeInOutSine"
        });

        const tl = anime.timeline({ loop: true });
        tl.add({
          targets: msgBubbleA,
          scale: [0.85, 1],
          opacity: [0.3, 1],
          duration: 380,
          easing: "easeOutBack"
        })
          .add({
            targets: cipherPkt,
            translateX: [0, 152],
            opacity: [
              { value: 1, duration: 150 },
              { value: 1, duration: 850 },
              { value: 0, duration: 200 }
            ],
            duration: 1200,
            easing: "easeInOutCubic"
          })
          .add(
            {
              targets: [lockPulse, shardCyl],
              scale: [1, 1.14, 1],
              duration: 500,
              easing: "easeOutSine"
            },
            "-=750"
          )
          .add(
            {
              targets: msgBubbleB,
              translateY: [6, 0],
              opacity: [0.25, 1],
              duration: 420,
              easing: "easeOutBack"
            },
            "-=250"
          )
          .add({
            targets: readTicks,
            scale: [0.6, 1.2, 1],
            opacity: [0.2, 1],
            duration: 500,
            easing: "easeOutElastic(1, .6)"
          });
      }

      // 03. ANALYTICS
      if (type === "analytics") {
        const bars = el.querySelectorAll(".bi-chart-bar");
        const trendLine = el.querySelector(".bi-trend-line");
        const zoomLens = el.querySelector(".bi-zoom-window");
        const csvFile = el.querySelector(".bi-csv-doc");
        const csvArrow = el.querySelector(".bi-csv-arrow");

        anime.remove([bars, trendLine, zoomLens, csvFile, csvArrow]);

        anime({
          targets: bars,
          scaleY: [0.35, 1, 0.65, 0.95],
          duration: 2400,
          delay: anime.stagger(160),
          direction: "alternate",
          loop: true,
          easing: "easeInOutSine"
        });

        anime({
          targets: trendLine,
          strokeDashoffset: [anime.setDashoffset, 0],
          duration: 2200,
          direction: "alternate",
          loop: true,
          easing: "easeInOutQuad"
        });

        anime({
          targets: zoomLens,
          translateX: [0, 74, 0],
          duration: 3400,
          loop: true,
          easing: "easeInOutSine"
        });

        anime({
          targets: csvFile,
          translateY: [-3, 3],
          duration: 1400,
          direction: "alternate",
          loop: true,
          easing: "easeInOutSine"
        });

        anime({
          targets: csvArrow,
          translateY: [-2, 4, -2],
          duration: 900,
          loop: true,
          easing: "easeInOutQuad"
        });
      }

      // 04. REST API GATEWAY
      if (type === "gateway") {
        const reqIngress = el.querySelectorAll(".gw-ingress-pkt");
        const shieldNode = el.querySelector(".gw-shield-node");
        const fanOutPkts = el.querySelectorAll(".gw-fanout-pkt");
        const rateBar = el.querySelector(".gw-rate-fill");
        const gatewayRails = el.querySelectorAll(".gw-rail");

        anime.remove([reqIngress, shieldNode, fanOutPkts, rateBar, gatewayRails]);

        anime({
          targets: gatewayRails,
          strokeDashoffset: [18, 0],
          duration: 900,
          loop: true,
          easing: "linear"
        });

        const tl = anime.timeline({ loop: true });
        tl.add({
          targets: reqIngress,
          translateX: [0, 96],
          opacity: [
            { value: 1, duration: 120 },
            { value: 1, duration: 500 },
            { value: 0, duration: 130 }
          ],
          duration: 750,
          delay: anime.stagger(160),
          easing: "easeInQuad"
        })
          .add(
            {
              targets: shieldNode,
              scale: [1, 1.12, 1],
              duration: 450,
              easing: "easeOutBack"
            },
            "-=350"
          )
          .add(
            {
              targets: rateBar,
              width: [14, 54, 30],
              duration: 800,
              easing: "easeInOutQuad"
            },
            "-=400"
          )
          .add(
            {
              targets: fanOutPkts,
              translateX: [0, 108],
              translateY: (_node: any, i: number) => [0, (i - 1) * 36],
              opacity: [
                { value: 1, duration: 120 },
                { value: 1, duration: 550 },
                { value: 0, duration: 180 }
              ],
              duration: 850,
              delay: anime.stagger(110),
              easing: "easeOutCubic"
            },
            "-=300"
          );
      }
    };

    startProjectAnimation();

    return () => {
      isCancelled = true;
    };
  }, [type, isInverted]);

  // E-COMMERCE RENDER
  if (type === "ecommerce") {
    return (
      <div
        ref={containerRef}
        className="border border-current p-3 sm:p-4 relative overflow-hidden select-none w-full"
      >
        <div className="flex flex-wrap justify-between items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-2 pb-2 border-b border-current">
          <span className="font-bold">CATALOG → CART → MIDTRANS WEBHOOK</span>
          <span className="opacity-75">&lt;2.0s CHECKOUT</span>
        </div>

        <div className="relative w-full aspect-[5/2] max-h-44 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 360 140"
            className="w-full h-full"
            style={{ stroke: fgStroke, fill: "none" }}
          >
            <line
              x1="104"
              y1="66"
              x2="152"
              y2="66"
              strokeWidth="1.3"
              strokeDasharray="3 3"
              className="ecom-rail opacity-60"
            />
            <line
              x1="196"
              y1="66"
              x2="284"
              y2="66"
              strokeWidth="1.3"
              strokeDasharray="3 3"
              className="ecom-rail opacity-60"
            />

            <g className="ecom-pay-pkt" style={{ opacity: 0 }}>
              <rect
                x="152"
                y="61"
                width="10"
                height="10"
                fill={fgStroke}
                strokeWidth="1.2"
              />
            </g>

            {/* Storefront Catalog */}
            <g>
              <rect
                x="10"
                y="22"
                width="94"
                height="88"
                fill={bgFill}
                strokeWidth="1.6"
              />
              <line x1="10" y1="36" x2="104" y2="36" strokeWidth="1.2" />
              <circle cx="18" cy="29" r="1.5" fill={fgStroke} />
              <circle cx="24" cy="29" r="1.5" fill={fgStroke} />
              <text
                x="57"
                y="32"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7px] font-bold"
              >
                STORE CATALOG
              </text>

              <rect
                x="18"
                y="44"
                width="34"
                height="26"
                fill={bgFill}
                strokeWidth="1.2"
              />
              <line x1="22" y1="62" x2="46" y2="62" strokeWidth="1" />

              <g
                className="ecom-product-card"
                style={{ transformOrigin: "75px 57px" }}
              >
                <rect
                  x="58"
                  y="44"
                  width="38"
                  height="26"
                  fill={fgStroke}
                  strokeWidth="1.3"
                />
                <text
                  x="77"
                  y="59"
                  textAnchor="middle"
                  fill={bgFill}
                  stroke="none"
                  className="font-mono text-[7px] font-bold"
                >
                  + CART
                </text>
              </g>

              <rect
                x="18"
                y="78"
                width="78"
                height="22"
                fill={bgFill}
                strokeWidth="1.1"
              />
              <text
                x="57"
                y="92"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7.5px]"
              >
                LOCK STOCK: OK
              </text>

              <g className="ecom-cursor" transform="translate(38, 74)">
                <polygon
                  points="0,0 0,11 3.5,8.5 6.5,13 8.5,12 5.5,7.5 9.5,7.5"
                  fill={fgStroke}
                  stroke={bgFill}
                  strokeWidth="0.8"
                />
              </g>
            </g>

            {/* Shopping Cart Node */}
            <g
              className="ecom-cart-badge"
              style={{ transformOrigin: "174px 66px" }}
            >
              <rect
                x="150"
                y="42"
                width="48"
                height="48"
                fill={bgFill}
                strokeWidth="1.6"
              />
              <polyline
                points="159,55 164,55 168,70 183,70 186,59 166,59"
                strokeWidth="1.4"
              />
              <circle cx="170" cy="75" r="2" fill={fgStroke} />
              <circle cx="181" cy="75" r="2" fill={fgStroke} />
              <text
                x="174"
                y="103"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7.5px] font-bold"
              >
                CART TX
              </text>
            </g>

            {/* Midtrans Webhook */}
            <g>
              <circle
                cx="312"
                cy="66"
                r="26"
                strokeWidth="1.1"
                className="ecom-webhook-ring"
                style={{ transformOrigin: "312px 66px", opacity: 0 }}
              />

              <rect
                x="274"
                y="32"
                width="76"
                height="68"
                fill={bgFill}
                strokeWidth="1.7"
              />
              <line x1="274" y1="47" x2="350" y2="47" strokeWidth="1.3" />
              <text
                x="312"
                y="42"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7.5px] font-bold"
              >
                MIDTRANS PAY
              </text>

              <rect
                x="284"
                y="55"
                width="14"
                height="10"
                fill={bgFill}
                strokeWidth="1.1"
              />
              <polyline
                points="306,62 313,69 328,54"
                strokeWidth="2.2"
                className="ecom-check-mark"
              />

              <text
                x="312"
                y="88"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7px] font-bold"
              >
                WEBHOOK 200 OK
              </text>
            </g>
          </svg>
        </div>

        <div className="mt-2 pt-2 border-t border-current flex flex-wrap justify-between gap-1 text-[9px] sm:text-[10px] font-mono">
          <span>REDIS + PG ROW LOCK</span>
          <span>10K+ DAILY TX // &lt;0.1% ERR</span>
        </div>
      </div>
    );
  }

  // CHAT RENDER
  if (type === "chat") {
    return (
      <div
        ref={containerRef}
        className="border border-current p-3 sm:p-4 relative overflow-hidden select-none w-full"
      >
        <div className="flex flex-wrap justify-between items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-2 pb-2 border-b border-current">
          <span className="font-bold">E2E ENCRYPTED SOCKET.IO STREAM</span>
          <span className="opacity-75">LATENCY &lt;100ms</span>
        </div>

        <div className="relative w-full aspect-[5/2] max-h-44 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 360 140"
            className="w-full h-full"
            style={{ stroke: fgStroke, fill: "none" }}
          >
            <line
              x1="96"
              y1="64"
              x2="264"
              y2="64"
              strokeWidth="1.3"
              strokeDasharray="4 3"
              className="opacity-55"
            />

            <g className="chat-cipher-pkt" style={{ opacity: 0 }}>
              <rect
                x="96"
                y="54"
                width="36"
                height="18"
                fill={fgStroke}
                strokeWidth="1.2"
              />
              <text
                x="114"
                y="66"
                textAnchor="middle"
                fill={bgFill}
                stroke="none"
                className="font-mono text-[7px] font-bold"
              >
                0x9F#A
              </text>
            </g>

            {/* Sender */}
            <g>
              <rect
                x="10"
                y="20"
                width="86"
                height="92"
                fill={bgFill}
                strokeWidth="1.6"
              />
              <line x1="10" y1="34" x2="96" y2="34" strokeWidth="1.2" />
              <text
                x="53"
                y="29"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7.5px] font-bold"
              >
                USER A [SEND]
              </text>

              <g
                className="chat-bubble-a"
                style={{ transformOrigin: "53px 54px" }}
              >
                <rect
                  x="18"
                  y="42"
                  width="68"
                  height="24"
                  fill={fgStroke}
                  strokeWidth="1.2"
                />
                <line
                  x1="24"
                  y1="51"
                  x2="74"
                  y2="51"
                  stroke={bgFill}
                  strokeWidth="1.4"
                />
                <line
                  x1="24"
                  y1="58"
                  x2="58"
                  y2="58"
                  stroke={bgFill}
                  strokeWidth="1.4"
                />
              </g>

              <rect
                x="18"
                y="76"
                width="42"
                height="16"
                fill={bgFill}
                strokeWidth="1.1"
              />
              <circle cx="28" cy="84" r="1.8" fill={fgStroke} className="chat-typing-dot" />
              <circle cx="38" cy="84" r="1.8" fill={fgStroke} className="chat-typing-dot" />
              <circle cx="48" cy="84" r="1.8" fill={fgStroke} className="chat-typing-dot" />
            </g>

            {/* Center Lock + Shard */}
            <g>
              <circle
                cx="180"
                cy="48"
                r="16"
                fill={bgFill}
                strokeWidth="1.6"
                className="chat-lock-ring"
                style={{ transformOrigin: "180px 48px" }}
              />
              <path
                d="M 176 46 V 42 A 4 4 0 0 1 184 42 V 46"
                strokeWidth="1.4"
              />
              <rect
                x="174"
                y="46"
                width="12"
                height="9"
                fill={fgStroke}
                stroke="none"
              />

              <g
                className="chat-shard-node"
                style={{ transformOrigin: "180px 95px" }}
              >
                <path
                  d="M 156 84 V 104 A 24 7 0 0 0 204 104 V 84 Z"
                  fill={bgFill}
                  strokeWidth="1.5"
                />
                <ellipse
                  cx="180"
                  cy="84"
                  rx="24"
                  ry="7"
                  fill={bgFill}
                  strokeWidth="1.5"
                />
                <text
                  x="180"
                  y="99"
                  textAnchor="middle"
                  fill={fgStroke}
                  stroke="none"
                  className="font-mono text-[7px] font-bold"
                >
                  SHARD DB
                </text>
              </g>
            </g>

            {/* Receiver */}
            <g>
              <rect
                x="264"
                y="20"
                width="86"
                height="92"
                fill={bgFill}
                strokeWidth="1.6"
              />
              <line x1="264" y1="34" x2="350" y2="34" strokeWidth="1.2" />
              <text
                x="307"
                y="29"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7.5px] font-bold"
              >
                USER B [RECV]
              </text>

              <g
                className="chat-bubble-b"
                style={{ transformOrigin: "307px 60px" }}
              >
                <rect
                  x="272"
                  y="44"
                  width="70"
                  height="28"
                  fill={bgFill}
                  strokeWidth="1.4"
                />
                <line x1="278" y1="53" x2="328" y2="53" strokeWidth="1.4" />
                <line x1="278" y1="61" x2="312" y2="61" strokeWidth="1.4" />
              </g>

              <g
                className="chat-read-ticks"
                style={{ transformOrigin: "326px 88px" }}
              >
                <polyline points="274,89 278,93 286,83" strokeWidth="1.6" />
                <polyline points="282,89 286,93 294,83" strokeWidth="1.6" />
                <text
                  x="300"
                  y="91"
                  fill={fgStroke}
                  stroke="none"
                  className="font-mono text-[7.5px] font-bold"
                >
                  READ
                </text>
              </g>
            </g>
          </svg>
        </div>

        <div className="mt-2 pt-2 border-t border-current flex flex-wrap justify-between gap-1 text-[9px] sm:text-[10px] font-mono">
          <span>CIPHERTEXT ONLY SERVER</span>
          <span>5,000 MAU // SHARDED MONGO</span>
        </div>
      </div>
    );
  }

  // ANALYTICS RENDER
  if (type === "analytics") {
    return (
      <div
        ref={containerRef}
        className="border border-current p-3 sm:p-4 relative overflow-hidden select-none w-full"
      >
        <div className="flex flex-wrap justify-between items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-2 pb-2 border-b border-current">
          <span className="font-bold">BI DRILL-DOWN &amp; 1-CLICK CSV EXPORT</span>
          <span className="opacity-75">-80% MANUAL WORK</span>
        </div>

        <div className="relative w-full aspect-[5/2] max-h-44 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 360 140"
            className="w-full h-full"
            style={{ stroke: fgStroke, fill: "none" }}
          >
            <g>
              <rect
                x="10"
                y="16"
                width="226"
                height="104"
                fill={bgFill}
                strokeWidth="1.6"
              />
              <line x1="10" y1="34" x2="236" y2="34" strokeWidth="1.2" />
              <text
                x="20"
                y="28"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7.5px] font-bold"
              >
                FASTAPI BI
              </text>
              <rect x="148" y="20" width="24" height="10" fill={bgFill} strokeWidth="1" />
              <text x="160" y="27.5" textAnchor="middle" fill={fgStroke} stroke="none" className="font-mono text-[6.5px]">
                7D
              </text>
              <rect x="176" y="20" width="26" height="10" fill={fgStroke} strokeWidth="1" />
              <text x="189" y="27.5" textAnchor="middle" fill={bgFill} stroke="none" className="font-mono text-[6.5px] font-bold">
                30D
              </text>
              <rect x="206" y="20" width="24" height="10" fill={bgFill} strokeWidth="1" />
              <text x="218" y="27.5" textAnchor="middle" fill={fgStroke} stroke="none" className="font-mono text-[6.5px]">
                1Y
              </text>

              <line x1="22" y1="54" x2="224" y2="54" strokeWidth="0.6" strokeDasharray="2 3" />
              <line x1="22" y1="80" x2="224" y2="80" strokeWidth="0.6" strokeDasharray="2 3" />
              <line x1="22" y1="108" x2="224" y2="108" strokeWidth="1.2" />

              {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
                const bx = 30 + idx * 27;
                const bh = 28 + ((idx * 13) % 36);
                return (
                  <rect
                    key={idx}
                    x={bx}
                    y={108 - bh}
                    width="15"
                    height={bh}
                    fill={idx % 2 === 0 ? fgStroke : bgFill}
                    strokeWidth="1.2"
                    className="bi-chart-bar"
                    style={{ transformOrigin: `${bx + 7}px 108px` }}
                  />
                );
              })}

              <path
                d="M 37 82 L 64 64 L 91 74 L 118 48 L 145 62 L 172 44 L 199 52"
                strokeWidth="2"
                className="bi-trend-line"
              />

              <g className="bi-zoom-window">
                <rect
                  x="48"
                  y="40"
                  width="66"
                  height="68"
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                />
                <rect
                  x="48"
                  y="38"
                  width="42"
                  height="11"
                  fill={fgStroke}
                  stroke="none"
                />
                <text
                  x="69"
                  y="46"
                  textAnchor="middle"
                  fill={bgFill}
                  stroke="none"
                  className="font-mono text-[6.5px] font-bold"
                >
                  ZOOM IN
                </text>
              </g>
            </g>

            <line
              x1="236"
              y1="68"
              x2="266"
              y2="68"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />

            {/* CSV Card */}
            <g
              className="bi-csv-doc"
              style={{ transformOrigin: "308px 68px" }}
            >
              <polygon
                points="268,24 332,24 348,40 348,112 268,112"
                fill={bgFill}
                strokeWidth="1.7"
              />
              <polyline points="332,24 332,40 348,40" strokeWidth="1.4" />

              <rect
                x="280"
                y="46"
                width="56"
                height="18"
                fill={fgStroke}
                stroke="none"
              />
              <text
                x="308"
                y="58"
                textAnchor="middle"
                fill={bgFill}
                stroke="none"
                className="font-mono text-[8.5px] font-bold"
              >
                .CSV EXPORT
              </text>

              <g className="bi-csv-arrow">
                <line x1="308" y1="70" x2="308" y2="88" strokeWidth="1.8" />
                <polyline points="302,83 308,90 314,83" strokeWidth="1.8" />
              </g>

              <text
                x="308"
                y="104"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[7px] font-bold"
              >
                CRON AUTO
              </text>
            </g>
          </svg>
        </div>

        <div className="mt-2 pt-2 border-t border-current flex flex-wrap justify-between gap-1 text-[9px] sm:text-[10px] font-mono">
          <span>REACT + PYTHON FASTAPI</span>
          <span>AUTO SCHEDULED REPORTS</span>
        </div>
      </div>
    );
  }

  // REST API GATEWAY RENDER
  return (
    <div
      ref={containerRef}
      className="border border-current p-3 sm:p-4 relative overflow-hidden select-none w-full"
    >
      <div className="flex flex-wrap justify-between items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-2 pb-2 border-b border-current">
        <span className="font-bold">CENTRAL JWT, QUOTA &amp; OPENAPI GATEWAY</span>
        <span className="opacity-75">DAYS → HOURS</span>
      </div>

      <div className="relative w-full aspect-[5/2] max-h-44 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 360 140"
          className="w-full h-full"
          style={{ stroke: fgStroke, fill: "none" }}
        >
          <defs>
            <clipPath id="gw-rate-clip">
              <rect x="146" y="96" width="62" height="6" />
            </clipPath>
          </defs>

          <line
            x1="54"
            y1="42"
            x2="132"
            y2="68"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            className="gw-rail opacity-60"
          />
          <line
            x1="54"
            y1="94"
            x2="132"
            y2="68"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            className="gw-rail opacity-60"
          />

          <line
            x1="222"
            y1="68"
            x2="278"
            y2="32"
            strokeWidth="1.3"
            strokeDasharray="3 3"
            className="gw-rail opacity-60"
          />
          <line
            x1="222"
            y1="68"
            x2="278"
            y2="68"
            strokeWidth="1.3"
            strokeDasharray="3 3"
            className="gw-rail opacity-60"
          />
          <line
            x1="222"
            y1="68"
            x2="278"
            y2="104"
            strokeWidth="1.3"
            strokeDasharray="3 3"
            className="gw-rail opacity-60"
          />

          {[0, 1].map((idx) => (
            <circle
              key={`in-${idx}`}
              cx="54"
              cy="68"
              r="4"
              fill={fgStroke}
              className="gw-ingress-pkt"
              style={{ opacity: 0 }}
            />
          ))}

          {[0, 1, 2].map((idx) => (
            <rect
              key={`out-${idx}`}
              x="218"
              y="64"
              width="8"
              height="8"
              fill={fgStroke}
              className="gw-fanout-pkt"
              style={{ opacity: 0 }}
            />
          ))}

          {/* Ingress */}
          <g>
            <rect
              x="10"
              y="26"
              width="44"
              height="30"
              fill={bgFill}
              strokeWidth="1.5"
            />
            <text
              x="32"
              y="44"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[7.5px] font-bold"
            >
              WEB
            </text>

            <rect
              x="10"
              y="78"
              width="44"
              height="30"
              fill={bgFill}
              strokeWidth="1.5"
            />
            <text
              x="32"
              y="96"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[7.5px] font-bold"
            >
              MOBILE
            </text>
          </g>

          {/* Center Hub */}
          <g
            className="gw-shield-node"
            style={{ transformOrigin: "177px 68px" }}
          >
            <rect
              x="132"
              y="20"
              width="90"
              height="96"
              fill={bgFill}
              strokeWidth="1.8"
            />
            <rect
              x="132"
              y="20"
              width="90"
              height="18"
              fill={fgStroke}
              stroke="none"
            />
            <text
              x="177"
              y="32"
              textAnchor="middle"
              fill={bgFill}
              stroke="none"
              className="font-mono text-[7.5px] font-bold"
            >
              API GATEWAY
            </text>

            <path
              d="M 177 44 L 191 49 V 61 C 191 70 177 76 177 76 C 177 76 163 70 163 61 V 49 Z"
              fill={bgFill}
              strokeWidth="1.5"
            />
            <text
              x="177"
              y="62"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[6.5px] font-bold"
            >
              JWT
            </text>

            <text
              x="177"
              y="90"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[6.5px]"
            >
              RATE QUOTA
            </text>
            <rect
              x="144"
              y="94"
              width="66"
              height="10"
              fill={bgFill}
              strokeWidth="1.1"
            />
            <g clipPath="url(#gw-rate-clip)">
              <rect
                x="146"
                y="96"
                width="30"
                height="6"
                fill={fgStroke}
                stroke="none"
                className="gw-rate-fill"
              />
            </g>
          </g>

          {/* Microservices */}
          <g>
            <rect
              x="278"
              y="18"
              width="72"
              height="26"
              fill={bgFill}
              strokeWidth="1.5"
            />
            <text
              x="314"
              y="34"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[7.5px] font-bold"
            >
              AUTH SVC
            </text>

            <rect
              x="278"
              y="55"
              width="72"
              height="26"
              fill={bgFill}
              strokeWidth="1.5"
            />
            <text
              x="314"
              y="71"
              textAnchor="middle"
              fill={fgStroke}
              stroke="none"
              className="font-mono text-[7.5px] font-bold"
            >
              PRISMA DB
            </text>

            <rect
              x="278"
              y="92"
              width="72"
              height="26"
              fill={fgStroke}
              strokeWidth="1.5"
            />
            <text
              x="314"
              y="108"
              textAnchor="middle"
              fill={bgFill}
              stroke="none"
              className="font-mono text-[7.5px] font-bold"
            >
              OPENAPI 3.0
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-2 pt-2 border-t border-current flex flex-wrap justify-between gap-1 text-[9px] sm:text-[10px] font-mono">
        <span>EXPRESS + PRISMA + PG</span>
        <span>CENTRAL LOGS &amp; SWAGGER</span>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE SMARTCTL TUI MODAL (FROM EXP-03)
// ==========================================
const SmartctlTuiModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedDrive, setSelectedDrive] = useState(0);
  const [scanTick, setScanTick] = useState(0);
  const modalBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (modalBoxRef.current) {
      anime({
        targets: modalBoxRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 420,
        easing: 'easeOutExpo'
      });
    }
    const timer = setInterval(() => {
      setScanTick((t) => (t + 1) % 100);
    }, 300);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const drives = [
    {
      device: "/dev/nvme0n1",
      model: "SAMSUNG MZVL21T0HCLR-00B00",
      status: "PASSED",
      temp: "38°C",
      powerOnHours: "4,812 hrs",
      wearLevel: "97%"
    },
    {
      device: "/dev/sda",
      model: "WDC WD40EFPX-68C6CN0",
      status: "PASSED",
      temp: "33°C",
      powerOnHours: "11,290 hrs",
      wearLevel: "94%"
    }
  ];

  const active = drives[selectedDrive];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div 
        ref={modalBoxRef}
        className="bg-black text-white border-2 border-white w-full max-w-2xl font-mono p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-white pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs">
            <Terminal className="w-4 h-4" />
            <span>INK + TYPESCRIPT // SMARTCTL STORAGE HEALTH TUI (2025)</span>
          </div>
          <button 
            onClick={onClose}
            className="border border-white px-2 py-0.5 text-xs hover:bg-white hover:text-black transition-colors"
          >
            [ESC / CLOSE]
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="border border-white p-3">
            <div className="text-[10px] opacity-60 mb-2">SELECT BLOCK DEVICE</div>
            {drives.map((d, i) => (
              <button
                key={d.device}
                onClick={() => setSelectedDrive(i)}
                className={`w-full text-left px-2 py-1.5 text-xs mb-1 border transition-colors ${
                  selectedDrive === i
                    ? "bg-white text-black border-white font-bold"
                    : "border-transparent hover:border-white"
                }`}
              >
                &gt; {d.device}
              </button>
            ))}
          </div>

          <div className="sm:col-span-2 border border-white p-3 text-xs space-y-2">
            <div className="flex justify-between border-b border-white/30 pb-1">
              <span className="opacity-60">MODEL:</span>
              <span className="font-bold">{active.model}</span>
            </div>
            <div className="flex justify-between border-b border-white/30 pb-1">
              <span className="opacity-60">SMART OVERALL-HEALTH:</span>
              <span className="bg-white text-black px-1.5 font-bold">{active.status}</span>
            </div>
            <div className="flex justify-between border-b border-white/30 pb-1">
              <span className="opacity-60">TEMPERATURE:</span>
              <span>{active.temp}</span>
            </div>
            <div className="flex justify-between border-b border-white/30 pb-1">
              <span className="opacity-60">POWER ON HOURS:</span>
              <span>{active.powerOnHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">HEALTH INTEGRITY:</span>
              <span>{active.wearLevel}</span>
            </div>
          </div>
        </div>

        <div className="border border-white p-3 text-[11px]">
          <div className="flex justify-between mb-1">
            <span>SMARTCTL --JSON STREAM PARSER</span>
            <span>POLLING TICK #{scanTick.toString().padStart(2, '0')}</span>
          </div>
          <div className="w-full bg-white/20 h-2 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${(scanTick % 20) * 5 + 5}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ATS-FRIENDLY RAW CV MODAL
// ==========================================
const AtsCvModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      anime({
        targets: modalRef.current,
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 480,
        easing: 'easeOutExpo'
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-white text-black border-2 border-black w-full max-w-3xl p-6 sm:p-10 my-8 max-h-[85vh] overflow-y-auto swiss-scrollbar font-sans shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest">
            ATS-FRIENDLY DOCUMENT VIEW // CV.TEX
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="border border-black px-3 py-1 text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors"
            >
              PRINT / PDF
            </button>
            <button
              onClick={onClose}
              className="bg-black text-white px-3 py-1 text-xs font-mono uppercase hover:opacity-80"
            >
              CLOSE [X]
            </button>
          </div>
        </div>

        <div className="text-center border-b border-black pb-4 mb-5">
          <h2 className="text-2xl font-bold tracking-tight">{CV_DATA.name}</h2>
          <p className="text-sm font-medium mt-1">{CV_DATA.role}</p>
          <p className="text-xs font-mono mt-1">
            {CV_DATA.location} · {CV_DATA.email} · {CV_DATA.githubHandle}
          </p>
        </div>

        <div className="space-y-5 text-sm leading-relaxed">
          <section>
            <h3 className="font-bold uppercase tracking-wider text-xs border-b border-black pb-1 mb-2">
              Professional Summary
            </h3>
            <p>{CV_DATA.summary}</p>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-wider text-xs border-b border-black pb-1 mb-2">
              Technical Skills
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              {CV_DATA.skills.map((s) => (
                <li key={s.id}>
                  <span className="font-bold">{s.category}:</span> {s.items.join(", ")}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-wider text-xs border-b border-black pb-1 mb-2">
              Professional Experience
            </h3>
            <div className="space-y-3">
              {CV_DATA.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-xs sm:text-sm">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="font-mono">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm mt-1 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-wider text-xs border-b border-black pb-1 mb-2">
              Projects
            </h3>
            <div className="space-y-3">
              {CV_DATA.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="font-bold text-xs sm:text-sm">
                    {proj.title} — <span className="font-normal font-mono text-xs">{proj.stack.join(", ")}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm mt-1 space-y-0.5">
                    {proj.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SWISS FLOATING SCROLL TELEMETRY RAIL (INTEGRATED SCROLLBAR & METRICS)
// ==========================================
interface ScrollTelemetryProps {
  scrollPercent: number;
  activeSection: string;
  onNavigate: (id: string) => void;
  isInverted: boolean;
}

const SwissScrollTelemetryRail: React.FC<ScrollTelemetryProps> = ({
  scrollPercent,
  activeSection,
  onNavigate,
  isInverted
}) => {
  const sections = [
    { id: "hero", label: "00", name: "HERO" },
    { id: "capabilities", label: "01", name: "CAP" },
    { id: "experience", label: "02", name: "EXP" },
    { id: "projects", label: "03", name: "WRK" },
    { id: "contact", label: "04", name: "CNT" }
  ];

  return (
    <aside 
      aria-label="Swiss Scroll Telemetry"
      className="hidden xl:flex fixed right-4 bottom-8 z-30 flex-col items-center select-none"
    >
      <div 
        className={`border-2 border-current px-2 py-3 flex flex-col items-center gap-3 font-mono text-[9px] uppercase tracking-widest backdrop-blur-sm shadow-xl ${
          isInverted ? "bg-black/90 text-white" : "bg-white/90 text-black"
        }`}
      >
        {/* Scroll percentage */}
        <div className="flex flex-col items-center border-b border-current pb-2 w-full text-center">
          <span className="opacity-60 text-[8px]">POS</span>
          <span className="font-black text-[10px]">{scrollPercent.toString().padStart(2, '0')}%</span>
        </div>

        {/* Vertical Rail with Embedded Thumb */}
        <div className="relative w-2 h-36 bg-current/15 border border-current">
          {/* Thumb marker directly linked to scroll progress */}
          <div 
            className="absolute left-0 right-0 bg-current transition-all duration-75"
            style={{ 
              top: `${Math.min(92, Math.max(0, scrollPercent))}%`, 
              height: '10px' 
            }}
          />
        </div>

        {/* Section Quick Jump Node Markers */}
        <div className="flex flex-col gap-1.5 w-full items-center pt-1 border-t border-current">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                title={`Jump to section ${sec.label}: ${sec.name}`}
                className={`w-full px-1 py-0.5 text-center text-[8.5px] transition-colors border ${
                  isActive
                    ? "bg-current font-black"
                    : "border-transparent opacity-65 hover:opacity-100 hover:border-current"
                }`}
              >
                <span className={isActive ? (isInverted ? "text-black" : "text-white") : ""}>
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="border border-current p-1 mt-1 hover:bg-current group transition-colors"
          title="Return to Top"
        >
          <ChevronUp className={`w-3 h-3 group-hover:${isInverted ? "text-black" : "text-white"}`} />
        </button>
      </div>
    </aside>
  );
};

// ==========================================
// MAIN PORTFOLIO APPLICATION
// ==========================================
export default function App() {
  const [isInverted, setIsInverted] = useState(false);
  const [isTransitioningTheme, setIsTransitioningTheme] = useState(false);
  const [transitionColor, setTransitionColor] = useState('#000000');
  const [transitionMode, setTransitionMode] = useState<'STAGGER_GRID' | 'SWISS_SHUTTER'>('STAGGER_GRID');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>("01");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [isTuiOpen, setIsTuiOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00 WITA");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const heroTitleRef = useRef<HTMLDivElement>(null);
  const overlayGridRef = useRef<HTMLDivElement>(null);
  const transitionHudRef = useRef<HTMLDivElement>(null);

  const SHUTTER_COLS = 12;
  const SHUTTER_ROWS = 8;
  const TOTAL_SHUTTER_TILES = SHUTTER_COLS * SHUTTER_ROWS;

  // Sync inverted state to document.documentElement for global custom scrollbars & theme
  useEffect(() => {
    if (isInverted) {
      document.documentElement.classList.add('inverted');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('inverted');
      document.documentElement.classList.remove('dark');
    }
  }, [isInverted]);

  // Track global scroll percentage and active section for integrated UI scrollbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Detect active section
      const sectionIds = ["hero", "capabilities", "experience", "projects", "contact"];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // HERO KINETIC TYPOGRAPHY ENTRANCE (ANIME.JS)
  const triggerHeroKineticTypography = useCallback(() => {
    if (!heroTitleRef.current) return;
    const chars = heroTitleRef.current.querySelectorAll('.kinetic-char');
    const badges = document.querySelectorAll('.swiss-hero-meta');

    anime.remove(chars);
    anime.remove(badges);

    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: chars,
        translateY: ['115%', '0%'],
        rotateZ: [8, 0],
        opacity: [0, 1],
        duration: 950,
        delay: anime.stagger(24)
      })
      .add({
        targets: badges,
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 650,
        delay: anime.stagger(80)
      }, '-=600');
  }, []);

  useEffect(() => {
    triggerHeroKineticTypography();
  }, [triggerHeroKineticTypography]);

  // POLARITY TOGGLE ANIMATION
  const handleAnimatedPolarityToggle = (e?: React.MouseEvent) => {
    if (isTransitioningTheme) return;

    const nextInverted = !isInverted;
    const targetFill = nextInverted ? '#000000' : '#FFFFFF';
    setTransitionColor(targetFill);
    setIsTransitioningTheme(true);

    let originTileIndex: any = 'center';
    if (e && e.clientX !== undefined) {
      const col = Math.min(
        SHUTTER_COLS - 1,
        Math.max(0, Math.floor((e.clientX / window.innerWidth) * SHUTTER_COLS))
      );
      const row = Math.min(
        SHUTTER_ROWS - 1,
        Math.max(0, Math.floor((e.clientY / window.innerHeight) * SHUTTER_ROWS))
      );
      originTileIndex = row * SHUTTER_COLS + col;
    }

    requestAnimationFrame(() => {
      if (!overlayGridRef.current) {
        setIsInverted(nextInverted);
        setIsTransitioningTheme(false);
        return;
      }

      const tiles = overlayGridRef.current.querySelectorAll('.polarity-tile');
      const hudText = transitionHudRef.current;

      anime.remove(tiles);
      if (hudText) anime.remove(hudText);

      const tl = anime.timeline({
        complete: () => {
          setIsTransitioningTheme(false);
          if (heroTitleRef.current) {
            const chars = heroTitleRef.current.querySelectorAll('.kinetic-char');
            anime({
              targets: chars,
              scaleY: [1.18, 1],
              duration: 550,
              delay: anime.stagger(12),
              easing: 'easeOutElastic(1, .7)'
            });
          }
        }
      });

      if (hudText) {
        tl.add({
          targets: hudText,
          opacity: [0, 1, 1, 0],
          scale: [0.92, 1, 1, 1.06],
          duration: 1050,
          easing: 'easeInOutQuad'
        }, 0);
      }

      if (transitionMode === 'SWISS_SHUTTER') {
        tl.add({
          targets: tiles,
          scaleY: [0, 1.05],
          opacity: [0, 1],
          duration: 380,
          easing: 'easeInOutQuart',
          delay: anime.stagger(18, { grid: [SHUTTER_COLS, SHUTTER_ROWS], from: 'first', axis: 'y' }),
          changeComplete: () => setIsInverted(nextInverted)
        }, 0).add({
          targets: tiles,
          scaleY: [1.05, 0],
          opacity: [1, 0],
          duration: 420,
          easing: 'easeInOutQuart',
          delay: anime.stagger(18, { grid: [SHUTTER_COLS, SHUTTER_ROWS], from: 'last', axis: 'y' })
        });
      } else {
        tl.add({
          targets: tiles,
          scale: [0, 1.04],
          rotateZ: [-12, 0],
          opacity: [0, 1],
          duration: 380,
          easing: 'easeOutQuint',
          delay: anime.stagger(22, { grid: [SHUTTER_COLS, SHUTTER_ROWS], from: originTileIndex }),
          changeComplete: () => setIsInverted(nextInverted)
        }, 0).add({
          targets: tiles,
          scale: [1.04, 0],
          rotateZ: [0, 12],
          opacity: [1, 0],
          duration: 440,
          easing: 'easeInQuint',
          delay: anime.stagger(20, { grid: [SHUTTER_COLS, SHUTTER_ROWS], from: 'center' })
        });
      }
    });
  };

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Live WITA Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(now);
      setCurrentTime(`${formatted} WITA`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter skills
  const handleSelectSkill = (tech: string | null) => {
    const next = selectedSkill === tech ? null : tech;
    setSelectedSkill(next);
    anime({
      targets: '.skill-pill-btn',
      scale: [0.92, 1],
      duration: 400,
      delay: anime.stagger(18),
      easing: 'easeOutBack'
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CV_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const renderKineticChars = (text: string) =>
    text.split("").map((char, idx) => (
      <span key={idx} className="inline-block overflow-hidden align-bottom">
        <span className="kinetic-char inline-block will-change-transform">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));

  const themeClasses = isInverted
    ? "bg-black text-white border-white selection:bg-white selection:text-black"
    : "bg-white text-black border-black selection:bg-black selection:text-white";

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden ${themeClasses}`}>
      
      {/* ==========================================
          ANIME.JS FULLSCREEN POLARITY TRANSITION SHUTTER
         ========================================== */}
      <div
        ref={overlayGridRef}
        className={`fixed inset-0 z-50 pointer-events-none grid ${
          isTransitioningTheme ? "visible" : "invisible"
        }`}
        style={{
          gridTemplateColumns: `repeat(${SHUTTER_COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${SHUTTER_ROWS}, minmax(0, 1fr))`
        }}
      >
        {Array.from({ length: TOTAL_SHUTTER_TILES }).map((_, idx) => (
          <div
            key={idx}
            className="polarity-tile w-full h-full opacity-0 border"
            style={{
              backgroundColor: transitionColor,
              borderColor: transitionColor === '#000000' ? '#FFFFFF' : '#000000',
              transform: 'scale(0)'
            }}
          />
        ))}

        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={transitionHudRef}
            style={{
              backgroundColor: transitionColor === '#000000' ? '#FFFFFF' : '#000000',
              color: transitionColor
            }}
            className="opacity-0 px-6 py-3 border-2 border-current font-mono text-xs sm:text-sm uppercase tracking-[0.3em] font-black shadow-2xl"
          >
            POLARITY INVERT // {transitionColor === '#000000' ? 'BLACK MODE (#000)' : 'WHITE MODE (#FFF)'}
          </div>
        </div>
      </div>

      {/* Custom Kinetic Cursor Follower (Desktop Only) */}
      <div
        className="hidden lg:block fixed pointer-events-none z-40 rounded-full mix-blend-difference bg-white transition-transform duration-150 ease-out"
        style={{
          width: cursorExpanded ? "56px" : "18px",
          height: cursorExpanded ? "56px" : "18px",
          left: `${mouseCoords.x}px`,
          top: `${mouseCoords.y}px`,
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* ==========================================
          INTEGRATED IN-UI SCROLL TELEMETRY RAIL (DESKTOP)
         ========================================== */}
      <SwissScrollTelemetryRail
        scrollPercent={scrollProgress}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isInverted={isInverted}
      />

      {/* ==========================================
          TOP STICKY SWISS NAVIGATION & TELEMETRY BAR
         ========================================== */}
      <header className={`sticky top-0 z-30 border-b border-current ${isInverted ? "bg-black/95" : "bg-white/95"} backdrop-blur-sm`}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 text-xs font-mono uppercase tracking-wider relative">
          
          {/* Brand Index */}
          <div className="col-span-7 sm:col-span-6 md:col-span-3 p-3 sm:p-4 border-r border-current flex items-center justify-between gap-2">
            <span className="font-bold tracking-tighter text-xs sm:text-sm truncate">M. AWAN ARDY F.</span>
            <span className="text-[9px] sm:text-[10px] border border-current px-1.5 py-0.5 shrink-0">ID // PALU</span>
          </div>

          {/* Live Telemetry Coordinates + Transition Style Selector */}
          <div className="hidden md:flex md:col-span-4 p-4 border-r border-current items-center justify-between text-[11px]">
            <span className="truncate">{CV_DATA.coordinates}</span>
            <button
              onClick={() =>
                setTransitionMode((m) =>
                  m === 'STAGGER_GRID' ? 'SWISS_SHUTTER' : 'STAGGER_GRID'
                )
              }
              className="border border-current px-1.5 py-0.5 text-[10px] hover:bg-current group transition-colors shrink-0"
              title="Change Anime.js Theme Transition Style"
            >
              <span className={`group-hover:${isInverted ? "text-black" : "text-white"}`}>
                FX: {transitionMode === 'STAGGER_GRID' ? 'MATRIX' : 'SHUTTER'}
              </span>
            </button>
          </div>

          {/* Section Quick Jumps (Desktop) */}
          <nav className="hidden lg:flex lg:col-span-3 border-r border-current items-center justify-around px-2">
            {[
              { label: "01/CAP", target: "capabilities" },
              { label: "02/EXP", target: "experience" },
              { label: "03/WRK", target: "projects" },
              { label: "04/CNT", target: "contact" }
            ].map((nav) => (
              <button
                key={nav.label}
                onClick={() => scrollToSection(nav.target)}
                onMouseEnter={() => setCursorExpanded(true)}
                onMouseLeave={() => setCursorExpanded(false)}
                className={`px-2 py-1 transition-colors group ${
                  activeSection === nav.target ? "font-bold underline" : "hover:bg-current"
                }`}
              >
                <span className={`group-hover:${isInverted ? "text-black" : "text-white"}`}>
                  {nav.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Polarity Toggle & CV Button */}
          <div className="col-span-5 sm:col-span-6 md:col-span-5 lg:col-span-2 flex items-center justify-end">
            <button
              onClick={() => setIsCvModalOpen(true)}
              onMouseEnter={() => setCursorExpanded(true)}
              onMouseLeave={() => setCursorExpanded(false)}
              className="h-full px-2.5 sm:px-4 py-3 border-r border-current hover:bg-current group transition-colors flex items-center gap-1.5"
              title="Open Printable ATS CV"
            >
              <FileText className={`w-3.5 h-3.5 shrink-0 group-hover:${isInverted ? "text-black" : "text-white"}`} />
              <span className={`text-[10px] sm:text-xs group-hover:${isInverted ? "text-black" : "text-white"}`}>CV.TEX</span>
            </button>

            <button
              onClick={handleAnimatedPolarityToggle}
              onMouseEnter={() => setCursorExpanded(true)}
              onMouseLeave={() => setCursorExpanded(false)}
              className="h-full px-2.5 sm:px-4 py-3 hover:bg-current group transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
              title="Trigger Anime.js Polarity Invert Transition"
            >
              <Contrast className={`w-3.5 h-3.5 shrink-0 group-hover:${isInverted ? "text-black" : "text-white"}`} />
              <span className={`text-[10px] sm:text-xs group-hover:${isInverted ? "text-black" : "text-white"}`}>
                <span className="hidden sm:inline">MODE: </span>
                {isInverted ? "BLK" : "WHT"}
              </span>
            </button>
          </div>

          {/* Integrated Swiss Reading Progress Indicator Line (directly menyadur di header UI) */}
          <div 
            className="absolute bottom-0 left-0 h-[2.5px] bg-current transition-all duration-100 ease-out z-40"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Mobile & Tablet Quick Navigation Row */}
        <nav className="grid grid-cols-4 lg:hidden border-t border-current text-[10px] sm:text-xs font-mono uppercase tracking-wider divide-x divide-current">
          {[
            { label: "01 // CAP", target: "capabilities" },
            { label: "02 // EXP", target: "experience" },
            { label: "03 // WRK", target: "projects" },
            { label: "04 // CNT", target: "contact" }
          ].map((nav) => (
            <button
              key={nav.label}
              onClick={() => scrollToSection(nav.target)}
              className={`py-2.5 px-1 text-center group transition-colors ${
                activeSection === nav.target ? "bg-current font-bold" : "hover:bg-current"
              }`}
            >
              <span className={activeSection === nav.target ? (isInverted ? "text-black" : "text-white") : `group-hover:${isInverted ? "text-black" : "text-white"}`}>
                {nav.label}
              </span>
            </button>
          ))}
        </nav>
      </header>

      {/* ==========================================
          MAIN SWISS ASYMMETRIC MODULAR CONTAINER
         ========================================== */}
      <main className="max-w-[1440px] mx-auto border-x border-current">
        
        {/* ------------------------------------------
            HERO SECTION (INTERNATIONAL TYPOGRAPHIC STYLE)
           ------------------------------------------ */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 border-b border-current">
          {/* Left Column: Massive Kinetic Display Typography */}
          <div className="lg:col-span-7 xl:col-span-8 p-5 sm:p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-current flex flex-col justify-between relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-6 sm:mb-8 pb-3 border-b border-current">
              <span>INDEX // 00 — SWISS KINETIC MANIFESTO</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <span>{currentTime}</span>
                <button
                  onClick={triggerHeroKineticTypography}
                  className="border border-current px-2 py-0.5 text-[10px] hover:bg-current group transition-colors flex items-center gap-1"
                  title="Replay Kinetic Typography Animation"
                >
                  <RefreshCw className={`w-2.5 h-2.5 group-hover:${isInverted ? "text-black" : "text-white"}`} />
                  <span className={`group-hover:${isInverted ? "text-black" : "text-white"}`}>
                    REPLAY KINETIC
                  </span>
                </button>
              </div>
            </div>

            <div ref={heroTitleRef} className="my-2 sm:my-8 select-none">
              <div className="swiss-hero-meta font-mono text-[11px] sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.25em] mb-4 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-current shrink-0" />
                <span>FULLSTACK WEB DEVELOPER — {CV_DATA.experienceYears} PRODUCTION</span>
              </div>

              <h1 
                onMouseEnter={() => setCursorExpanded(true)}
                onMouseLeave={() => setCursorExpanded(false)}
                className="text-[clamp(2.25rem,8vw,5.4rem)] font-black uppercase tracking-tighter leading-[0.92] break-words"
              >
                <div className="block">{renderKineticChars("MUHAMMAD")}</div>
                <div className="block">{renderKineticChars("AWAN ARDY")}</div>
                <div className="inline-block border-2 border-current px-2 sm:px-4 mt-2 bg-current max-w-full overflow-hidden">
                  <span className={isInverted ? "text-black" : "text-white"}>
                    {renderKineticChars("FIRMANSYAH")}
                  </span>
                </div>
              </h1>
            </div>

            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-current grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="swiss-hero-meta">
                <div className="opacity-60 text-[10px]">DISCIPLINE</div>
                <div className="font-bold mt-0.5">END-TO-END WEB SYSTEMS</div>
              </div>
              <div className="swiss-hero-meta">
                <div className="opacity-60 text-[10px]">ARCHITECTURE</div>
                <div className="font-bold mt-0.5">DATA, API &amp; REACTIVE UI</div>
              </div>
              <div className="swiss-hero-meta">
                <div className="opacity-60 text-[10px]">POLARITY ENGINE</div>
                <button
                  onClick={handleAnimatedPolarityToggle}
                  className="font-bold mt-0.5 underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-2 h-2 bg-current rounded-full animate-ping" />
                  INVERT THEME ({isInverted ? "WHITE" : "BLACK"})
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: FIG 01 + FIG 02 + Executive Summary */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
            <SwissKineticMatrix isInverted={isInverted} />
            <RedisPostgresPipelineFig isInverted={isInverted} />

            <div className="p-5 sm:p-7 border-b border-current flex-1 flex flex-col justify-center">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-60">
                00.1 // EXECUTIVE BRIEF
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                {CV_DATA.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 font-mono text-xs uppercase">
              <a
                href={`mailto:${CV_DATA.email}`}
                onMouseEnter={() => setCursorExpanded(true)}
                onMouseLeave={() => setCursorExpanded(false)}
                className="p-4 sm:p-5 border-r border-current flex items-center justify-between hover:bg-current group transition-colors font-bold"
              >
                <span className={`group-hover:${isInverted ? "text-black" : "text-white"}`}>
                  EMAIL DIRECT
                </span>
                <ArrowUpRight className={`w-4 h-4 shrink-0 group-hover:${isInverted ? "text-black" : "text-white"}`} />
              </a>
              <a
                href={CV_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorExpanded(true)}
                onMouseLeave={() => setCursorExpanded(false)}
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-current group transition-colors font-bold"
              >
                <span className={`group-hover:${isInverted ? "text-black" : "text-white"}`}>
                  GITHUB REPO
                </span>
                <ArrowUpRight className={`w-4 h-4 shrink-0 group-hover:${isInverted ? "text-black" : "text-white"}`} />
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------
            KINETIC MARQUEE BAND 01
           ------------------------------------------ */}
        <div className="border-b border-current py-3 overflow-hidden bg-current">
          <div className={`animate-marquee font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold ${isInverted ? "text-black" : "text-white"}`}>
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center space-x-8 mx-4">
                <span>REACT</span>
                <span>+</span>
                <span>TYPESCRIPT</span>
                <span>+</span>
                <span>NODE.JS</span>
                <span>+</span>
                <span>NESTJS</span>
                <span>+</span>
                <span>PYTHON FASTAPI</span>
                <span>+</span>
                <span>POSTGRESQL</span>
                <span>+</span>
                <span>REDIS</span>
                <span>+</span>
                <span>MONGODB</span>
                <span>+</span>
                <span>DOCKER</span>
                <span>+</span>
                <span>PRISMA</span>
                <span>+</span>
                <span>GRAPHQL</span>
                <span>+</span>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------
            01 // TECHNICAL CAPABILITIES & FILTER MATRIX
           ------------------------------------------ */}
        <section id="capabilities" className="border-b border-current">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-current">
            <div className="md:col-span-4 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-current flex flex-col justify-between">
              <span className="font-mono text-xs uppercase tracking-widest">SECTION // 01</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-2">
                TECHNICAL
                <br />
                CAPABILITIES
              </h2>
            </div>
            <div className="md:col-span-8 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm font-mono max-w-xl">
                INTERACTIVE FILTER MATRIX: Klik teknologi di bawah untuk memicu animasi filter *stagger* dan menyorot pengalaman serta proyek terkait.
              </p>
              {selectedSkill && (
                <button
                  onClick={() => handleSelectSkill(null)}
                  className="self-start sm:self-auto border-2 border-current px-3 py-1.5 font-mono text-xs uppercase font-bold hover:bg-current group transition-colors shrink-0"
                >
                  <span className={`group-hover:${isInverted ? "text-black" : "text-white"}`}>
                    RESET FILTER [{selectedSkill}] ×
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {CV_DATA.skills.map((skillGroup, index) => (
              <div
                key={skillGroup.id}
                className={`p-6 sm:p-8 flex flex-col justify-between border-b sm:border-b lg:border-b-0 ${
                  index < 3 ? "lg:border-r" : ""
                } ${index % 2 === 0 ? "sm:border-r" : ""} border-current`}
              >
                <div>
                  <div className="flex justify-between items-center font-mono text-[11px] mb-4 pb-2 border-b border-current">
                    <span className="font-bold">{skillGroup.id}</span>
                    <span className="opacity-60">{skillGroup.metrics}</span>
                  </div>

                  <h3 className="text-lg font-black uppercase tracking-tight mb-6">
                    {skillGroup.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((tech) => {
                      const isSelected = selectedSkill === tech;
                      return (
                        <button
                          key={tech}
                          onClick={() => handleSelectSkill(tech)}
                          onMouseEnter={() => setCursorExpanded(true)}
                          onMouseLeave={() => setCursorExpanded(false)}
                          className={`skill-pill-btn px-3 py-1.5 font-mono text-xs uppercase border border-current transition-colors ${
                            isSelected
                              ? "bg-current font-bold"
                              : "hover:bg-current group"
                          }`}
                        >
                          <span
                            className={
                              isSelected
                                ? isInverted
                                  ? "text-black"
                                  : "text-white"
                                : `group-hover:${isInverted ? "text-black" : "text-white"}`
                            }
                          >
                            {tech}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-3 border-t border-current font-mono text-[10px] flex justify-between opacity-60">
                  <span>PRODUCTION READY</span>
                  <span>{skillGroup.items.length} MODULES</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------
            02 // PROFESSIONAL EXPERIENCE CHRONOLOGY
           ------------------------------------------ */}
        <section id="experience" className="border-b border-current">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-current flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest">SECTION // 02</span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mt-2 leading-none">
                  PRODUCTION
                  <br />
                  EXPERIENCE
                </h2>
                <p className="font-mono text-xs mt-4 opacity-75 leading-relaxed">
                  Rekam jejak independen merancang dan mengimplementasikan arsitektur Fullstack, e-commerce reaktif, hingga kakas diagnostik berbasis terminal.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-current font-mono text-xs space-y-1">
                <div>TIMELINE: 2025 — PRESENT</div>
                <div>MODE: INDEPENDENT // PRODUCTION</div>
              </div>
            </div>

            <div className="lg:col-span-8 divide-y divide-current">
              {CV_DATA.experience.map((exp) => {
                const matchesFilter =
                  !selectedSkill ||
                  exp.tech.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()));

                return (
                  <div
                    key={exp.id}
                    className={`p-6 sm:p-10 transition-opacity duration-300 ${
                      matchesFilter ? "opacity-100" : "opacity-25"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-3">
                      <span className="border border-current px-2 py-0.5 font-bold">
                        {exp.id} // {exp.architectureNote}
                      </span>
                      <span className="font-bold tracking-widest bg-current px-2.5 py-0.5">
                        <span className={isInverted ? "text-black" : "text-white"}>
                          {exp.period}
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="font-mono text-xs uppercase opacity-70">
                        — {exp.company}
                      </span>
                    </div>

                    <ul className="space-y-2.5 mb-6 text-sm sm:text-base">
                      {exp.highlights.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="font-mono text-xs mt-1 font-bold">[0{idx + 1}]</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-current">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[11px] uppercase px-2 py-0.5 border border-current"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {exp.hasInteractiveDemo && (
                        <button
                          onClick={() => setIsTuiOpen(true)}
                          onMouseEnter={() => setCursorExpanded(true)}
                          onMouseLeave={() => setCursorExpanded(false)}
                          className="border-2 border-current px-3 py-1.5 font-mono text-xs uppercase font-bold flex items-center gap-2 hover:bg-current group transition-colors cursor-pointer"
                        >
                          <Terminal className={`w-3.5 h-3.5 group-hover:${isInverted ? "text-black" : "text-white"}`} />
                          <span className={`group-hover:${isInverted ? "text-black" : "text-white"}`}>
                            LAUNCH SMARTCTL TUI SIMULATOR
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------
            03 // SELECTED WORKS & ARCHITECTURE SHOWCASE
           ------------------------------------------ */}
        <section id="projects" className="border-b border-current">
          <div className="p-6 sm:p-10 border-b border-current flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest">SECTION // 03</span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mt-2 leading-none">
                SELECTED WORKS &amp;
                <br />
                SYSTEM SCHEMATICS
              </h2>
            </div>
            <div className="font-mono text-xs max-w-sm">
              Setiap proyek dilengkapi skema arsitektur interaktif berbasis Anime.js yang memvisualisasikan cara kerja sistem secara langsung sesuai spesifikasinya.
            </div>
          </div>

          <div className="divide-y divide-current">
            {CV_DATA.projects.map((project) => {
              const isOpen = activeProject === project.id;
              const matchesFilter =
                !selectedSkill ||
                project.stack.some((s) => s.toLowerCase().includes(selectedSkill.toLowerCase()));

              return (
                <div
                  key={project.id}
                  className={`transition-opacity duration-300 ${
                    matchesFilter ? "opacity-100" : "opacity-25"
                  }`}
                >
                  <div
                    onClick={() => setActiveProject(isOpen ? null : project.id)}
                    onMouseEnter={() => setCursorExpanded(true)}
                    onMouseLeave={() => setCursorExpanded(false)}
                    className={`p-5 sm:p-10 cursor-pointer transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 ${
                      isOpen ? "bg-current" : "hover:bg-current/5"
                    }`}
                  >
                    <div className="flex items-start sm:items-baseline justify-between lg:justify-start gap-3 sm:gap-8 w-full lg:w-auto">
                      <div className="flex items-baseline gap-3 sm:gap-8 min-w-0">
                        <span
                          className={`font-mono text-lg sm:text-3xl font-bold shrink-0 ${
                            isOpen ? (isInverted ? "text-black" : "text-white") : ""
                          }`}
                        >
                          /{project.id}
                        </span>
                        <div className="min-w-0">
                          <h3
                            className={`text-xl sm:text-4xl xl:text-5xl font-black uppercase tracking-tight break-words ${
                              isOpen ? (isInverted ? "text-black" : "text-white") : ""
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p
                            className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-1 ${
                              isOpen
                                ? isInverted
                                  ? "text-black/80"
                                  : "text-white/80"
                                : "opacity-70"
                            }`}
                          >
                            {project.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Toggle Icon */}
                      <div
                        className={`lg:hidden w-8 h-8 shrink-0 border flex items-center justify-center ${
                          isOpen
                            ? isInverted
                              ? "border-black text-black"
                              : "border-white text-white"
                            : "border-current"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className={`border px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] sm:text-xs ${
                            isOpen
                              ? isInverted
                                ? "border-black text-black"
                                : "border-white text-white"
                              : "border-current"
                          }`}
                        >
                          <span className="opacity-60 mr-1.5">{m.label}:</span>
                          <span className="font-bold">{m.value}</span>
                        </div>
                      ))}

                      {/* Desktop Toggle Icon */}
                      <div
                        className={`hidden lg:flex w-9 h-9 shrink-0 border items-center justify-center ${
                          isOpen
                            ? isInverted
                              ? "border-black text-black"
                              : "border-white text-white"
                            : "border-current"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-current">
                      <div className="lg:col-span-7 p-5 sm:p-10 border-b lg:border-b-0 lg:border-r border-current flex flex-col justify-between">
                        <div>
                          <div className="font-mono text-xs uppercase tracking-widest mb-4 pb-2 border-b border-current">
                            ARCHITECTURAL SPECIFICATION // CASE {project.id}
                          </div>

                          <ul className="space-y-3 sm:space-y-4 my-4 sm:my-6">
                            {project.points.map((pt, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs sm:text-base">
                                <span className="font-mono text-xs font-bold mt-0.5 sm:mt-1 shrink-0">
                                  [{project.id}.{i + 1}]
                                </span>
                                <span className="leading-relaxed">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-5 sm:pt-6 border-t border-current">
                          <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">
                            TECHNOLOGY STACK
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="font-mono text-[11px] sm:text-xs uppercase px-2.5 py-1 border border-current font-bold"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 p-5 sm:p-8 xl:p-10 flex flex-col justify-center">
                        <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-60">
                          ANIME.JS INTERACTIVE SYSTEM VISUALIZER
                        </div>
                        <ProjectMotionVisualizer
                          type={project.visualType}
                          isInverted={isInverted}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------
            04 // CONTACT & COLOPHON
           ------------------------------------------ */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-5 sm:p-12 border-b lg:border-b-0 lg:border-r border-current flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest">
                SECTION // 04 — INITIATE TRANSMISSION
              </span>
              <h2 className="text-3xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tighter mt-3 leading-[0.92]">
                READY FOR
                <br />
                HIGH-IMPACT
                <br />
                ENGINEERING.
              </h2>
            </div>

            <div className="mt-8 sm:mt-10 pt-6 border-t border-current flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursorExpanded(true)}
                onMouseLeave={() => setCursorExpanded(false)}
                className="w-full sm:w-auto justify-center border-2 border-current px-4 sm:px-6 py-3.5 sm:py-4 font-mono text-xs sm:text-sm uppercase font-bold flex items-center gap-2.5 hover:bg-current group transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className={`w-4 h-4 shrink-0 group-hover:${isInverted ? "text-black" : "text-white"}`} />
                    <span className={`truncate group-hover:${isInverted ? "text-black" : "text-white"}`}>
                      COPIED: {CV_DATA.email}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className={`w-4 h-4 shrink-0 group-hover:${isInverted ? "text-black" : "text-white"}`} />
                    <span className={`truncate group-hover:${isInverted ? "text-black" : "text-white"}`}>
                      COPY EMAIL: {CV_DATA.email}
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleAnimatedPolarityToggle()}
                onMouseEnter={() => setCursorExpanded(true)}
                onMouseLeave={() => setCursorExpanded(false)}
                className="w-full sm:w-auto justify-center border-2 border-current px-4 sm:px-6 py-3.5 sm:py-4 font-mono text-xs sm:text-sm uppercase font-bold flex items-center gap-2.5 hover:bg-current group transition-colors cursor-pointer"
              >
                <Contrast className={`w-4 h-4 shrink-0 group-hover:${isInverted ? "text-black" : "text-white"}`} />
                <span className={`group-hover:${isInverted ? "text-black" : "text-white"}`}>
                  ANIMATE THEME INVERT
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-current font-mono text-xs">
            <div className="p-6 sm:p-8">
              <div className="opacity-60 text-[10px] mb-1">DIRECT ELECTRONIC MAIL</div>
              <a
                href={`mailto:${CV_DATA.email}`}
                className="text-base sm:text-lg font-bold underline break-all hover:opacity-70"
              >
                {CV_DATA.email}
              </a>
            </div>

            <div className="p-6 sm:p-8">
              <div className="opacity-60 text-[10px] mb-1">VERSION CONTROL &amp; SOURCE</div>
              <a
                href={CV_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-bold underline flex items-center gap-2 hover:opacity-70"
              >
                <span>{CV_DATA.githubHandle}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="p-6 sm:p-8">
              <div className="opacity-60 text-[10px] mb-1">BASE OF OPERATIONS</div>
              <div className="text-base font-bold uppercase">{CV_DATA.location}</div>
              <div className="mt-1 opacity-75">{CV_DATA.coordinates}</div>
            </div>

            <div className="p-6 sm:p-8 flex justify-between items-center">
              <span>SWISS INTERNATIONAL STYLE + ANIME.JS</span>
              <span>#000000 / #FFFFFF</span>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================
          MODALS (SMARTCTL TUI & ATS CV VIEW)
         ========================================== */}
      <SmartctlTuiModal isOpen={isTuiOpen} onClose={() => setIsTuiOpen(false)} />
      <AtsCvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
    </div>
  );
}
