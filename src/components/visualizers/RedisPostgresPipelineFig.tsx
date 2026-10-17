import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

export const RedisPostgresPipelineFig: React.FC<{ isInverted: boolean }> = ({ isInverted }) => {
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

      // Lane 1: Fast Redis Cache Hit Loop (Req -> Redis -> Fast Return)
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

      // Lane 2: Write / Cache Miss -> PostgreSQL Row-Level Lock (`SELECT FOR UPDATE`)
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

      // Padlock Shackle Clamping Down on Target Row #02 when Write Packet Arrives
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
      {/* Header */}
      <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest mb-2 pb-2 border-b border-current">
        <span className="font-bold">FIG 02 // REDIS CACHE &amp; PG ROW-LOCK</span>
        <span className="opacity-60">CONCURRENCY FLOW</span>
      </div>

      {/* Clear Visual Architecture Diagram */}
      <div className="relative w-full aspect-[5/2] max-h-48 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 380 148"
          className="w-full h-full"
          style={{ stroke: fgStroke, fill: "none" }}
        >
          {/* ==========================================
              GUIDE RAILS (READ HIT vs WRITE ROW-LOCK)
             ========================================== */}
          {/* Fast Cache Hit Rail (Top Horizontal) */}
          <path
            d="M 56 46 H 148"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            className="pipeline-rail opacity-60"
          />
          {/* Write / Lock Rail (Branches to Postgres Row #02) */}
          <path
            d="M 148 46 C 195 46, 205 90, 266 90"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            className="pipeline-rail opacity-60"
          />

          {/* ==========================================
              ANIMATED DATA PACKETS
             ========================================== */}
          {/* Packet 1: Fast Read Hit (Bounces back from Redis) */}
          <g className="pkt-redis-hit" style={{ transformOrigin: "56px 46px" }}>
            <circle cx="56" cy="46" r="4.5" fill={fgStroke} />
            <circle cx="56" cy="46" r="7.5" strokeWidth="1" />
          </g>

          {/* Packet 2: Concurrent Checkout Write (Travels to PG Row #02 Lock) */}
          <g className="pkt-pg-lock" style={{ transformOrigin: "56px 46px", opacity: 0 }}>
            <rect x="51" y="41" width="10" height="10" fill={fgStroke} strokeWidth="1.2" />
          </g>

          {/* ==========================================
              STAGE 1: INCOMING TX REQUEST NODE (LEFT)
             ========================================== */}
          <g>
            {/* 3D Isometric Offset Frame */}
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

          {/* ==========================================
              STAGE 2: REDIS IN-MEMORY CACHE GATE (CENTER)
             ========================================== */}
          <g>
            {/* Expanding Cache Hit Wave */}
            <polygon
              points="148,14 180,46 148,78 116,46"
              strokeWidth="1"
              className="redis-wave-ring"
              style={{ transformOrigin: "148px 46px" }}
            />

            {/* 3D Extruded Diamond Cache Node */}
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
              {/* Lightning Bolt Icon inside Redis */}
              <polyline
                points="150,35 143,46 149,46 146,57 154,44 148,44 150,35"
                fill={fgStroke}
                strokeWidth="1"
              />
            </g>

            {/* Fast Hit Label */}
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

            {/* Write / Sync Branch Label */}
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

          {/* ==========================================
              STAGE 3: POSTGRESQL TABLE WITH ROW-LEVEL LOCK (RIGHT)
             ========================================== */}
          <g>
            {/* 3D Table Rear Extrusion */}
            <rect x="264" y="20" width="106" height="106" fill={bgFill} strokeWidth="1.1" />
            {/* Main Postgres Table Container */}
            <rect x="260" y="24" width="106" height="106" fill={bgFill} strokeWidth="1.7" />

            {/* Table Header */}
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

            {/* ROW 01: Unlocked / Available */}
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

            {/* ROW 02: ACTIVELY LOCKED ROW (Inverted Contrast + Animated Padlock) */}
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

              {/* Crisp Wireframe Padlock Icon on Row #02 */}
              <g transform="translate(340, 81)">
                {/* Padlock Shackle */}
                <path
                  d="M 3 6 V 3.5 A 3 3 0 0 1 9 3.5 V 6"
                  stroke={bgFill}
                  strokeWidth="1.4"
                  fill="none"
                  className="pg-lock-shackle"
                />
                {/* Padlock Body */}
                <rect
                  x="1.5"
                  y="6"
                  width="9"
                  height="7.5"
                  fill={bgFill}
                  stroke="none"
                />
                {/* Keyhole */}
                <circle cx="6" cy="9.8" r="1" fill={fgStroke} stroke="none" />
              </g>
            </g>

            {/* ROW 03: Unlocked / Available */}
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

