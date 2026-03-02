import { useState, useEffect, useRef, useCallback } from "react";
import PanelWrapper from "./PanelWrapper";
import profileImg from "@/assets/profile.png";

type FaceState = "neutral" | "asking" | "waiting" | "annoyed" | "happy";

const faceExpressions: Record<FaceState, string> = {
  neutral: "( ◉_◉ )",
  asking: "( ◉‿◉ )",
  waiting: "( ◉_◉ )?",
  annoyed: "( ◉︵◉ )!",
  happy: "( ◉◡◉ )♥",
};

const BioPanel = () => {
  const [activated, setActivated] = useState(false);
  const [faceState, setFaceState] = useState<FaceState>("neutral");
  const [answered, setAnswered] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [scrollLocked, setScrollLocked] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileGlitch, setProfileGlitch] = useState(false);
  const [scrollAttempts, setScrollAttempts] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const dialogText: Record<FaceState, string> = {
    neutral: "",
    asking: "Hey Yashraj… how have you been?",
    waiting: "Wait. I asked you something.",
    annoyed: "Answer me first.",
    happy: "Good. Now you may proceed.",
  };

  const handleActivate = useCallback(() => {
    if (answered) return;
    if (!activated) {
      setActivated(true);
      setFaceState("asking");
      setScrollLocked(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [activated, answered]);

  // Scroll lock logic
  useEffect(() => {
    if (!scrollLocked) return;
    const handleScroll = (e: WheelEvent) => {
      if (!answered) {
        e.preventDefault();
        setScrollAttempts((prev) => {
          const next = prev + 1;
          if (next >= 3 && faceState === "asking") {
            setFaceState("waiting");
          }
          if (next >= 6 && faceState !== "annoyed") {
            setFaceState("annoyed");
          }
          return next;
        });
        // Magnetic pull effect
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [scrollLocked, answered, faceState]);

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    setFaceState("happy");
    setAnswered(true);
    setTimeout(() => {
      setScrollLocked(false);
    }, 1500);
  };

  const handleProfileHover = () => {
    setShowProfile(true);
    setProfileGlitch(true);
    setTimeout(() => setProfileGlitch(false), 300);
  };

  return (
    <div ref={panelRef}>
      <PanelWrapper title="BIO" icon={<span>🧠</span>}>
        <div
          className="relative min-h-[200px] interactive"
          onClick={handleActivate}
        >
          {/* Bio content */}
          <div className="space-y-2 font-terminal text-sm">
            <div>
              <span className="text-muted-foreground">NAME: </span>
              <span
                className="text-primary font-bold glitch-hover inline-block interactive"
                onMouseEnter={handleProfileHover}
                onMouseLeave={() => setShowProfile(false)}
              >
                YASHRAJ YADAV
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">ALIAS: </span>
              <span className="text-foreground">YASFTW</span>
            </div>
            <div>
              <span className="text-muted-foreground">CLASSIFICATION: </span>
              <span className="text-foreground">SYSTEMS ARCHITECT (IN TRAINING)</span>
            </div>
            <div>
              <span className="text-muted-foreground">LOCATION: </span>
              <span className="text-foreground">CHANDIGARH UNIVERSITY</span>
            </div>
          </div>

          {/* Profile picture with connection line */}
          {showProfile && (
            <div className="absolute top-0 right-0 flicker-in z-20">
              {/* Connection line */}
              <div className="absolute -left-16 top-12 w-16 h-[2px] overflow-hidden">
                <div className="w-full h-full bg-primary connection-line" />
                <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-primary status-dot" style={{ animationDuration: "0.8s" }} />
              </div>
              <div className="border-2 border-primary bg-card p-1 panel-glow">
                <div className="bg-accent px-2 py-0.5 border-b border-border mb-1">
                  <span className="font-pixel text-[8px] text-primary tracking-wider">ENTITY.IMG</span>
                </div>
                <img
                  src={profileImg}
                  alt="Yashraj Yadav"
                  className={`w-24 h-24 object-cover ${profileGlitch ? "rgb-glitch" : ""}`}
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          )}

          {/* Character face and interaction */}
          {activated && (
            <div className="mt-4 border-t border-border pt-4 flicker-in">
              {/* Face */}
              <div className={`text-center mb-3 transition-all duration-300 ${faceState === "annoyed" ? "text-primary animate-pulse" : ""}`}>
                <div className="font-terminal text-3xl text-primary creature-idle">
                  {faceExpressions[faceState]}
                </div>
              </div>

              {/* Speech bubble */}
              {dialogText[faceState] && (
                <div className="relative border border-border bg-accent p-3 mb-3 mx-4">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent border-l border-t border-border rotate-45" />
                  <p className="font-terminal text-sm text-foreground text-center">
                    "{dialogText[faceState]}"
                  </p>
                </div>
              )}

              {/* Input field */}
              {!answered && (
                <div className="flex gap-2 mx-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Type your response..."
                    className="flex-1 bg-background border border-border px-3 py-1.5 font-terminal text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={handleSubmit}
                    className="interactive border border-primary bg-accent px-4 py-1.5 font-pixel text-[8px] text-primary hover:bg-primary hover:text-primary-foreground tracking-wider transition-colors"
                  >
                    SUBMIT
                  </button>
                </div>
              )}

              {/* Happy state - glow effect */}
              {answered && faceState === "happy" && (
                <div className="text-center font-terminal text-xs text-muted-foreground mt-2">
                  ▸ SCROLL UNLOCKED
                </div>
              )}
            </div>
          )}

          {/* Click hint */}
          {!activated && !answered && (
            <div className="mt-4 text-center font-pixel text-[8px] text-muted-foreground tracking-wider animate-pulse">
              [ CLICK TO INTERACT ]
            </div>
          )}
        </div>
      </PanelWrapper>
    </div>
  );
};

export default BioPanel;
