import { useState } from "react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ExternalLinkDialog = ({ href, children, className = "" }: ExternalLinkProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={`interactive text-foreground hover:text-primary transition-colors ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>

      {showConfirm && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/80">
          <div className="flicker-in border-2 border-border bg-card max-w-md w-full mx-4 panel-glow">
            <div className="absolute inset-[3px] border border-dashed border-secondary pointer-events-none" />
            
            {/* Header */}
            <div className="bg-accent border-b-2 border-border px-3 py-1.5 flex items-center justify-between">
              <span className="font-pixel text-[10px] text-primary tracking-wider">
                ⚠ EXTERNAL REDIRECT WARNING
              </span>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-muted-foreground hover:text-primary text-sm interactive"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center">
              <p className="font-terminal text-lg text-foreground mb-2">
                You are about to exit CRIMSON TERMINAL.
              </p>
              <p className="font-terminal text-base text-muted-foreground mb-6">
                DESTINATION: {href}
              </p>
              <p className="font-terminal text-lg text-primary mb-6">Proceed?</p>

              <div className="flex gap-4 justify-center">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowConfirm(false)}
                  className="interactive border-2 border-primary bg-accent px-6 py-2 font-pixel text-[10px] text-primary hover:bg-primary hover:text-primary-foreground transition-colors tracking-wider"
                >
                  [ PROCEED ]
                </a>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="interactive border-2 border-border bg-card px-6 py-2 font-pixel text-[10px] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors tracking-wider"
                >
                  [ CANCEL ]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExternalLinkDialog;
