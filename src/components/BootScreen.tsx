import { useState, useEffect } from "react";

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const bootLines = [
    "BOOTING CRIMSON ARCHIVE...",
    "",
    "ENTITY: YASFTW",
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

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const currentLine = bootLines[i];
        setLines((prev) => [...prev, currentLine]);
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
      className={`fixed inset-0 z-[10000] bg-black flex items-center justify-center transition-opacity duration-500 ${
        done ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Scanline overlay */}
      <div className="crt-overlay" />
      
      <div className="max-w-lg w-full px-6">
        <div className="space-y-1 font-terminal text-lg">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.startsWith("ENTITY") || line.startsWith("STATUS") || line.startsWith("SIGNAL")
                  ? "text-primary font-bold"
                  : line.startsWith("▸")
                  ? "text-crimson-glow"
                  : "text-primary/80"
              }`}
            >
              {line || "\u00A0"}
            </div>
          ))}
          {!done && (
            <span className="blink-cursor text-primary font-terminal text-lg" />
          )}
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
