import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

export const SwissKineticMatrix: React.FC<{ isInverted: boolean }> = ({ isInverted }) => {
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

          {/* ==========================================
              ISOMETRIC DATA RAILS (REQUEST & RESPONSE)
             ========================================== */}
          {/* Request Rail (Client -> API -> DB) */}
          <path
            d="M 92 74 L 190 123 L 288 172"
            strokeWidth="1.3"
            strokeDasharray="4 4"
            className="iso-stream-line opacity-55"
          />
          {/* Response Rail (DB -> API -> Client) */}
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
              {/* Top Face */}
              <polygon
                points="92,67 99,70.5 92,74 85,70.5"
                fill={bgFill}
                strokeWidth="1.3"
              />
              {/* Left Face */}
              <polygon
                points="85,70.5 92,74 92,81 85,77.5"
                fill={bgFill}
                strokeWidth="1.3"
              />
              {/* Right Face */}
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
              {/* Top Face */}
              <polygon
                points="288,149 295,152.5 288,156 281,152.5"
                fill={fgStroke}
                strokeWidth="1.3"
              />
              {/* Left Face */}
              <polygon
                points="281,152.5 288,156 288,163 281,159.5"
                fill={bgFill}
                strokeWidth="1.3"
              />
              {/* Right Face */}
              <polygon
                points="295,152.5 288,156 288,163 295,159.5"
                fill={bgFill}
                strokeWidth="1.3"
              />
            </g>
          ))}

          {/* ==========================================
              ICON 01: CLIENT (3D ISOMETRIC LAPTOP + GEOMETRIC USER AVATAR)
              Center ~ (84, 64)
             ========================================== */}
          <g className="iso-client-node" style={{ transformOrigin: "84px 64px" }}>
            {/* Isometric Base Tile */}
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

            {/* 3D Isometric Laptop / Browser Screen */}
            <g className="iso-client-screen">
              {/* Screen Rear Depth */}
              <polygon
                points="74,20 116,41 116,71 74,50"
                fill={bgFill}
                strokeWidth="1.2"
              />
              {/* Screen Front Glass */}
              <polygon
                points="70,23 112,44 112,74 70,53"
                fill={bgFill}
                strokeWidth="1.7"
              />
              {/* Browser Header & UI Wireframe */}
              <line x1="70" y1="30" x2="112" y2="51" strokeWidth="1.2" />
              <rect x="75" y="38" width="12" height="8" transform="skewY(26.5)" fill={bgFill} strokeWidth="1.1" />
              <line x1="92" y1="47" x2="107" y2="54.5" strokeWidth="1.2" />
              <line x1="92" y1="53" x2="104" y2="59" strokeWidth="1" />
            </g>

            {/* Refined Semi-3D Faceted User Bust in Foreground */}
            <g>
              {/* Extruded 3D Torso Block (Top, Left, Right Isometric Faces) */}
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
              {/* Collar Center Wireframe Line */}
              <line x1="68" y1="69" x2="68" y2="77" strokeWidth="1.1" />

              {/* 3D Wireframe User Head (Sphere + Isometric Equator & Meridian) */}
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

            {/* Minimal Floating Tag */}
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

          {/* ==========================================
              ICON 02: API (3D ISOMETRIC SERVER RACK + VOLUMETRIC CLOUD)
              Center ~ (190, 114)
             ========================================== */}
          <g className="iso-api-node" style={{ transformOrigin: "190px 114px" }}>
            {/* Isometric Telemetry Ring */}
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

            {/* 3 Stacked Isometric Server Blades */}
            {[2, 1, 0].map((idx) => {
              const yOff = idx * 10;
              return (
                <g
                  key={`api-blade-${idx}`}
                  className="iso-api-blade"
                  style={{ transformOrigin: "190px 118px" }}
                >
                  {/* Blade Top */}
                  <polygon
                    points={`190,${102 + yOff} 222,${118 + yOff} 190,${134 + yOff} 158,${118 + yOff}`}
                    fill={bgFill}
                    strokeWidth="1.6"
                  />
                  {/* Blade Left Face */}
                  <polygon
                    points={`158,${118 + yOff} 190,${134 + yOff} 190,${141 + yOff} 158,${125 + yOff}`}
                    fill={bgFill}
                    strokeWidth="1.6"
                  />
                  {/* Blade Right Face */}
                  <polygon
                    points={`222,${118 + yOff} 190,${134 + yOff} 190,${141 + yOff} 222,${125 + yOff}`}
                    fill={bgFill}
                    strokeWidth="1.6"
                  />
                  {/* Server Port LEDs & Vent Slot */}
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

            {/* 3D Extruded Cloud Canopy Above Rack */}
            <g className="iso-api-cloud" style={{ transformOrigin: "190px 84px" }}>
              {/* Rear 3D Extruded Cloud Offset */}
              <path
                d="M 173 91 H 213 C 221 91 225 85 224 78 C 223 72 217 69 212 70 C 209 60 196 57 188 63 C 181 59 171 63 169 71 C 162 72 159 78 161 85 C 163 89 168 91 173 91 Z"
                fill={bgFill}
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              {/* 3D Depth Struts */}
              <line x1="167" y1="95" x2="173" y2="91" strokeWidth="1.2" />
              <line x1="207" y1="95" x2="213" y2="91" strokeWidth="1.2" />
              <line x1="192" y1="64" x2="198" y2="60" strokeWidth="1.2" />

              {/* Front Crisp Outline Cloud */}
              <path
                d="M 167 95 H 207 C 215 95 219 89 218 82 C 217 76 211 73 206 74 C 203 64 190 61 182 67 C 175 63 165 67 163 75 C 156 76 153 82 155 89 C 157 93 162 95 167 95 Z"
                fill={bgFill}
                strokeWidth="1.8"
              />
              {/* Internal API Routing Mesh */}
              <polyline points="170,86 182,78 194,84 205,78" strokeWidth="1.2" />
              <circle cx="170" cy="86" r="1.8" fill={bgFill} strokeWidth="1.3" />
              <circle cx="182" cy="78" r="1.8" fill={bgFill} strokeWidth="1.3" />
              <circle cx="194" cy="84" r="1.8" fill={bgFill} strokeWidth="1.3" />
              <circle cx="205" cy="78" r="1.8" fill={bgFill} strokeWidth="1.3" />
            </g>

            {/* Minimal Floating Tag */}
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

          {/* ==========================================
              ICON 03: DB (SEMI-3D STACKED MAGNETIC PLATTER CYLINDERS)
              Center ~ (296, 158)
             ========================================== */}
          <g className="iso-db-node" style={{ transformOrigin: "296px 158px" }}>
            {/* Isometric Base Plinth */}
            <ellipse
              cx="296"
              cy="190"
              rx="36"
              ry="15"
              strokeWidth="1"
              strokeDasharray="3 2"
              className="opacity-50"
            />

            {/* 3 Stacked 3D Database Cylinders */}
            {[2, 1, 0].map((discIdx) => {
              const cyTop = 132 + discIdx * 17;
              const cyBot = cyTop + 11;
              return (
                <g
                  key={`db-cylinder-${discIdx}`}
                  className="iso-db-disc"
                  style={{ transformOrigin: `296px ${cyTop}px` }}
                >
                  {/* Cylinder Side Wall & Curved Bottom */}
                  <path
                    d={`M 264 ${cyTop} V ${cyBot} A 32 13 0 0 0 328 ${cyBot} V ${cyTop} Z`}
                    fill={bgFill}
                    strokeWidth="1.8"
                  />
                  {/* Cylinder Top Surface */}
                  <ellipse
                    cx="296"
                    cy={cyTop}
                    rx="32"
                    ry="13"
                    fill={bgFill}
                    strokeWidth="1.8"
                  />
                  {/* Inner 3D Platter Core Ring */}
                  <ellipse
                    cx="296"
                    cy={cyTop}
                    rx="14"
                    ry="5.5"
                    strokeWidth="1.1"
                  />
                  {/* Isometric Cross-hair Read/Write Axis */}
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
                  {/* Cylinder Vertical Structural Ribs */}
                  <line x1="274" y1={cyTop + 9} x2="274" y2={cyBot + 9} strokeWidth="1.1" />
                  <line x1="296" y1={cyTop + 13} x2="296" y2={cyBot + 13} strokeWidth="1.1" />
                  <line x1="318" y1={cyTop + 9} x2="318" y2={cyBot + 9} strokeWidth="1.1" />
                  {/* Active Sector Indicator */}
                  <circle cx="283" cy={cyTop + 7} r="1.4" fill={fgStroke} />
                </g>
              );
            })}

            {/* Minimal Floating Tag */}
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

