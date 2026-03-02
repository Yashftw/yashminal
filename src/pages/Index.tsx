import { useEffect, useState, useCallback } from "react";
import VideoIntro from "@/components/VideoIntro";
import BootScreen from "@/components/BootScreen";
import CRTOverlay from "@/components/CRTOverlay";
import PanelWrapper from "@/components/PanelWrapper";
import ProjectArchive from "@/components/ProjectArchive";
import SkillMatrix from "@/components/SkillMatrix";
import ExternalLinkDialog from "@/components/ExternalLinkDialog";
import MusicPlayer from "@/components/MusicPlayer";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollReveal from "@/components/ScrollReveal";
import BioPanel from "@/components/BioPanel";

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

type Phase = "video" | "boot" | "dashboard";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("video");

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Random screen glitch
  useEffect(() => {
    if (phase !== "dashboard") return;
    const triggerGlitch = () => {
      const el = document.getElementById("main-dashboard");
      if (el) {
        el.classList.add("screen-glitch");
        setTimeout(() => el.classList.remove("screen-glitch"), 150);
      }
      const next = 25000 + Math.random() * 15000;
      setTimeout(triggerGlitch, next);
    };
    const timeout = setTimeout(triggerGlitch, 15000);
    return () => clearTimeout(timeout);
  }, [phase]);

  if (phase === "video") {
    return <VideoIntro onComplete={() => setPhase("boot")} />;
  }

  if (phase === "boot") {
    return <BootScreen onComplete={() => setPhase("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-background crt-flicker crt-screen relative">
      <BackgroundParticles />
      <CRTOverlay />

      {/* Music player */}
      <div className="fixed top-4 right-4 z-50">
        <MusicPlayer />
      </div>

      <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0" />

      <div id="main-dashboard" className="relative z-10 max-w-4xl mx-auto px-4 py-6 space-y-4 pt-20">

        {/* STATUS STRIP */}
        <ScrollReveal>
          <div className="border-2 border-border bg-accent px-4 py-2 flex items-center justify-between panel-glow">
            <span className="font-pixel text-[10px] tracking-wider text-primary">CRIMSON ARCHIVE v5.0</span>
            <div className="flex items-center gap-4">
              <span className="font-terminal text-xs text-muted-foreground">
                SIGNAL: <span className="text-primary status-dot inline-block">●</span> UNSTABLE
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* BIO */}
        <ScrollReveal delay={100}>
          <BioPanel />
        </ScrollReveal>

        {/* SYSTEM STATUS */}
        <ScrollReveal delay={150}>
          <PanelWrapper title="SYSTEM STATUS">
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

        {/* PROJECT ARCHIVE */}
        <ScrollReveal delay={150}>
          <ProjectArchive />
        </ScrollReveal>

        {/* CAPABILITY MATRIX */}
        <ScrollReveal delay={150}>
          <PanelWrapper title="CAPABILITY MATRIX">
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
            </div>
          </PanelWrapper>
        </ScrollReveal>

        {/* SKILL DIAGNOSTICS */}
        <ScrollReveal delay={150}>
          <SkillMatrix />
        </ScrollReveal>

        {/* TRANSMISSION TERMINAL */}
        <ScrollReveal delay={150}>
          <PanelWrapper title="TRANSMISSION TERMINAL">
            <div className="font-terminal text-sm space-y-2">
              <div className="text-muted-foreground">▸ OUTBOUND CHANNELS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <ExternalLinkDialog href="https://github.com/yasftw">
                  <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group hover-shimmer">
                    <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">GITHUB</div>
                    <div className="text-xs text-foreground mt-1">SOURCE REPOSITORY</div>
                  </div>
                </ExternalLinkDialog>
                <ExternalLinkDialog href="https://linkedin.com/in/yasftw">
                  <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group hover-shimmer">
                    <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">LINKEDIN</div>
                    <div className="text-xs text-foreground mt-1">PROFESSIONAL NETWORK</div>
                  </div>
                </ExternalLinkDialog>
                <ExternalLinkDialog href="#">
                  <div className="border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all text-center group hover-shimmer">
                    <div className="font-pixel text-[10px] text-muted-foreground group-hover:text-primary tracking-wider">RESUME</div>
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
        <div className="text-center py-4 font-terminal text-xs text-muted-foreground border-t border-border">
          CRIMSON ARCHIVE © 2026 — YASFTW — ALL SYSTEMS MONITORED
        </div>
      </div>
    </div>
  );
};

export default Index;
