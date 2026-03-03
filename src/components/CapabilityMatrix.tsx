import { useState } from "react";
import PanelWrapper from "./PanelWrapper";

interface Capability {
  name: string;
  description: string;
  detail: string;
}

const capabilities: Capability[] = [
  {
    name: "DISTRIBUTED SYSTEMS & EDGE ARCHITECTURE",
    description: "PRIMARY FOCUS",
    detail: "Designing and deploying systems that process data at the edge, reducing latency and enabling real-time decision making across distributed nodes.",
  },
  {
    name: "KUBERNETES ORCHESTRATION & FEDERATED LEARNING",
    description: "CURRENT OBJECTIVE",
    detail: "Mastering container orchestration for scalable deployments and implementing federated learning pipelines for privacy-preserving machine learning across distributed datasets.",
  },
  {
    name: "FULL-STACK SYSTEMS PROFICIENCY — ALL DOMAINS ≥ 80%",
    description: "3-MONTH TARGET",
    detail: "Comprehensive skill development across cloud infrastructure, data engineering, edge computing, and DevOps to achieve cross-domain proficiency.",
  },
];

const CapabilityMatrix = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);

  const handleClick = (idx: number) => {
    if (expandedIdx === idx) {
      setExpandedIdx(null);
      return;
    }
    setLoadingIdx(idx);
    setTimeout(() => {
      setLoadingIdx(null);
      setExpandedIdx(idx);
    }, 1000);
  };

  return (
    <PanelWrapper title="CAPABILITY MATRIX">
      <div className="space-y-3 font-terminal text-sm">
        {capabilities.map((cap, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="interactive w-full text-left border border-border bg-background p-3 hover-shimmer transition-all duration-300"
          >
            <div className="text-muted-foreground text-xs font-pixel tracking-wider mb-1">
              {cap.description}
            </div>
            <div className={i === 2 ? "text-primary" : "text-foreground"}>
              {cap.name}
            </div>

            {/* Retro loading overlay */}
            {loadingIdx === i && (
              <div className="mt-3 border border-border bg-card p-2 flicker-in">
                <div className="font-pixel text-[8px] text-muted-foreground tracking-wider mb-1">
                  ACCESSING MODULE…
                </div>
                <div className="h-2 bg-background border border-border overflow-hidden">
                  <div className="h-full bg-primary retro-load-bar" />
                </div>
              </div>
            )}

            {/* Expanded content */}
            {expandedIdx === i && loadingIdx !== i && (
              <div className="mt-3 border-t border-border pt-3 flicker-in">
                <div className="font-pixel text-[8px] text-primary tracking-wider mb-1">
                  MODULE LOADED
                </div>
                <p className="text-muted-foreground text-xs">{cap.detail}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </PanelWrapper>
  );
};

export default CapabilityMatrix;
