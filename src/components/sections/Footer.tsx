import React from 'react';
import { ArrowUpRight, Contrast, FileText, ChevronUp, Terminal } from 'lucide-react';
import { CV_DATA } from '../../data/cvData';

interface FooterProps {
  isInverted: boolean;
  currentTime: string;
  onScrollToSection: (id: string) => void;
  onTogglePolarity: (e: React.MouseEvent) => void;
  onOpenCvModal: () => void;
  onOpenTuiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  isInverted,
  currentTime,
  onScrollToSection,
  onTogglePolarity,
  onOpenCvModal,
  onOpenTuiModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-current font-sans">
      {/* Top Banner Row: Brand Display & Back To Top */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-current">
        <div className="lg:col-span-8 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-current flex flex-col justify-between">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3 opacity-60">
            INDEX // 05 — COLOPHON &amp; ARCHITECTURAL SUMMARY
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
            MUHAMMAD AWAN ARDY FIRMANSYAH
          </h2>
          <p className="font-mono text-xs sm:text-sm mt-3 opacity-75 uppercase tracking-wide">
            FULLSTACK WEB DEVELOPER // SWISS MOTION TYPOGRAPHY PORTFOLIO
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between">
          <button
            onClick={scrollToTop}
            className="p-6 sm:p-10 w-full flex-1 flex items-center justify-between hover:bg-current group transition-colors cursor-pointer border-b lg:border-b-0 border-current"
            title="Return to top of page"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100">
                NAVIGATION
              </div>
              <div className={`text-base sm:text-lg font-black uppercase tracking-tight group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                BACK TO TOP
              </div>
            </div>
            <div className={`w-10 h-10 border border-current flex items-center justify-center shrink-0 group-hover-invert-border ${isInverted ? "group-hover:border-black group-hover:text-black" : "group-hover:border-white group-hover:text-white"}`}>
              <ChevronUp className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* Middle Grid: 4-Column Asymmetric Swiss Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
        {/* Col 1: System Telemetry */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 border-b sm:border-b lg:border-b-0 sm:border-r lg:border-r border-current">
          <div>
            <div className="opacity-60 text-[10px] uppercase tracking-widest mb-3">
              01 // TELEMETRY &amp; TIME
            </div>
            <div className="space-y-2">
              <div>
                <span className="opacity-60">LOCATION: </span>
                <span className="font-bold">{CV_DATA.location}</span>
              </div>
              <div>
                <span className="opacity-60">COORDINATES: </span>
                <span className="font-bold">{CV_DATA.coordinates}</span>
              </div>
              <div>
                <span className="opacity-60">TIMEZONE: </span>
                <span className="font-bold">{currentTime}</span>
              </div>
              <div>
                <span className="opacity-60">SYS STATUS: </span>
                <span className="font-bold inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse inline-block" />
                  100% OPERATIONAL
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-current text-[10px] opacity-60">
            NODE ENVIRONMENT: PRODUCTION
          </div>
        </div>

        {/* Col 2: Navigation Quick Index */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 border-b sm:border-b lg:border-b-0 lg:border-r border-current">
          <div>
            <div className="opacity-60 text-[10px] uppercase tracking-widest mb-3">
              02 // DIRECT SECTIONS
            </div>
            <nav className="flex flex-col space-y-2 font-mono uppercase">
              {[
                { label: "00 // HERO MANIFESTO", target: "hero" },
                { label: "01 // CAPABILITIES", target: "capabilities" },
                { label: "02 // EXPERIENCE", target: "experience" },
                { label: "03 // SELECTED WORKS", target: "projects" },
                { label: "04 // CONTACT", target: "contact" }
              ].map((item) => (
                <button
                  key={item.target}
                  onClick={() => onScrollToSection(item.target)}
                  className="text-left py-1 hover:underline hover:opacity-80 transition-opacity flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 font-bold transition-opacity">→</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-4 border-t border-current text-[10px] opacity-60">
            SMOOTH SCROLL ENABLED
          </div>
        </div>

        {/* Col 3: Terminal & Modals Quick Access */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 border-b sm:border-b-0 sm:border-r lg:border-r border-current">
          <div>
            <div className="opacity-60 text-[10px] uppercase tracking-widest mb-3">
              03 // UTILITIES &amp; DOCS
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={onOpenTuiModal}
                className="py-1.5 px-2 border border-current hover:bg-current group transition-colors flex items-center justify-between text-left"
              >
                <span className={`flex items-center gap-1.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                  <Terminal className="w-3.5 h-3.5" />
                  <span>SMARTCTL TUI SIM</span>
                </span>
                <span className={`text-[10px] group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>RUN</span>
              </button>

              <button
                onClick={onOpenCvModal}
                className="py-1.5 px-2 border border-current hover:bg-current group transition-colors flex items-center justify-between text-left"
              >
                <span className={`flex items-center gap-1.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                  <FileText className="w-3.5 h-3.5" />
                  <span>CV.TEX ATS VIEW</span>
                </span>
                <span className={`text-[10px] group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>VIEW</span>
              </button>

              <button
                onClick={onTogglePolarity}
                className="py-1.5 px-2 border border-current hover:bg-current group transition-colors flex items-center justify-between text-left"
              >
                <span className={`flex items-center gap-1.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                  <Contrast className="w-3.5 h-3.5" />
                  <span>POLARITY INVERT</span>
                </span>
                <span className={`text-[10px] font-bold group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                  {isInverted ? "BLK" : "WHT"}
                </span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-current text-[10px] opacity-60">
            ACCESSIBILITY: KEYBOARD + MOUSE
          </div>
        </div>

        {/* Col 4: Channels & Source Code */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="opacity-60 text-[10px] uppercase tracking-widest mb-3">
              04 // CHANNELS &amp; REPO
            </div>
            <div className="space-y-3">
              <a
                href={CV_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center justify-between group"
              >
                <span className="font-bold">GITHUB REPO</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href={`mailto:${CV_DATA.email}`}
                className="hover:underline flex items-center justify-between group break-all"
              >
                <span className="font-bold">EMAIL INQUIRIES</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 shrink-0" />
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-current text-[10px] opacity-60">
            FONT: PLUS JAKARTA SANS
          </div>
        </div>
      </div>

      {/* Bottom Colophon Bar */}
      <div className="border-t border-current p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-mono text-[10px] sm:text-xs">
        <div>
          © {new Date().getFullYear()} MUHAMMAD AWAN ARDY FIRMANSYAH. ALL RIGHTS RESERVED.
        </div>
        <div className="opacity-75 uppercase">
          SWISS INTERNATIONAL TYPOGRAPHIC STYLE // REACT + TAILWIND + ANIME.JS
        </div>
      </div>
    </footer>
  );
};
