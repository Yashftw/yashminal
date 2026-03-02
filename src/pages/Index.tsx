import { useEffect, useState, useCallback } from "react";
import BootScreen from "@/components/BootScreen";
import CRTOverlay from "@/components/CRTOverlay";
import PanelWrapper from "@/components/PanelWrapper";
import ProjectArchive from "@/components/ProjectArchive";
import SkillMatrix from "@/components/SkillMatrix";
import ExternalLinkDialog from "@/components/ExternalLinkDialog";
import profileImg from "@/assets/profile.png";

const systemStatuses = [
  { name: "EDGE COMPUTING", status: "ACTIVE" },
  { name: "FEDERATED LEARNING", status: "LEARNING" },
  { name: "KUBERNETES", status: "DEPLOYING" },
  { name: "DOCKER", status: "CONTAINERIZED" },
  { name: "AWS IOT", status: "CONNECTED" },
];

const activeStatuses = ["ACTIVE", "CONNECTED", "CONTAINERIZED"];

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
      const next = 15000 + Math.random() * 15000;
      setTimeout(triggerGlitch, next);
    };
    const timeout = setTimeout(triggerGlitch, 10000);
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
    <div className="min-h-screen bg-background crt-flicker">
      <CRTOverlay />

      <div id="main-dashboard" className="max-w-6xl mx-auto px-3 py-4 space-y-3">
        {/* BOOT STATUS STRIP */}
        <div className="border-2 border-border bg-accent px-4 py-2 flex items-center justify-between panel-glow">
          <div className="flex items-center gap-3">
            <span className="text-primary font-pixel text-[10px] tracking-wider">◤ CRIMSON TERMINAL v3.7.1</span>
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

        {/* ROW 2: ENTITY + QUOTE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* ENTITY CORE */}
          <PanelWrapper title="ENTITY PROFILE">
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

              {/* Profile image popup */}
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

          {/* QUOTE PANEL */}
          <PanelWrapper title="VIPERINE TRUTH">
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
          </PanelWrapper>
        </div>

        {/* ROW 3: PROJECTS + SYSTEM STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-3">
            <ProjectArchive />
          </div>
          <div className="md:col-span-2">
            <PanelWrapper title="SYSTEM STATUS">
              <div className="space-y-3">
                {systemStatuses.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between border border-border bg-background px-3 py-2"
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
          </div>
        </div>

        {/* ROW 4: SKILLS + CAPABILITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SkillMatrix />
          <PanelWrapper title="CAPABILITY DIAGNOSTIC">
            <div className="space-y-3 font-terminal text-sm">
              <div className="border border-border bg-background p-3">
                <div className="text-muted-foreground text-xs font-pixel tracking-wider mb-1">PRIMARY FOCUS</div>
                <div className="text-foreground">DISTRIBUTED SYSTEMS & EDGE ARCHITECTURE</div>
              </div>
              <div className="border border-border bg-background p-3">
                <div className="text-muted-foreground text-xs font-pixel tracking-wider mb-1">CURRENT OBJECTIVE</div>
                <div className="text-foreground">MASTERING KUBERNETES ORCHESTRATION & FEDERATED LEARNING PIPELINES</div>
              </div>
              <div className="border border-border bg-background p-3">
                <div className="text-muted-foreground text-xs font-pixel tracking-wider mb-1">3-MONTH TARGET</div>
                <div className="text-primary">FULL-STACK SYSTEMS PROFICIENCY — ALL DOMAINS ≥ 80%</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {["MQTT", "CASSANDRA", "SPARK"].map((tech) => (
                  <div key={tech} className="border border-border bg-accent text-center py-1.5">
                    <span className="font-pixel text-[8px] text-foreground tracking-wider">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </PanelWrapper>
        </div>

        {/* ROW 5: TRANSMISSION TERMINAL */}
        <PanelWrapper title="TRANSMISSION TERMINAL">
          <div className="font-terminal text-sm space-y-2">
            <div className="text-muted-foreground">
              ▸ OUTBOUND CHANNELS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ExternalLinkDialog href="https://github.com/yasftw">
                <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group">
                  <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">
                    GITHUB
                  </div>
                  <div className="text-xs text-foreground mt-1">SOURCE REPOSITORY</div>
                </div>
              </ExternalLinkDialog>
              <ExternalLinkDialog href="https://linkedin.com/in/yasftw">
                <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group">
                  <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">
                    LINKEDIN
                  </div>
                  <div className="text-xs text-foreground mt-1">PROFESSIONAL NETWORK</div>
                </div>
              </ExternalLinkDialog>
              <ExternalLinkDialog href="#">
                <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group">
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

        {/* Footer */}
        <div className="text-center py-3 font-terminal text-xs text-muted-foreground border-t border-border">
          CRIMSON TERMINAL © 2026 — YASFTW — ALL SYSTEMS MONITORED
        </div>
      </div>
    </div>
  );
};

export default Index;
