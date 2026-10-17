import React from 'react';
import { FileText, Contrast } from 'lucide-react';
import { TransitionMode } from '../../types/portfolio';
import { CV_DATA } from '../../data/cvData';

interface HeaderProps {
  isInverted: boolean;
  transitionMode: TransitionMode;
  setTransitionMode: React.Dispatch<React.SetStateAction<TransitionMode>>;
  onOpenCvModal: () => void;
  onTogglePolarity: (e: React.MouseEvent) => void;
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isInverted,
  transitionMode,
  setTransitionMode,
  onOpenCvModal,
  onTogglePolarity,
  onScrollToSection
}) => {
  return (
    <header className={`sticky top-0 z-30 border-b border-current ${isInverted ? "bg-black" : "bg-white"}`}>
      <div className="w-full grid grid-cols-12 text-xs font-mono uppercase tracking-wider">
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
            <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
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
              onClick={() => onScrollToSection(nav.target)}
              className="px-2 py-1 hover:bg-current transition-colors group"
            >
              <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                {nav.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Polarity Toggle & CV Button */}
        <div className="col-span-5 sm:col-span-6 md:col-span-5 lg:col-span-2 flex items-center justify-end">
          <button
            onClick={onOpenCvModal}
            className="h-full px-2.5 sm:px-4 py-3 border-r border-current hover:bg-current group transition-colors flex items-center gap-1.5"
            title="Open Printable ATS CV"
          >
            <FileText className={`w-3.5 h-3.5 shrink-0 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
            <span className={`text-[10px] sm:text-xs group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>CV.TEX</span>
          </button>

          <button
            onClick={onTogglePolarity}
            className="h-full px-2.5 sm:px-4 py-3 hover:bg-current group transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
            title="Trigger Anime.js Polarity Invert Transition"
          >
            <Contrast className={`w-3.5 h-3.5 shrink-0 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
            <span className={`text-[10px] sm:text-xs group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
              <span className="hidden sm:inline">MODE: </span>
              {isInverted ? "BLK" : "WHT"}
            </span>
          </button>
        </div>
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
            onClick={() => onScrollToSection(nav.target)}
            className="py-2.5 px-1 text-center hover:bg-current group transition-colors font-bold"
          >
            <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
              {nav.label}
            </span>
          </button>
        ))}
      </nav>
    </header>
  );
};
