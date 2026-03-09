import { type ReactNode } from "react";

interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const PanelWrapper = ({ title, children, className = "" }: PanelProps) => {
  return (
    <div className={`relative border-2 border-border bg-card/90 panel-glow glow-pulse hover-shimmer hover-shake transition-all duration-500 backdrop-blur-md ${className}`}>
      <div className="absolute inset-[3px] border border-border/20 pointer-events-none" />
      <div className="bg-accent/80 border-b-2 border-border px-4 py-2.5 flex items-center justify-between backdrop-blur-sm">
        <h2 className="font-pixel text-[10px] tracking-widest text-primary uppercase">{title}</h2>
        <span className="font-terminal text-xs text-muted-foreground">■</span>
      </div>
      <div className="p-5 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PanelWrapper;
