const HolographicCards = () => {
  return (
    <>
      {/* Left side - Stacked Aces */}
      <div className="fixed left-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col gap-2">
        <div className="card-float" style={{ animationDelay: "0s" }}>
          <AceCard suit="♠" rotation={-8} />
        </div>
        <div className="card-float" style={{ animationDelay: "1.5s" }}>
          <AceCard suit="♥" rotation={-4} />
        </div>
      </div>

      {/* Right side - Joker */}
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex items-center">
        <div className="card-float" style={{ animationDelay: "0.8s" }}>
          <JokerCard />
        </div>
      </div>
    </>
  );
};

const AceCard = ({ suit, rotation }: { suit: string; rotation: number }) => (
  <div
    className="w-16 h-24 border border-primary/40 bg-card/60 backdrop-blur-sm flex flex-col items-center justify-center holo-shimmer opacity-50"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <span className="font-terminal text-lg text-primary">{suit}</span>
    <span className="font-pixel text-[6px] text-primary/60 tracking-widest mt-1">ACE</span>
    <span className="font-terminal text-xs text-primary/40 mt-0.5">{suit}</span>
  </div>
);

const JokerCard = () => (
  <div
    className="w-16 h-24 border border-primary/40 bg-card/60 backdrop-blur-sm flex flex-col items-center justify-center holo-shimmer opacity-50"
    style={{ transform: "rotate(6deg)" }}
  >
    <span className="font-terminal text-lg text-primary">🃏</span>
    <span className="font-pixel text-[5px] text-primary/60 tracking-widest mt-1">JOKER</span>
  </div>
);

export default HolographicCards;
