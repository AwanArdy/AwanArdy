import React, { useState, useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';
import { TransitionMode } from './types/portfolio';
import { CV_DATA } from './data/cvData';
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeBanner } from './components/sections/MarqueeBanner';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { SmartctlTuiModal } from './components/modals/SmartctlTuiModal';
import { AtsCvModal } from './components/modals/AtsCvModal';
import { PolarityTransitionOverlay } from './components/ui/PolarityTransitionOverlay';
import { CursorFollower } from './components/ui/CursorFollower';

// Ensure anime is globally accessible for backward compatibility
if (typeof window !== 'undefined') {
  (window as any).anime = anime;
}

// ==========================================
// MAIN PORTFOLIO APPLICATION (SWISS MOTION STYLE)
// ==========================================
export default function App() {
  const [isInverted, setIsInverted] = useState(false);
  const [isTransitioningTheme, setIsTransitioningTheme] = useState(false);
  const [transitionColor, setTransitionColor] = useState('#000000');
  const [transitionMode, setTransitionMode] = useState<TransitionMode>('STAGGER_GRID');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>("01");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [isTuiOpen, setIsTuiOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00 WITA");

  const heroTitleRef = useRef<HTMLDivElement>(null);
  const overlayGridRef = useRef<HTMLDivElement>(null);
  const transitionHudRef = useRef<HTMLDivElement>(null);

  const SHUTTER_COLS = 12;
  const SHUTTER_ROWS = 8;
  const TOTAL_SHUTTER_TILES = SHUTTER_COLS * SHUTTER_ROWS;

  // ==========================================
  // HERO KINETIC TYPOGRAPHY ENTRANCE (ANIME.JS)
  // ==========================================
  const triggerHeroKineticTypography = useCallback(() => {
    if (!heroTitleRef.current || typeof anime !== 'function') return;
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

  // ==========================================
  // EXTRAORDINARY ANIME.JS THEME SWITCH ANIMATION
  // ==========================================
  const handleAnimatedPolarityToggle = (e?: React.MouseEvent) => {
    if (isTransitioningTheme) return;

    const nextInverted = !isInverted;
    const targetFill = nextInverted ? '#000000' : '#FFFFFF';
    setTransitionColor(targetFill);
    setIsTransitioningTheme(true);

    // Calculate approximate tile index from click coordinates
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
      if (!overlayGridRef.current || typeof anime !== 'function') {
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
          // Subtle kinetic bounce of hero letters after polarity switch
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

      // Animate HUD indicator
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
        // Horizontal Swiss Blind Slats Wipe
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
        // Default: 3D Geometric Stagger Matrix Ripple from Click Point
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

  // Track mouse coordinates for Swiss HUD & custom kinetic follower
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Live WITA (Palu, Central Sulawesi UTC+8) Clock
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

  // Animate Skill Pills when filtering
  const handleSelectSkill = (tech: string | null) => {
    const next = selectedSkill === tech ? null : tech;
    setSelectedSkill(next);
    if (typeof anime === 'function') {
      anime({
        targets: '.skill-pill-btn',
        scale: [0.92, 1],
        duration: 400,
        delay: anime.stagger(18),
        easing: 'easeOutBack'
      });
    }
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

  // Helper to split text into kinetic characters for Anime.js
  const renderKineticChars = (text: string) =>
    text.split("").map((char, idx) => (
      <span key={idx} className="inline-block overflow-hidden align-bottom">
        <span className="kinetic-char inline-block will-change-transform">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));

  // Base theme classes strictly Black (#000000) & White (#FFFFFF)
  const themeClasses = isInverted
    ? "bg-black text-white border-white selection:bg-white selection:text-black"
    : "bg-white text-black border-black selection:bg-black selection:text-white";

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden ${themeClasses}`}>
      {/* Custom Styles for Swiss Kinetic Marquee */}
      <style>{`
        @keyframes swissMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: swissMarquee 22s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ==========================================
          ANIME.JS FULLSCREEN POLARITY TRANSITION SHUTTER
         ========================================== */}
      <PolarityTransitionOverlay
        overlayGridRef={overlayGridRef}
        transitionHudRef={transitionHudRef}
        isTransitioningTheme={isTransitioningTheme}
        transitionColor={transitionColor}
        shutterCols={SHUTTER_COLS}
        shutterRows={SHUTTER_ROWS}
        totalShutterTiles={TOTAL_SHUTTER_TILES}
      />

      {/* Custom Kinetic Cursor Follower (Desktop Only) */}
      <CursorFollower
        mouseCoords={mouseCoords}
        cursorExpanded={cursorExpanded}
      />

      {/* ==========================================
          TOP STICKY SWISS NAVIGATION & TELEMETRY BAR
         ========================================== */}
      <Header
        isInverted={isInverted}
        transitionMode={transitionMode}
        setTransitionMode={setTransitionMode}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onTogglePolarity={handleAnimatedPolarityToggle}
        onScrollToSection={scrollToSection}
        setCursorExpanded={setCursorExpanded}
      />

      {/* ==========================================
          MAIN SWISS ASYMMETRIC MODULAR CONTAINER
         ========================================== */}
      <main className="max-w-[1440px] mx-auto border-x border-current">
        {/* ------------------------------------------
            HERO SECTION (INTERNATIONAL TYPOGRAPHIC STYLE)
           ------------------------------------------ */}
        <HeroSection
          isInverted={isInverted}
          currentTime={currentTime}
          onReplayKinetic={triggerHeroKineticTypography}
          heroTitleRef={heroTitleRef}
          setCursorExpanded={setCursorExpanded}
          renderKineticChars={renderKineticChars}
          onTogglePolarity={handleAnimatedPolarityToggle}
        />

        {/* ------------------------------------------
            KINETIC MARQUEE BAND 01
           ------------------------------------------ */}
        <MarqueeBanner isInverted={isInverted} />

        {/* ------------------------------------------
            01 // TECHNICAL CAPABILITIES & FILTER MATRIX
           ------------------------------------------ */}
        <CapabilitiesSection
          isInverted={isInverted}
          selectedSkill={selectedSkill}
          onSelectSkill={handleSelectSkill}
          setCursorExpanded={setCursorExpanded}
        />

        {/* ------------------------------------------
            02 // PROFESSIONAL EXPERIENCE CHRONOLOGY
           ------------------------------------------ */}
        <ExperienceSection
          isInverted={isInverted}
          selectedSkill={selectedSkill}
          onOpenTuiModal={() => setIsTuiOpen(true)}
          setCursorExpanded={setCursorExpanded}
        />

        {/* ------------------------------------------
            03 // SELECTED WORKS & ARCHITECTURE SHOWCASE
           ------------------------------------------ */}
        <ProjectsSection
          isInverted={isInverted}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          selectedSkill={selectedSkill}
          setCursorExpanded={setCursorExpanded}
        />

        {/* ------------------------------------------
            04 // CONTACT & COLOPHON
           ------------------------------------------ */}
        <ContactSection
          isInverted={isInverted}
          copiedEmail={copiedEmail}
          onCopyEmail={handleCopyEmail}
          onTogglePolarity={handleAnimatedPolarityToggle}
          setCursorExpanded={setCursorExpanded}
        />
      </main>

      {/* ==========================================
          MODALS (SMARTCTL TUI & ATS CV VIEW)
         ========================================== */}
      <SmartctlTuiModal isOpen={isTuiOpen} onClose={() => setIsTuiOpen(false)} />
      <AtsCvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
    </div>
  );
}
