import { useEffect, useRef, useState } from "react";
import PanelWrapper from "./PanelWrapper";

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: "PYTHON", level: 85 },
  { name: "CLOUD COMPUTING", level: 80 },
  { name: "SAP ERP", level: 75 },
  { name: "AI / ML", level: 70 },
  { name: "SKETCHING", level: 65 },
  { name: "SYSTEM DESIGN", level: 70 },
  { name: "DOCKER", level: 80 },
  { name: "DATA ENGINEERING", level: 72 },
];

const SkillBar = ({ skill, animate }: { skill: Skill; animate: boolean }) => {
  const filled = Math.round(skill.level / 10);
  const empty = 10 - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);

  return (
    <div className="flex items-center gap-3 font-terminal text-sm">
      <span className="w-40 text-foreground truncate">{skill.name}</span>
      <span
        className={`text-primary transition-all duration-1000 ${animate ? "opacity-100" : "opacity-0"}`}
        style={{ letterSpacing: "1px" }}
      >
        {bar}
      </span>
      <span className="text-muted-foreground w-10 text-right">{skill.level}%</span>
    </div>
  );
};

const SkillMatrix = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <PanelWrapper title="SKILL DIAGNOSTICS">
        <div className="space-y-2">
          {skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} animate={visible} />
          ))}
        </div>
        <div className="mt-4 border-t border-border pt-3">
          <p className="font-terminal text-xs text-muted-foreground">
            ▸ CONTINUOUS LEARNING — ALL METRICS TRENDING UPWARD
          </p>
        </div>
      </PanelWrapper>
    </div>
  );
};

export default SkillMatrix;
