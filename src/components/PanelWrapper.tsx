import { type ReactNode } from "react";

interface PanelProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  cornerGlyphs?: boolean;
}

const PanelWrapper = ({ title, icon, children, className = "", cornerGlyphs = true }: PanelProps) => {
  return (
    <div className={`relative border-2 border-border bg-card panel-glow glow-pulse hover-shimmer hover-shake transition-all duration-300 dark:glass-panel ${className}`}>
      {/* Outer border effect */}
      <div className="absolute inset-[3px] border border-dashed border-secondary pointer-events-none" />

      {/* Corner glyphs */}
      {cornerGlyphs && (
        <>
          <span className="absolute top-1 left-1 text-muted-foreground text-xs font-terminal">◤</span>
          <span className="absolute top-1 right-1 text-muted-foreground text-xs font-terminal">◥</span>
          <span className="absolute bottom-1 left-1 text-muted-foreground text-xs font-terminal">◣</span>
          <span className="absolute bottom-1 right-1 text-muted-foreground text-xs font-terminal">◢</span>
        </>
      )}

      {/* Title bar */}
      <div className="bg-accent border-b-2 border-border px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary text-sm icon-float">{icon}</span>}
          <span className="text-primary text-xs">▸</span>
          <h2 className="font-pixel text-[10px] tracking-wider text-primary uppercase">{title}</h2>
        </div>
        <div className="flex gap-1">
          <span className="text-muted-foreground text-xs">♥</span>
          <span className="text-muted-foreground text-xs">◆</span>
          <span className="text-muted-foreground text-xs">■</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PanelWrapper;
