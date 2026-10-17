import React from 'react';

interface MarqueeBannerProps {
  isInverted: boolean;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({ isInverted }) => {
  return (
    <div className="border-b border-current py-3 overflow-hidden bg-current">
      <div className={`animate-marquee font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold ${isInverted ? "text-black" : "text-white"}`}>
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex items-center space-x-8 mx-4">
            <span>REACT</span>
            <span>+</span>
            <span>TYPESCRIPT</span>
            <span>+</span>
            <span>NODE.JS</span>
            <span>+</span>
            <span>NESTJS</span>
            <span>+</span>
            <span>PYTHON FASTAPI</span>
            <span>+</span>
            <span>POSTGRESQL</span>
            <span>+</span>
            <span>REDIS</span>
            <span>+</span>
            <span>MONGODB</span>
            <span>+</span>
            <span>DOCKER</span>
            <span>+</span>
            <span>PRISMA</span>
            <span>+</span>
            <span>GRAPHQL</span>
            <span>+</span>
          </div>
        ))}
      </div>
    </div>
  );
};
