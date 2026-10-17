import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { CV_DATA } from '../../data/cvData';

export const AtsCvModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && typeof anime === 'function') {
      anime({
        targets: modalRef.current,
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 480,
        easing: 'easeOutExpo'
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-white text-black border-2 border-black w-full max-w-3xl p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest">
            ATS-FRIENDLY DOCUMENT VIEW // CV.TEX
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="border border-black px-3 py-1 text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors"
            >
              PRINT / PDF
            </button>
            <button
              onClick={onClose}
              className="bg-black text-white px-3 py-1 text-xs font-mono uppercase hover:opacity-80"
            >
              CLOSE [X]
            </button>
          </div>
        </div>

        <div className="text-center border-b border-black pb-4 mb-5">
          <h2 className="text-2xl font-bold tracking-tight">{CV_DATA.name}</h2>
          <p className="text-sm font-medium mt-1">{CV_DATA.role}</p>
          <p className="text-xs font-mono mt-1">
            {CV_DATA.location} · {CV_DATA.email} · {CV_DATA.githubHandle}
          </p>
        </div>

        <div className="space-y-5 text-sm leading-relaxed">
          <section>
            <h3 className="font-bold uppercase tracking-wider text-xs border-b border-black pb-1 mb-2">
              Professional Summary
            </h3>
            <p>{CV_DATA.summary}</p>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-wider text-xs border-b border-black pb-1 mb-2">
              Technical Skills
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              {CV_DATA.skills.map((s) => (
                <li key={s.id}>
                  <span className="font-bold">{s.category}:</span> {s.items.join(", ")}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-wider text-xs border-b border-black pb-1 mb-2">
              Professional Experience
            </h3>
            <div className="space-y-3">
              {CV_DATA.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-xs sm:text-sm">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="font-mono">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm mt-1 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-wider text-xs border-b border-black pb-1 mb-2">
              Projects
            </h3>
            <div className="space-y-3">
              {CV_DATA.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="font-bold text-xs sm:text-sm">
                    {proj.title} — <span className="font-normal font-mono text-xs">{proj.stack.join(", ")}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm mt-1 space-y-0.5">
                    {proj.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

