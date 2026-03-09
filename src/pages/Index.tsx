import { useEffect, useState } from "react";
import BootScreen from "@/components/BootScreen";
import CRTOverlay from "@/components/CRTOverlay";
import PanelWrapper from "@/components/PanelWrapper";
import ProjectArchive from "@/components/ProjectArchive";
import SkillMatrix from "@/components/SkillMatrix";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import ContactPanel from "@/components/ContactPanel";
import ExternalLinkDialog from "@/components/ExternalLinkDialog";
import MusicPlayer from "@/components/MusicPlayer";
import ScrollReveal from "@/components/ScrollReveal";
import BioPanel from "@/components/BioPanel";
import GreetIcon from "@/components/GreetIcon";
import CrimsonTerminal from "@/components/CrimsonTerminal";
import ThemeToggle from "@/components/ThemeToggle";
import Cubes from "@/components/Cubes";

const systemStatuses = [
  { name: "CLOUD COMPUTING", status: "ACTIVE" },
  { name: "SAP ERP", status: "OPERATIONAL" },
  { name: "AI / ML", status: "LEARNING" },
  { name: "PYTHON", status: "ACTIVE" },
  { name: "CREATIVE DESIGN", status: "ONLINE" },
];

const activeStatuses = ["ACTIVE", "OPERATIONAL", "ONLINE"];

type Phase = "boot" | "dashboard";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("boot");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("crimson-theme");
    const dark = !stored || stored === "dark";
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Random screen glitch (35-60s)
  useEffect(() => {
    if (phase !== "dashboard") return;
    const triggerGlitch = () => {
      const el = document.getElementById("main-dashboard");
      if (el) {
        el.classList.add("screen-glitch");
        setTimeout(() => el.classList.remove("screen-glitch"), 100);
      }
      const next = 35000 + Math.random() * 25000;
      setTimeout(triggerGlitch, next);
    };
    const timeout = setTimeout(triggerGlitch, 35000);
    return () => clearTimeout(timeout);
  }, [phase]);

  if (phase === "boot") {
    return <BootScreen onComplete={() => setPhase("dashboard")} />;
  }

  // Theme-aware cube colors
  const cubeFaceColor = isDark ? "rgba(6, 0, 16, 0.9)" : "rgba(199, 241, 255, 0.85)";
  const cubeBorderStyle = "1px solid rgba(63, 215, 255, 0.2)";

  return (
    <div className="min-h-screen w-full bg-background crt-flicker crt-screen relative">
      {/* Cubes Background */}
      <div className="cubes-background">
        <Cubes
          gridSize={12}
          maxAngle={30}
          radius={3}
          duration={{ enter: 0.3, leave: 0.6 }}
          borderStyle={cubeBorderStyle}
          faceColor={cubeFaceColor}
          rippleColor="#3fd7ff"
          rippleSpeed={2}
          autoAnimate={true}
          rippleOnClick={true}
        />
      </div>

      <CRTOverlay />

      {/* Top bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <ThemeToggle />
        <MusicPlayer />
      </div>

      <div className="fixed inset-0 bg-radial-glow pointer-events-none z-[1]" />

      <div id="main-dashboard" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 space-y-8 pt-20">

        {/* GREET ICON - always optional */}
        <GreetIcon />

        {/* STATUS STRIP */}
        <ScrollReveal>
          <div className="border-2 border-border bg-accent/80 px-4 py-2 flex items-center justify-between panel-glow backdrop-blur-sm">
            <span className="font-pixel text-[10px] tracking-wider text-primary">CYBER ARCHIVE v6.0</span>
            <div className="flex items-center gap-4">
              <span className="font-terminal text-xs text-muted-foreground">
                SIGNAL: <span className="text-primary status-dot inline-block">●</span> STABLE
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* BIO */}
        <ScrollReveal delay={100}>
          <div id="bio-section">
            <BioPanel />
          </div>
        </ScrollReveal>

        {/* SYSTEM STATUS */}
        <ScrollReveal delay={150}>
          <PanelWrapper title="SYSTEM STATUS">
            <div className="space-y-3">
              {systemStatuses.map((item, i) => (
                <div
                  key={item.name}
                  className="stagger-item flex items-center justify-between border border-border bg-background/80 px-4 py-3 hover-shimmer backdrop-blur-sm transition-all duration-300"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="font-terminal text-sm text-foreground">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-terminal text-xs ${
                        activeStatuses.includes(item.status) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.status}
                    </span>
                    {activeStatuses.includes(item.status) && (
                      <span className="inline-block w-2 h-2 rounded-full bg-primary status-dot" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </PanelWrapper>
        </ScrollReveal>

        {/* PROJECT ARCHIVE */}
        <ScrollReveal delay={150}>
          <div id="projects-section">
            <ProjectArchive />
          </div>
        </ScrollReveal>

        {/* CAPABILITY MATRIX */}
        <ScrollReveal delay={150}>
          <CapabilityMatrix />
        </ScrollReveal>

        {/* SKILL DIAGNOSTICS */}
        <ScrollReveal delay={150}>
          <div id="skills-section">
            <SkillMatrix />
          </div>
        </ScrollReveal>

        {/* CONTACT ME */}
        <ScrollReveal delay={150}>
          <div id="contact-section">
            <ContactPanel />
          </div>
        </ScrollReveal>

        {/* TERMINAL */}
        <ScrollReveal delay={150}>
          <CrimsonTerminal />
        </ScrollReveal>

        {/* TRANSMISSION TERMINAL */}
        <ScrollReveal delay={150}>
          <div id="transmission-section">
            <PanelWrapper title="TRANSMISSION TERMINAL">
              <div className="font-terminal text-sm space-y-3">
                <div className="text-muted-foreground">▸ OUTBOUND CHANNELS:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ExternalLinkDialog href="https://github.com/Yashhftw">
                    <div className="border border-border bg-background/80 p-4 hover:border-primary hover:bg-accent transition-all duration-300 text-center group hover-shimmer backdrop-blur-sm">
                      <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">GITHUB</div>
                      <div className="text-xs text-foreground mt-1">SOURCE REPOSITORY</div>
                    </div>
                  </ExternalLinkDialog>
                  <ExternalLinkDialog href="https:/www.linkedin.com/in/yashrajyadav20055/w">
                    <div className="border border-border bg-background/80 p-4 hover:border-primary hover:bg-accent transition-all duration-300 text-center group hover-shimmer backdrop-blur-sm">
                      <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">LINKEDIN</div>
                      <div className="text-xs text-foreground mt-1">PROFESSIONAL NETWORK</div>
                    </div>
                  </ExternalLinkDialog>
                  <ExternalLinkDialog href="#">
                    <div className="border border-border bg-background/80 p-4 hover:border-primary hover:bg-accent transition-all duration-300 text-center group hover-shimmer backdrop-blur-sm">
                      <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">RESUME</div>
                      <div className="text-xs text-foreground mt-1">ENCRYPTED DOSSIER</div>
                    </div>
                  </ExternalLinkDialog>
                </div>
                <div className="mt-4 text-xs text-muted-foreground border-t border-border pt-4">
                  <span className="blink-cursor">AWAITING TRANSMISSION INPUT</span>
                </div>
              </div>
            </PanelWrapper>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <div className="text-center py-6 font-terminal text-xs text-muted-foreground border-t border-border">
          CYBER ARCHIVE © 2026 — Yashftw — ALL SYSTEMS MONITORED
        </div>
      </div>
    </div>
  );
};

export default Index;