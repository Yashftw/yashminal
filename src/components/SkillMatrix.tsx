import PanelWrapper from "./PanelWrapper";

const skills = [
  "PYTHON",
  "JAVA",
  "SQL",
  "POSTGRESQL",
  "AI / ML",
  "CLOUD COMPUTING",
  "SAP ERP",
  "DOCKER",
  "DATA ENGINEERING",
  "SYSTEM DESIGN",
  "LINUX",
  "SKETCHING",
];

const SkillBox = ({ skill }: { skill: string }) => {
  return (
    <div className="font-terminal text-xs border border-border px-3 py-1 rounded-sm text-foreground hover:border-primary hover:text-primary transition-colors duration-200">
      {skill}
    </div>
  );
};

const SkillMatrix = () => {
  return (
    <PanelWrapper title="SKILL DIAGNOSTICS">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBox key={skill} skill={skill} />
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <p className="font-terminal text-xs text-muted-foreground">
          ▸ CONTINUOUS LEARNING — EXPERTISE EXPANDING
        </p>
      </div>
    </PanelWrapper>
  );
};

export default SkillMatrix;
