import { useState, useEffect } from "react";

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const bootLines = [
    "INITIALIZING CRIMSON TERMINAL v3.7.1...",
    "LOADING KERNEL MODULES...",
    "MOUNTING /dev/viper0...",
    "",
    "BOOTING CRIMSON TERMINAL",
    "ENTITY: YASFTW",
    "SIGNAL: UNSTABLE",
    "STATUS: ONLINE",
    "",
    "SYSTEM INTEGRITY CHECK... OK",
    "DECRYPTING ARCHIVE HEADERS...",
    "ESTABLISHING SECURE CHANNEL...",
    "",
    "▸ ALL SYSTEMS NOMINAL",
    "▸ ENTERING DASHBOARD...",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
        setTimeout(() => onComplete(), 1200);
      }
    }, 220);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-background flex items-center justify-center transition-opacity duration-500 ${
        done ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="crt-overlay" />
      <div className="max-w-lg w-full px-6">
        <div className="border-2 border-border p-6 bg-card">
          <div className="mb-4 text-primary font-pixel text-xs tracking-wider">
            ◤ CRIMSON TERMINAL ◥
          </div>
          <div className="space-y-1 font-terminal text-lg">
            {lines.map((line, idx) => (
              <div
                key={idx}
                className={`text-foreground ${
                  line.startsWith("ENTITY") || line.startsWith("STATUS")
                    ? "text-primary font-bold"
                    : ""
                } ${line.startsWith("▸") ? "text-crimson-glow" : ""}`}
              >
                {line || "\u00A0"}
              </div>
            ))}
            {!done && (
              <span className="blink-cursor text-primary font-terminal text-lg" />
            )}
          </div>
        </div>
        {/* Glitch tear line */}
        <div className="mt-4 h-[2px] bg-primary opacity-30" style={{ 
          clipPath: "polygon(0 0, 15% 0, 17% 100%, 35% 100%, 37% 0, 60% 0, 62% 100%, 80% 100%, 82% 0, 100% 0, 100% 100%, 0 100%)" 
        }} />
      </div>
    </div>
  );
};

export default BootScreen;
