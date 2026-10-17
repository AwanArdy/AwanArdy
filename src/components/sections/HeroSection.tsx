import React from 'react';
import { RefreshCw, ArrowUpRight } from 'lucide-react';
import { CV_DATA } from '../../data/cvData';
import { SwissKineticMatrix } from '../visualizers/SwissKineticMatrix';
import { RedisPostgresPipelineFig } from '../visualizers/RedisPostgresPipelineFig';

interface HeroSectionProps {
  isInverted: boolean;
  currentTime: string;
  onReplayKinetic: () => void;
  heroTitleRef: React.RefObject<HTMLDivElement | null>;
  setCursorExpanded: (expanded: boolean) => void;
  renderKineticChars: (text: string) => React.ReactNode;
  onTogglePolarity: (e: React.MouseEvent) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isInverted,
  currentTime,
  onReplayKinetic,
  heroTitleRef,
  setCursorExpanded,
  renderKineticChars,
  onTogglePolarity
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-current">
      {/* Left Column: Massive Kinetic Display Typography */}
      <div className="lg:col-span-7 xl:col-span-8 p-5 sm:p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-current flex flex-col justify-between relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-6 sm:mb-8 pb-3 border-b border-current">
          <span>INDEX // 00 — SWISS KINETIC MANIFESTO</span>
          <div className="flex items-center gap-2 sm:gap-3">
            <span>{currentTime}</span>
            <button
              onClick={onReplayKinetic}
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
              onClick={onTogglePolarity}
              className="font-bold mt-0.5 underline flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-2 h-2 bg-current rounded-full animate-ping" />
              INVERT THEME ({isInverted ? "WHITE" : "BLACK"})
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Smooth Looping FIG 01 + FIG 02 (Redis/Postgres Row-Lock) + Summary */}
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
        {/* FIG 01: Smooth Looping Semi-3D Fullstack Architecture */}
        <SwissKineticMatrix isInverted={isInverted} />

        {/* FIG 02: Redis Cache Wave & Postgres Row-Level Lock Schematic */}
        <RedisPostgresPipelineFig isInverted={isInverted} />

        {/* Executive Summary */}
        <div className="p-5 sm:p-7 border-b border-current flex-1 flex flex-col justify-center">
          <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-60">
            00.1 // EXECUTIVE BRIEF
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            {CV_DATA.summary}
          </p>
        </div>

        {/* Quick Action Matrix */}
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
  );
};
