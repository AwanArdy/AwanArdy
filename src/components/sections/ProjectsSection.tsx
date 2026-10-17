import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { CV_DATA } from '../../data/cvData';
import { ProjectMotionVisualizer } from '../visualizers/ProjectMotionVisualizer';

interface ProjectsSectionProps {
  isInverted: boolean;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
  selectedSkill: string | null;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  isInverted,
  activeProject,
  setActiveProject,
  selectedSkill
}) => {
  return (
    <section id="projects" className="border-b border-current">
      <div className="p-6 sm:p-10 border-b border-current flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest">SECTION // 03</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mt-2 leading-none">
            SELECTED WORKS &amp;
            <br />
            SYSTEM SCHEMATICS
          </h2>
        </div>
        <div className="font-mono text-xs max-w-sm">
          Setiap proyek dilengkapi skema arsitektur interaktif berbasis Anime.js yang memvisualisasikan cara kerja sistem secara langsung sesuai spesifikasinya.
        </div>
      </div>

      <div className="divide-y divide-current">
        {CV_DATA.projects.map((project) => {
          const isOpen = activeProject === project.id;
          const matchesFilter =
            !selectedSkill ||
            project.stack.some((s) => s.toLowerCase().includes(selectedSkill.toLowerCase()));

          return (
            <div
              key={project.id}
              className={`transition-opacity duration-300 ${
                matchesFilter ? "opacity-100" : "opacity-25"
              }`}
            >
              <div
                onClick={() => setActiveProject(isOpen ? null : project.id)}
                className={`p-5 sm:p-10 cursor-pointer transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 ${
                  isOpen ? "bg-current" : "hover:bg-current/5"
                }`}
              >
                <div className="flex items-start sm:items-baseline justify-between lg:justify-start gap-3 sm:gap-8 w-full lg:w-auto">
                  <div className="flex items-baseline gap-3 sm:gap-8 min-w-0">
                    <span
                      className={`font-mono text-lg sm:text-3xl font-bold shrink-0 ${
                        isOpen ? (isInverted ? "text-black" : "text-white") : ""
                      }`}
                    >
                      /{project.id}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className={`text-xl sm:text-4xl xl:text-5xl font-black uppercase tracking-tight break-words ${
                          isOpen ? (isInverted ? "text-black" : "text-white") : ""
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-1 ${
                          isOpen
                            ? isInverted
                              ? "text-black/80"
                              : "text-white/80"
                            : "opacity-70"
                        }`}
                      >
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Toggle Icon */}
                  <div
                    className={`lg:hidden w-8 h-8 shrink-0 border flex items-center justify-center ${
                      isOpen
                        ? isInverted
                          ? "border-black text-black"
                          : "border-white text-white"
                        : "border-current"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className={`border px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] sm:text-xs ${
                        isOpen
                          ? isInverted
                            ? "border-black text-black"
                            : "border-white text-white"
                          : "border-current"
                      }`}
                    >
                      <span className="opacity-60 mr-1.5">{m.label}:</span>
                      <span className="font-bold">{m.value}</span>
                    </div>
                  ))}

                  {/* Desktop Toggle Icon */}
                  <div
                    className={`hidden lg:flex w-9 h-9 shrink-0 border items-center justify-center ${
                      isOpen
                        ? isInverted
                          ? "border-black text-black"
                          : "border-white text-white"
                        : "border-current"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-current">
                  <div className="lg:col-span-7 p-5 sm:p-10 border-b lg:border-b-0 lg:border-r border-current flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest mb-4 pb-2 border-b border-current">
                        ARCHITECTURAL SPECIFICATION // CASE {project.id}
                      </div>

                      <ul className="space-y-3 sm:space-y-4 my-4 sm:my-6">
                        {project.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs sm:text-base">
                            <span className="font-mono text-xs font-bold mt-0.5 sm:mt-1 shrink-0">
                              [{project.id}.{i + 1}]
                            </span>
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-5 sm:pt-6 border-t border-current">
                      <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">
                        TECHNOLOGY STACK
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] sm:text-xs uppercase px-2.5 py-1 border border-current font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 sm:p-8 xl:p-10 flex flex-col justify-center">
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-60">
                      ANIME.JS INTERACTIVE SYSTEM VISUALIZER
                    </div>
                    <ProjectMotionVisualizer
                      type={project.visualType}
                      isInverted={isInverted}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
