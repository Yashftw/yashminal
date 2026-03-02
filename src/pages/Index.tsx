import { useEffect, useState, useCallback } from "react";
import BootScreen from "@/components/BootScreen";
import CRTOverlay from "@/components/CRTOverlay";
import PanelWrapper from "@/components/PanelWrapper";
import ProjectArchive from "@/components/ProjectArchive";
import SkillMatrix from "@/components/SkillMatrix";
import ExternalLinkDialog from "@/components/ExternalLinkDialog";
import ThemeToggle from "@/components/ThemeToggle";
import MusicPlayer from "@/components/MusicPlayer";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollReveal from "@/components/ScrollReveal";
import profileImg from "@/assets/profile.png";

const systemStatuses = [
  { name: "EDGE COMPUTING", status: "ACTIVE" },
  { name: "FEDERATED LEARNING", status: "LEARNING" },
  { name: "KUBERNETES", status: "DEPLOYING" },
  { name: "DOCKER", status: "CONTAINERIZED" },
  { name: "AWS IOT", status: "CONNECTED" },
];

const activeStatuses = ["ACTIVE", "CONNECTED", "CONTAINERIZED"];

const techSkills = [
  "PYTHON", "JAVA", "JAVASCRIPT", "SQL", "DOCKER",
  "KUBERNETES", "SPARK STREAMING", "MQTT", "CASSANDRA", "AWS"
];

const Index = () => {
  const [booted, setBooted] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileGlitch, setProfileGlitch] = useState(false);

  // Random screen glitch
  useEffect(() => {
    if (!booted) return;
    const triggerGlitch = () => {
      const el = document.getElementById("main-dashboard");
      if (el) {
        el.classList.add("screen-glitch");
        setTimeout(() => el.classList.remove("screen-glitch"), 150);
      }
      const next = 20000 + Math.random() * 20000;
      setTimeout(triggerGlitch, next);
    };
    const timeout = setTimeout(triggerGlitch, 15000);
    return () => clearTimeout(timeout);
  }, [booted]);

  const handleNameHover = useCallback(() => {
    setShowProfile(true);
    setProfileGlitch(true);
    setTimeout(() => setProfileGlitch(false), 400);
  }, []);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen bg-background crt-flicker relative">
      <BackgroundParticles />
      <CRTOverlay />

      {/* Fixed top-right controls */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <MusicPlayer />
        <ThemeToggle />
      </div>

      <div className="fixed inset-0 bg-radial-glow bg-parchment pointer-events-none z-0" />

      <div id="main-dashboard" className="relative z-10 max-w-6xl mx-auto px-3 py-4 space-y-3 pt-16">
        {/* BOOT STATUS STRIP */}
        <ScrollReveal>
          <div className="border-2 border-border bg-accent px-4 py-2 flex items-center justify-between panel-glow hover-shimmer">
            <div className="flex items-center gap-3">
              <span className="text-primary font-pixel text-[10px] tracking-wider">◤ CRIMSON ARCHIVE v4.0</span>
              <span className="text-muted-foreground font-terminal text-sm">|</span>
              <span className="font-terminal text-sm text-foreground">SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-terminal text-xs text-muted-foreground hidden sm:inline">
                SIGNAL: <span className="text-primary status-dot inline-block">●</span> UNSTABLE
              </span>
              <div className="flex gap-2">
                <ExternalLinkDialog href="https://github.com/yasftw">
                  <span className="font-terminal text-xs hover:text-primary">[GITHUB]</span>
                </ExternalLinkDialog>
                <ExternalLinkDialog href="https://linkedin.com/in/yasftw">
                  <span className="font-terminal text-xs hover:text-primary">[LINKEDIN]</span>
                </ExternalLinkDialog>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ROW 1: ENTITY + SYSTEM STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ScrollReveal delay={100}>
            <PanelWrapper title="ENTITY CORE" icon={<span>⚔</span>}>
              <div className="relative">
                <div className="space-y-2 font-terminal text-sm">
                  <div>
                    <span className="text-muted-foreground">NAME: </span>
                    <span
                      className="text-primary font-bold glitch-hover inline-block interactive"
                      onMouseEnter={handleNameHover}
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

                {showProfile && (
                  <div className="absolute top-0 right-0 flicker-in z-20">
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
              </div>
            </PanelWrapper>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <PanelWrapper title="SYSTEM STATUS" icon={<span>🧠</span>}>
              <div className="space-y-3">
                {systemStatuses.map((item, i) => (
                  <div
                    key={item.name}
                    className="stagger-item flex items-center justify-between border border-border bg-background px-3 py-2 hover-shimmer"
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
        </div>

        {/* ROW 2: PROJECTS + CAPABILITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ScrollReveal delay={100}>
            <ProjectArchive />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <PanelWrapper title="CAPABILITY MATRIX" icon={<span>📊</span>}>
              <div className="space-y-3 font-terminal text-sm">
                <div className="border border-border bg-background p-3 hover-shimmer">
                  <div className="text-muted-foreground text-xs font-pixel tracking-wider mb-1">PRIMARY FOCUS</div>
                  <div className="text-foreground">DISTRIBUTED SYSTEMS & EDGE ARCHITECTURE</div>
                </div>
                <div className="border border-border bg-background p-3 hover-shimmer">
                  <div className="text-muted-foreground text-xs font-pixel tracking-wider mb-1">CURRENT OBJECTIVE</div>
                  <div className="text-foreground">MASTERING KUBERNETES ORCHESTRATION & FEDERATED LEARNING PIPELINES</div>
                </div>
                <div className="border border-border bg-background p-3 hover-shimmer">
                  <div className="text-muted-foreground text-xs font-pixel tracking-wider mb-1">3-MONTH TARGET</div>
                  <div className="text-primary">FULL-STACK SYSTEMS PROFICIENCY — ALL DOMAINS ≥ 80%</div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {["MQTT", "CASSANDRA", "SPARK"].map((tech) => (
                    <div key={tech} className="border border-border bg-accent text-center py-1.5 hover-shimmer">
                      <span className="font-pixel text-[8px] text-foreground tracking-wider">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PanelWrapper>
          </ScrollReveal>
        </div>

        {/* ROW 3: SKILLS + PHILOSOPHY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ScrollReveal delay={100}>
            <SkillMatrix />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <PanelWrapper title="PERSONAL PHILOSOPHY" icon={<span>🔮</span>}>
              <div className="flex gap-2 mb-3">
                {["♥", "♥", "♥", "◆", "◆"].map((icon, i) => (
                  <span key={i} className="text-xs text-muted-foreground">{icon}</span>
                ))}
              </div>
              <blockquote className="font-terminal text-base text-foreground leading-relaxed border-l-2 border-primary pl-4">
                "A SYSTEM FILLED WITH PRETENDERS
                <br />
                IS STILL EMPTY IN THE EYES OF ARCHITECTURE."
              </blockquote>
              <div className="mt-4 font-terminal text-xs text-muted-foreground">
                — CRIMSON DOCTRINE, VERSE 7
              </div>
              <div className="mt-4 border-t border-border pt-3">
                <div className="text-muted-foreground text-xs font-pixel tracking-wider mb-2">SKILL DIAGNOSTICS</div>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((tech, i) => (
                    <span
                      key={tech}
                      className="stagger-item border border-border bg-background px-2 py-1 font-terminal text-xs text-foreground hover-shimmer"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </PanelWrapper>
          </ScrollReveal>
        </div>

        {/* ROW 4: TRANSMISSION TERMINAL */}
        <ScrollReveal delay={100}>
          <PanelWrapper title="TRANSMISSION TERMINAL" icon={<span>📡</span>}>
            <div className="font-terminal text-sm space-y-2">
              <div className="text-muted-foreground">
                ▸ OUTBOUND CHANNELS:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <ExternalLinkDialog href="https://github.com/yasftw">
                  <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group hover-shimmer">
                    <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">
                      GITHUB
                    </div>
                    <div className="text-xs text-foreground mt-1">SOURCE REPOSITORY</div>
                  </div>
                </ExternalLinkDialog>
                <ExternalLinkDialog href="https://linkedin.com/in/yasftw">
                  <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group hover-shimmer">
                    <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">
                      LINKEDIN
                    </div>
                    <div className="text-xs text-foreground mt-1">PROFESSIONAL NETWORK</div>
                  </div>
                </ExternalLinkDialog>
                <ExternalLinkDialog href="#">
                  <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group hover-shimmer">
                    <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">
                      RESUME
                    </div>
                    <div className="text-xs text-foreground mt-1">ENCRYPTED DOSSIER</div>
                  </div>
                </ExternalLinkDialog>
              </div>
              <div className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
                <span className="blink-cursor">AWAITING TRANSMISSION INPUT</span>
              </div>
            </div>
          </PanelWrapper>
        </ScrollReveal>

        {/* Footer */}
        <div className="text-center py-3 font-terminal text-xs text-muted-foreground border-t border-border">
          CRIMSON ARCHIVE © 2026 — YASFTW — ALL SYSTEMS MONITORED
        </div>
      </div>
    </div>
  );
};

export default Index;
