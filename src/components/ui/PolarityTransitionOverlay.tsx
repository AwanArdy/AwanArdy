import React from 'react';

interface PolarityTransitionOverlayProps {
  overlayGridRef: React.RefObject<HTMLDivElement | null>;
  transitionHudRef: React.RefObject<HTMLDivElement | null>;
  isTransitioningTheme: boolean;
  transitionColor: string;
  shutterCols: number;
  shutterRows: number;
  totalShutterTiles: number;
}

export const PolarityTransitionOverlay: React.FC<PolarityTransitionOverlayProps> = ({
  overlayGridRef,
  transitionHudRef,
  isTransitioningTheme,
  transitionColor,
  shutterCols,
  shutterRows,
  totalShutterTiles
}) => {
  return (
    <div
      ref={overlayGridRef}
      className={`fixed inset-0 z-50 pointer-events-none grid ${
        isTransitioningTheme ? "visible" : "invisible"
      }`}
      style={{
        gridTemplateColumns: `repeat(${shutterCols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${shutterRows}, minmax(0, 1fr))`
      }}
    >
      {Array.from({ length: totalShutterTiles }).map((_, idx) => (
        <div
          key={idx}
          className="polarity-tile w-full h-full opacity-0 border"
          style={{
            backgroundColor: transitionColor,
            borderColor: transitionColor === '#000000' ? '#FFFFFF' : '#000000',
            transform: 'scale(0)'
          }}
        />
      ))}

      {/* Centered Swiss Telemetry Banner During Polarity Inversion */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={transitionHudRef}
          style={{
            backgroundColor: transitionColor === '#000000' ? '#FFFFFF' : '#000000',
            color: transitionColor
          }}
          className="opacity-0 px-6 py-3 border-2 border-current font-mono text-xs sm:text-sm uppercase tracking-[0.3em] font-black shadow-2xl"
        >
          POLARITY INVERT // {transitionColor === '#000000' ? 'BLACK MODE (#000)' : 'WHITE MODE (#FFF)'}
        </div>
      </div>
    </div>
  );
};
