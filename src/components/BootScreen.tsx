import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const bootLines = [
    "BOOTING CRIMSON ARCHIVE...",
    "",
    "ENTITY: Yashftw",
    "SIGNAL: UNSTABLE",
    "STATUS: ONLINE",
    "",
    "SYSTEM INTEGRITY... OK",
    "DECRYPTING HEADERS...",
    "ESTABLISHING CHANNEL...",
    "",
    "▸ ALL SYSTEMS NOMINAL",
    "▸ ENTERING ARCHIVE...",
  ];

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 50 + Math.random() * 100);
      }
    }, 300);
    return () => clearInterval(glitchInterval);
  }, []);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const currentLine = bootLines[i];
        setLines((prev) => [...prev, currentLine]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Progress bar
  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setDone(true), 300);
        setTimeout(() => onComplete(), 800);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-black flex items-center justify-center transition-opacity duration-500 ${
        done ? "opacity-0" : "opacity-100"
      } ${glitchActive ? "boot-glitch" : ""}`}
    >
      {/* Scanline overlay */}
      <div className="boot-scanlines" />
      
      {/* Horizontal glitch line */}
      {glitchActive && (
        <div 
          className="absolute left-0 right-0 h-[2px] bg-primary/80 z-50"
          style={{ top: `${Math.random() * 100}%` }}
        />
      )}
      
      <div className="max-w-lg w-full px-6">
        <div className="space-y-1 font-terminal text-lg">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={`boot-line ${
                line.startsWith("ENTITY") || line.startsWith("STATUS") || line.startsWith("SIGNAL")
                  ? "text-primary font-bold"
                  : line.startsWith("▸")
                  ? "text-primary animate-pulse"
                  : "text-primary/80"
              }`}
              style={{ 
                animationDelay: `${idx * 50}ms`,
                textShadow: '0 0 10px hsl(var(--primary) / 0.5)'
              }}
            >
              {line || "\u00A0"}
            </div>
          ))}
          {!done && (
            <span className="blink-cursor text-primary font-terminal text-lg" />
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-8 space-y-2">
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-3 bg-primary/10 border border-primary/30 overflow-hidden"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer"
              style={{ backgroundSize: '200% 100%' }}
            />
          </div>
          <div className="flex justify-between font-terminal text-xs text-primary/60">
            <span className={glitchActive ? "glitch-text" : ""}>LOADING SYSTEMS...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Glitch tear line */}
        <div
          className="mt-6 h-[2px] bg-primary opacity-40"
          style={{
            clipPath:
              "polygon(0 0, 15% 0, 17% 100%, 35% 100%, 37% 0, 60% 0, 62% 100%, 80% 100%, 82% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>
    </div>
  );
};

export default BootScreen;