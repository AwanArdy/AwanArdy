import React from 'react';
import { Terminal } from 'lucide-react';
import { CV_DATA } from '../../data/cvData';

interface ExperienceSectionProps {
  isInverted: boolean;
  selectedSkill: string | null;
  onOpenTuiModal: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  isInverted,
  selectedSkill,
  onOpenTuiModal
}) => {
  return (
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
                      onClick={onOpenTuiModal}
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
  );
};
