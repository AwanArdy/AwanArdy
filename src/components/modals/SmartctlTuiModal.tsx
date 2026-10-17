import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Terminal } from 'lucide-react';

export const SmartctlTuiModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedDrive, setSelectedDrive] = useState(0);
  const [scanTick, setScanTick] = useState(0);
  const modalBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (modalBoxRef.current && typeof anime === 'function') {
      anime({
        targets: modalBoxRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 420,
        easing: 'easeOutExpo'
      });
    }
    const timer = setInterval(() => {
      setScanTick((t) => (t + 1) % 100);
    }, 300);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const drives = [
    {
      device: "/dev/nvme0n1",
      model: "SAMSUNG MZVL21T0HCLR-00B00",
      status: "PASSED",
      temp: "38°C",
      powerOnHours: "4,812 hrs",
      wearLevel: "97%"
    },
    {
      device: "/dev/sda",
      model: "WDC WD40EFPX-68C6CN0",
      status: "PASSED",
      temp: "33°C",
      powerOnHours: "11,290 hrs",
      wearLevel: "94%"
    }
  ];

  const active = drives[selectedDrive];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        ref={modalBoxRef}
        className="bg-black text-white border-2 border-white w-full max-w-2xl font-mono p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-white pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs">
            <Terminal className="w-4 h-4" />
            <span>INK + TYPESCRIPT // SMARTCTL STORAGE HEALTH TUI (2025)</span>
          </div>
          <button 
            onClick={onClose}
            className="border border-white px-2 py-0.5 text-xs hover:bg-white hover:text-black transition-colors"
          >
            [ESC / CLOSE]
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="border border-white p-3">
            <div className="text-[10px] opacity-60 mb-2">SELECT BLOCK DEVICE</div>
            {drives.map((d, i) => (
              <button
                key={d.device}
                onClick={() => setSelectedDrive(i)}
                className={`w-full text-left px-2 py-1.5 text-xs mb-1 border transition-colors ${
                  selectedDrive === i
                    ? "bg-white text-black border-white font-bold"
                    : "border-transparent hover:border-white"
                }`}
              >
                &gt; {d.device}
              </button>
            ))}
          </div>

          <div className="sm:col-span-2 border border-white p-3 text-xs space-y-2">
            <div className="flex justify-between border-b border-white/30 pb-1">
              <span className="opacity-60">MODEL:</span>
              <span className="font-bold">{active.model}</span>
            </div>
            <div className="flex justify-between border-b border-white/30 pb-1">
              <span className="opacity-60">SMART OVERALL-HEALTH:</span>
              <span className="bg-white text-black px-1.5 font-bold">{active.status}</span>
            </div>
            <div className="flex justify-between border-b border-white/30 pb-1">
              <span className="opacity-60">TEMPERATURE:</span>
              <span>{active.temp}</span>
            </div>
            <div className="flex justify-between border-b border-white/30 pb-1">
              <span className="opacity-60">POWER ON HOURS:</span>
              <span>{active.powerOnHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">HEALTH INTEGRITY:</span>
              <span>{active.wearLevel}</span>
            </div>
          </div>
        </div>

        <div className="border border-white p-3 text-[11px]">
          <div className="flex justify-between mb-1">
            <span>SMARTCTL --JSON STREAM PARSER</span>
            <span>POLLING TICK #{scanTick.toString().padStart(2, '0')}</span>
          </div>
          <div className="w-full bg-white/20 h-2 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${(scanTick % 20) * 5 + 5}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

