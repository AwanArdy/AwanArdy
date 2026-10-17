import React from 'react';
import { CV_DATA } from '../../data/cvData';

interface CapabilitiesSectionProps {
  isInverted: boolean;
  selectedSkill: string | null;
  onSelectSkill: (tech: string | null) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  isInverted,
  selectedSkill,
  onSelectSkill
}) => {
  return (
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
              onClick={() => onSelectSkill(null)}
              className="self-start sm:self-auto border-2 border-current px-3 py-1.5 font-mono text-xs uppercase font-bold hover:bg-current group transition-colors shrink-0"
            >
              <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
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
            className={`p-6 sm:p-8 flex flex-col justify-between border-b [&:last-child]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 ${
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
                      onClick={() => onSelectSkill(tech)}
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
                            : `group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`
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
  );
};
