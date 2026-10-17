import React from 'react';

interface CursorFollowerProps {
  mouseCoords: { x: number; y: number };
  cursorExpanded: boolean;
}

export const CursorFollower: React.FC<CursorFollowerProps> = ({ mouseCoords, cursorExpanded }) => {
  return (
    <div
      className="hidden lg:block fixed pointer-events-none z-40 rounded-full mix-blend-difference bg-white transition-transform duration-150 ease-out"
      style={{
        width: cursorExpanded ? "56px" : "18px",
        height: cursorExpanded ? "56px" : "18px",
        left: `${mouseCoords.x}px`,
        top: `${mouseCoords.y}px`,
        transform: "translate(-50%, -50%)"
      }}
    />
  );
};
