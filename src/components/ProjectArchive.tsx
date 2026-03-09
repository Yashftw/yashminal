import { useState } from "react";
import PanelWrapper from "./PanelWrapper";
import { playOpenSound, playCloseSound } from "@/lib/sounds";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  techStack: string[];
  details: string;
}

const projects: Project[] = [
  {
    id: "PROTOCOL_01",
    name: "AI-BASED RECOMMENDATION SYSTEM",
    status: "STABLE",
    techStack: ["Python", "TensorFlow", "Spark Streaming", "Cassandra"],
    description: "Intelligent recommendation engine leveraging collaborative filtering and deep learning models for real-time content suggestion.",
    details: "Architecture: Microservices-based pipeline with Spark Streaming for real-time data ingestion, TensorFlow for model inference, and Cassandra for high-throughput storage. Deployed on AWS with auto-scaling inference endpoints.",
  },
  {
    id: "PROTOCOL_02",
    name: "GITHUB AUTOMATION TOOL",
    status: "OPERATIONAL",
    techStack: ["Node.js", "GitHub API", "Docker", "Kubernetes"],
    description: "Automated CI/CD pipeline management and repository analytics tool for GitHub organizations.",
    details: "Architecture: Event-driven system using GitHub webhooks, containerized workers orchestrated via Kubernetes. Handles automated PR reviews, deployment triggers, and repository health monitoring.",
  },
  {
    id: "PROTOCOL_03",
    name: "CHROME EXTENSION — RELAX MODE",
    status: "TESTING",
    techStack: ["JavaScript", "Chrome APIs", "CSS3"],
    description: "Browser extension that transforms web browsing into a calming experience with ambient backgrounds and focus timers.",
    details: "Architecture: Manifest V3 Chrome extension with content scripts for DOM manipulation, background service workers for timer logic, and popup UI for settings management.",
  },
  {
    id: "PROTOCOL_04",
    name: "IOT COLD CHAIN MONITORING",
    status: "DEPLOYED",
    techStack: ["AWS IoT", "MQTT", "Edge Computing", "Python"],
    description: "Real-time temperature and humidity monitoring system for pharmaceutical cold chain logistics.",
    details: "Architecture: Edge devices running lightweight Python agents publishing via MQTT to AWS IoT Core. Real-time dashboards with alerting thresholds, federated learning for predictive maintenance.",
  },
];

const statusColor: Record<string, string> = {
  STABLE: "text-crimson-glow",
  OPERATIONAL: "text-primary",
  TESTING: "text-muted-foreground",
  DEPLOYED: "text-crimson-glow",
};

const ProjectArchive = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <PanelWrapper title="PROJECT ARCHIVE">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => { playOpenSound(); setSelected(project); }}
              className="interactive text-left border border-border bg-background p-3 hover:border-primary hover:bg-accent transition-all duration-200 group"
            >
              <div className="font-pixel text-[9px] text-muted-foreground mb-1 tracking-wider">
                [ {project.id} ]
              </div>
              <div className="font-terminal text-sm text-foreground group-hover:text-primary transition-colors">
                {project.name}
              </div>
              <div className="font-terminal text-xs mt-1">
                STATUS: <span className={statusColor[project.status] || "text-foreground"}>{project.status}</span>
              </div>
            </button>
          ))}
        </div>
      </PanelWrapper>

      {/* Popup modal */}
      {selected && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80">
          <div className="flicker-in border-2 border-border bg-card max-w-lg w-full mx-4 panel-glow">
            <div className="absolute inset-[3px] border border-border/30 pointer-events-none" />

            <div className="bg-accent border-b-2 border-border px-4 py-2 flex items-center justify-between">
              <span className="font-pixel text-[10px] text-primary tracking-wider">
                {selected.id} — DETAILS
              </span>
              <button
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-primary text-sm interactive"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <div className="font-pixel text-[9px] text-muted-foreground tracking-wider mb-1">PROJECT NAME</div>
                <div className="font-terminal text-lg text-primary">{selected.name}</div>
              </div>
              <div>
                <div className="font-pixel text-[9px] text-muted-foreground tracking-wider mb-1">DESCRIPTION</div>
                <div className="font-terminal text-sm text-foreground">{selected.description}</div>
              </div>
              <div>
                <div className="font-pixel text-[9px] text-muted-foreground tracking-wider mb-1">TECH STACK</div>
                <div className="flex flex-wrap gap-2">
                  {selected.techStack.map((tech) => (
                    <span key={tech} className="border border-border bg-accent px-2 py-0.5 font-terminal text-xs text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-pixel text-[9px] text-muted-foreground tracking-wider mb-1">ARCHITECTURE</div>
                <div className="font-terminal text-sm text-muted-foreground">{selected.details}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectArchive;
