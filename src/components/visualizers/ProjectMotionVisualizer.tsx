import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { ProjectVisualType } from '../../types/portfolio';

export const ProjectMotionVisualizer: React.FC<{ type: ProjectVisualType | string; isInverted: boolean }> = ({ type, isInverted }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgFill = isInverted ? "#000000" : "#FFFFFF";
  const fgStroke = isInverted ? "#FFFFFF" : "#000000";

  useEffect(() => {
    let isCancelled = false;


    const startProjectAnimation = () => {
      if (isCancelled || !containerRef.current) return;


      const el = containerRef.current;

      // --------------------------------------------------
      // 01. E-COMMERCE PLATFORM: Catalog -> Cart -> Midtrans Webhook -> Stock Sync
      // --------------------------------------------------
      if (type === "ecommerce") {
        const cursor = el.querySelector(".ecom-cursor");
        const itemCard = el.querySelector(".ecom-product-card");
        const cartBadge = el.querySelector(".ecom-cart-badge");
        const payPacket = el.querySelector(".ecom-pay-pkt");
        const webhookPulse = el.querySelector(".ecom-webhook-ring");
        const checkIcon = el.querySelector(".ecom-check-mark");
        const rails = el.querySelectorAll(".ecom-rail");

        anime.remove([
          cursor,
          itemCard,
          cartBadge,
          payPacket,
          webhookPulse,
          checkIcon,
          rails
        ]);

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

      // --------------------------------------------------
      // 02. REALTIME CHAT APP: User A -> E2E Ciphertext -> MongoDB Shard -> User B + Read Receipt
      // --------------------------------------------------
      if (type === "chat") {
        const msgBubbleA = el.querySelector(".chat-bubble-a");
        const cipherPkt = el.querySelector(".chat-cipher-pkt");
        const lockPulse = el.querySelector(".chat-lock-ring");
        const shardCyl = el.querySelector(".chat-shard-node");
        const msgBubbleB = el.querySelector(".chat-bubble-b");
        const typingDots = el.querySelectorAll(".chat-typing-dot");
        const readTicks = el.querySelector(".chat-read-ticks");

        anime.remove([
          msgBubbleA,
          cipherPkt,
          lockPulse,
          shardCyl,
          msgBubbleB,
          typingDots,
          readTicks
        ]);

        // Continuous typing dots animation
        anime({
          targets: typingDots,
          translateY: [0, -3.5, 0],
          duration: 600,
          delay: anime.stagger(140),
          loop: true,
          easing: "easeInOutSine"
        });

        // Message encryption & delivery timeline
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

      // --------------------------------------------------
      // 03. ANALYTICS DASHBOARD: Interactive BI Chart + Time Filter + 1-Click CSV Export
      // --------------------------------------------------
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

      // --------------------------------------------------
      // 04. REST API GATEWAY: Client Ingress -> JWT + Rate Limit -> Fan-out Services & OpenAPI
      // --------------------------------------------------
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
              translateY: (node, i) => [0, (i - 1) * 36],
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

  // ==========================================================
  // RENDER 01: E-COMMERCE PLATFORM (Catalog -> Cart -> Midtrans -> DB Sync)
  // ==========================================================
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
            {/* Connecting Pipeline Rails */}
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

            {/* Animated Payment/Order Packet */}
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

            {/* 1. STOREFRONT CATALOG WINDOW (LEFT) */}
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

              {/* Product Cards inside Storefront */}
              <rect
                x="18"
                y="44"
                width="34"
                height="26"
                fill={bgFill}
                strokeWidth="1.2"
              />
              <line x1="22" y1="62" x2="46" y2="62" strokeWidth="1" />

              {/* Selected Product Card (Animated Click) */}
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

              {/* Bottom Filter Bar */}
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

              {/* Animated Pointer Cursor */}
              <g className="ecom-cursor" transform="translate(38, 74)">
                <polygon
                  points="0,0 0,11 3.5,8.5 6.5,13 8.5,12 5.5,7.5 9.5,7.5"
                  fill={fgStroke}
                  stroke={bgFill}
                  strokeWidth="0.8"
                />
              </g>
            </g>

            {/* 2. SHOPPING CART NODE (CENTER-LEFT) */}
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
              {/* Shopping Cart Wireframe Icon */}
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

            {/* 3. MIDTRANS PAYMENT & IDEMPOTENT WEBHOOK (RIGHT) */}
            <g>
              {/* Expanding Webhook Pulse Ring */}
              <circle
                cx="312"
                cy="66"
                r="26"
                strokeWidth="1.1"
                className="ecom-webhook-ring"
                style={{ transformOrigin: "312px 66px", opacity: 0 }}
              />

              {/* Payment Gateway Terminal Card */}
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

              {/* Credit Card Chip & Checkmark */}
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

  // ==========================================================
  // RENDER 02: REALTIME CHAT APP (User A -> E2E Cipher -> Mongo Shard -> User B)
  // ==========================================================
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
            {/* Socket.io Bi-directional Channel */}
            <line
              x1="96"
              y1="64"
              x2="264"
              y2="64"
              strokeWidth="1.3"
              strokeDasharray="4 3"
              className="opacity-55"
            />

            {/* Gliding Encrypted Ciphertext Packet */}
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

            {/* 1. SENDER CLIENT WINDOW (LEFT) */}
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

              {/* Outgoing Plaintext Chat Bubble */}
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

              {/* Typing Indicator Pill */}
              <rect
                x="18"
                y="76"
                width="42"
                height="16"
                fill={bgFill}
                strokeWidth="1.1"
              />
              <circle
                cx="28"
                cy="84"
                r="1.8"
                fill={fgStroke}
                className="chat-typing-dot"
              />
              <circle
                cx="38"
                cy="84"
                r="1.8"
                fill={fgStroke}
                className="chat-typing-dot"
              />
              <circle
                cx="48"
                cy="84"
                r="1.8"
                fill={fgStroke}
                className="chat-typing-dot"
              />
            </g>

            {/* 2. E2E CIPHER LOCK & MONGODB SHARD (CENTER) */}
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
              {/* Padlock Wireframe */}
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

              {/* Per-Channel MongoDB Shard Cylinder */}
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

            {/* 3. RECEIVER CLIENT WINDOW + READ RECEIPT (RIGHT) */}
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

              {/* Decrypted Incoming Bubble */}
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

              {/* Double Check Read Receipt */}
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

  // ==========================================================
  // RENDER 03: ANALYTICS DASHBOARD (Interactive Chart + Drill-down + 1-Click CSV)
  // ==========================================================
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
            {/* 1. BI CHART PANEL (LEFT & CENTER) */}
            <g>
              <rect
                x="10"
                y="16"
                width="226"
                height="104"
                fill={bgFill}
                strokeWidth="1.6"
              />
              {/* Top Time-Range Filter Header */}
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
              {/* Filter Pills: 24H | 7D | 30D */}
              <rect
                x="148"
                y="20"
                width="24"
                height="10"
                fill={bgFill}
                strokeWidth="1"
              />
              <text
                x="160"
                y="27.5"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[6.5px]"
              >
                7D
              </text>
              <rect
                x="176"
                y="20"
                width="26"
                height="10"
                fill={fgStroke}
                strokeWidth="1"
              />
              <text
                x="189"
                y="27.5"
                textAnchor="middle"
                fill={bgFill}
                stroke="none"
                className="font-mono text-[6.5px] font-bold"
              >
                30D
              </text>
              <rect
                x="206"
                y="20"
                width="24"
                height="10"
                fill={bgFill}
                strokeWidth="1"
              />
              <text
                x="218"
                y="27.5"
                textAnchor="middle"
                fill={fgStroke}
                stroke="none"
                className="font-mono text-[6.5px]"
              >
                1Y
              </text>

              {/* Chart Grid Lines */}
              <line
                x1="22"
                y1="54"
                x2="224"
                y2="54"
                strokeWidth="0.6"
                strokeDasharray="2 3"
              />
              <line
                x1="22"
                y1="80"
                x2="224"
                y2="80"
                strokeWidth="0.6"
                strokeDasharray="2 3"
              />
              <line x1="22" y1="108" x2="224" y2="108" strokeWidth="1.2" />

              {/* Animated Recharts Bar Columns */}
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

              {/* Animated Polyline Overlay */}
              <path
                d="M 37 82 L 64 64 L 91 74 L 118 48 L 145 62 L 172 44 L 199 52"
                strokeWidth="2"
                className="bi-trend-line"
              />

              {/* Sliding Interactive Zoom / Drill-Down Selection Window */}
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

            {/* Export Connector Arrow */}
            <line
              x1="236"
              y1="68"
              x2="266"
              y2="68"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />

            {/* 2. ONE-CLICK CSV EXPORT & SCHEDULED REPORT CARD (RIGHT) */}
            <g
              className="bi-csv-doc"
              style={{ transformOrigin: "308px 68px" }}
            >
              {/* Document Sheet with Folded Corner */}
              <polygon
                points="268,24 332,24 348,40 348,112 268,112"
                fill={bgFill}
                strokeWidth="1.7"
              />
              <polyline points="332,24 332,40 348,40" strokeWidth="1.4" />

              {/* CSV Badge */}
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

              {/* Download Arrow Animation */}
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

  // ==========================================================
  // RENDER 04: REST API GATEWAY (Client Ingress -> Central Gateway -> Microservices)
  // ==========================================================
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

          {/* Ingress Rails (Left to Center Gateway) */}
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

          {/* Fan-Out Routing Rails (Center Gateway to 3 Downstream Targets) */}
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

          {/* Animated Ingress Request Packets */}
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

          {/* Animated Validated Fan-Out Packets */}
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

          {/* 1. INGRESS CLIENTS (LEFT) */}
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

          {/* 2. CENTRAL EXPRESS + PRISMA API GATEWAY HUB (CENTER) */}
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

            {/* JWT Auth Shield Icon */}
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

            {/* Rate Limiter Quota Bar */}
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

          {/* 3. ROUTED MICROSERVICES & AUTO OPENAPI DOCS (RIGHT) */}
          <g>
            {/* Service A */}
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

            {/* Service B */}
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

            {/* Auto-generated OpenAPI 3.0 Spec */}
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

