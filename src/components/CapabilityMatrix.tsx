import { useState } from "react";
import PanelWrapper from "./PanelWrapper";
import { playOpenSound, playCloseSound } from "@/lib/sounds";

interface Capability {
  name: string;
  description: string;
  detail: string;
}

const capabilities: Capability[] = [
  {
    name: "CLOUD COMPUTING & MIGRATION",
    description: "PRIMARY FOCUS",
    detail: "Designing, deploying, and migrating enterprise systems to cloud infrastructure. Expertise in AWS, Azure, and hybrid cloud architectures with focus on scalability, security, and cost optimization.",
  },
  {
    name: "SAP ERP SYSTEMS",
    description: "ENTERPRISE EXPERTISE",
    detail: "Deep knowledge of SAP ERP modules including MM, SD, FICO, and PP. Experience in system configuration, customization, and integration with third-party platforms for streamlined business operations.",
  },
  {
    name: "AI / ML MODEL DEVELOPMENT",
    description: "CURRENT OBJECTIVE",
    detail: "Building and training machine learning models for predictive analytics, natural language processing, and computer vision. Proficient with TensorFlow, PyTorch, and scikit-learn pipelines.",
  },
  {
    name: "PYTHON PROGRAMMING",
    description: "CORE LANGUAGE",
    detail: "Advanced Python development for automation, data engineering, API development, and scripting. Experienced with Django, FastAPI, Pandas, and NumPy ecosystems.",
  },
  {
    name: "SKETCHING & CREATIVE DESIGN",
    description: "CREATIVE DOMAIN",
    detail: "Traditional and digital sketching for UI/UX concept design, storyboarding, and visual communication. Blending artistic vision with technical execution for creative problem solving.",
  },
];

const CapabilityMatrix = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);

  const handleClick = (idx: number) => {
    if (expandedIdx === idx) {
      playCloseSound();
      setExpandedIdx(null);
      return;
    }
    playOpenSound();
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
            <div className="text-foreground">
              {cap.name}
            </div>

            {loadingIdx === i && (
              <div className="mt-3 border border-border bg-card p-2 flicker-in">
                <div className="font-pixel text-[8px] text-muted-foreground tracking-wider mb-1">
                  ACCESSING MODULE…
                </div>
                <div className="h-2 bg-background border border-border overflow-hidden mb-1">
                  <div className="h-full bg-primary retro-load-bar" />
                </div>
                <div className="font-pixel text-[7px] text-primary tracking-wider">
                  LOADING SKILL DATA...
                </div>
              </div>
            )}

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
