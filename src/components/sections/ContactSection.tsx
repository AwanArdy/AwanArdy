import React from 'react';
import { ArrowUpRight, Copy, Check, Contrast } from 'lucide-react';
import { CV_DATA } from '../../data/cvData';

interface ContactSectionProps {
  isInverted: boolean;
  copiedEmail: boolean;
  onCopyEmail: () => void;
  onTogglePolarity: (e: React.MouseEvent) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isInverted,
  copiedEmail,
  onCopyEmail,
  onTogglePolarity
}) => {
  return (
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
            onClick={onCopyEmail}
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
            onClick={onTogglePolarity}
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
  );
};
